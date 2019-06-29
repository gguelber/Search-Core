import React from 'react'

export default function SearchBox(props) {
    return (
        <div className='searchBox'>
            <h1>SEARCH ARTICLES</h1>
            <input onChange={props.change} type="text" name="searchInput" id="searchInput"/>
            <p>Choose the page index (max 100)</p>
            <input onChange={props.changeIndex} type="number" name="searchIndexInput" id="searchIndexInput" min="1" max="100" defaultValue="1"/>
            <button id="searchBtn" onClick={props.click}>SEARCH</button>
            <button id="showFavBtn" onClick={props.showFav}>FAVORITES</button>
        </div>
    )
}
