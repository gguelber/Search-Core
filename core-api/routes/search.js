const router = require('express').Router()
const verify = require('./verifyTokens')
const fetch = require('node-fetch')
const User = require('../model/User')

// Search for article and return the first page (10 results)
router.post('/', verify, async (req, res) => {
    if (req.body.searchInput !== '') {
        const data = await fetch(`https://core.ac.uk:443/api-v2/articles/search/${req.body.searchInput}?page=${req.body.indexPage}&pageSize=10&metadata=true&fulltext=true&citations=false&similar=false&duplicate=false&urls=false&faithfulMetadata=false&apiKey=${process.env.CORE_API_KEY}
        `)
        const items = await data.json()
        await res.status(200).send(items)
    }
})

// Add an article to favorites
router.post('/fav', verify, async (req, res) => {
    const user = await User.findById(req.user._id)
    const newArray = user.favorites.filter( fav => fav.id == req.body.item.id
    )
    if (newArray.length > 0) {
        res.sendStatus(409)
    } else {
        await User.updateOne({_id: req.user._id}, {$push: { favorites: [req.body.item] }})
        res.sendStatus(201)
    }
})

// Delete article from favorites
router.delete('/fav', verify, async (req, res) => {
    try {
        await User.updateOne({_id: req.user._id}, {$pull: { favorites: {id: req.body.id}}})
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    } 
})

// Get articles from favorites
router.get('/fav', verify, async (req, res) => {
    const user = await User.findById(req.user._id)
    try {
        await res.status(200).send(user.favorites)
    } catch (error) {
        console.log(error)
        await res.status(500).send(error)
    }
})

module.exports = router