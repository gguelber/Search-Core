import React, {useState, useEffect} from 'react'
import SearchBox from '../SearchBox/SearchBox';
import ResultsBox from '../ResultsBox/ResultsBox';
import FavoritesBox from '../FavoritesBox/FavoritesBox';
import Swal from 'sweetalert2'



export default function SearchPage() {
    // States for the Search Page -- States para a página de busca
    const [itemList, setItemList] = useState([])
    const [isClicked, setIsClicked] = useState(false)
    const [searchOn, setSearchOn] = useState(false)
    const [input, setInput] = useState('')
    const [searchIndex, setSearchIndex] = useState(1)
    const [indexInput, setIndexInput] = useState(1)
    
    // States for the favorites -- States para os favoritos
    const [currentPage, setCurrentPage] = useState(1)
    const [favorites, setFavorites] = useState([])
    const [itemsPerPage] = useState(3)
    const [paginationArray, setPaginationArray] = useState([])
    const [currentPageItems, setCurrentPageItems] = useState([])




    // Send request to fetch the search results using the header to send the JWT -- Enviar requisição para buscar no servidor e obter os dados, utilizando o header para enviar o JWT para ser verificado 
    const fetchItems = async () => {
        if (input !== '') {
            Swal.showLoading()
            await fetch('http://localhost:3000/api/search', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                searchInput: input,
                indexPage: indexInput
                })
            }).then(res => {
                return res.json()
            }).then(response => {
                setItemList(response.data)
                setSearchIndex(indexInput)
                Swal.hideLoading()
            })
            .catch(error => {
                alert(`Erro: ${error}`)
            })
            await setSearchOn(true)
        }
    } 
    const fetchItemsIndexed = async (index) => {
        if (input !== '') {
            Swal.showLoading()
            await fetch('http://localhost:3000/api/search', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({
                searchInput: input,
                indexPage: index
                })
            }).then(res => {
                return res.json()
            }).then(response => {
                setItemList(response.data)
                Swal.hideLoading() 
            })
            .catch(error => {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: error
                  })
            })
            await setSearchOn(true)
        }
    } 
   // Handle index input changes -- Lidar com mudanças no input de indexPage
    const handleIndexInput = (event) => {
        setIndexInput(event.target.value)
    }

    // Handle search input changes -- Lidar com mudanças no input de busca
    const handleSearchInput = (event) => {
        setInput(event.target.value)
    }

 

    // Go to the next results page -- Ir para a próxima pagina de resultados
    const nextPage = () => {
        if (searchIndex < 100) {
            const counter = Number(searchIndex) + 1 
            setSearchIndex(counter)
            fetchItemsIndexed(counter); 
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'You are in the last page'
              })
        }
    }

    // Go to the previous results page -- Ir para a pagina anterior de resultados
    const previousPage = () => {
        if (searchIndex > 1) {
            const counter = Number(searchIndex) - 1 
            setSearchIndex(counter)
            fetchItemsIndexed(counter); 
        } else {
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'You are in the first page'
              })
        }

    }

    // Handle Add to favorites click button and send the request to save the article in the DB -- Lidar com o clique no botão Favoritos
    const addToFavorites = (event) => {
        return (
            itemList.map( i => {
                if (i.id === event.target.id) {
                    fetch('http://localhost:3000/api/search/fav', {
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'auth-token': localStorage.getItem('token')
                        },
                        body: JSON.stringify({
                          item: i
                        })
                      }).then(res => {
                          if (res.status === 409) {
                            Swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'This article is already in your favorites'
                              })
                          } else {
                            Swal.fire({
                                type: 'success',
                                title: 'Success',
                                text: 'Article added'
                              })
                          }
                      })
                }
            })
        )
    }

    // Fetch all favorites from the current user -- Buscar os favoritos do usuário atual
    const showFavorites = async () => {
        if (isClicked) {
            setIsClicked(!isClicked)
            return 
        }
        setIsClicked(!isClicked)
        setSearchOn(false)
        const data = await fetch('http://localhost:3000/api/search/fav', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        try {
            const item = await data.json()
            const numOfPages = Math.ceil(item.length / itemsPerPage)
            const temp_paginationArray = []
             
            for (let i = 1; i <= numOfPages; i++) {
                temp_paginationArray.push(i)
            }
            setPaginationArray([...temp_paginationArray])
            setFavorites(item)

            const indexLastItem = currentPage * itemsPerPage
            const indexFirstItem = indexLastItem - itemsPerPage
            const currentItems = item.slice(indexFirstItem, indexLastItem)
            setCurrentPageItems([...currentItems])
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: error
              })           
        }
    }

    // Change Fav Page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        const indexLastItem = pageNumber * itemsPerPage
        const indexFirstItem = indexLastItem - itemsPerPage
        const currentItems = favorites.slice(indexFirstItem, indexLastItem)
        setCurrentPageItems([...currentItems])
    }


    // Delete the clicked favorite -- Deletar o favorito clicado
    const deleteFavorite = async (event) => {
        const newFav = [...currentPageItems]
        newFav.map((item, index) => {
            if (item.id === event.target.id) {
                newFav.splice(index, 1)
                setCurrentPageItems([...newFav])                
            }
        })

        const res = await fetch('http://localhost:3000/api/search/fav', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                id: event.target.id 
            })
        })

        try {
            if (res.status === 201) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                  });
                  
                  Toast.fire({
                    type: 'success',
                    title: 'Article deleted'
                  })
            }
        } catch (error) {
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: error
              })
        }
    }


    useEffect(() => {

        return () => {
            setItemList([])
        };
    }, [currentPageItems])

    
    if (searchOn) {
        return (
            <div>
                <SearchBox change={handleSearchInput} changeIndex={handleIndexInput} click={fetchItems} showFav={showFavorites}/>
                <ResultsBox items={itemList} clickFav={addToFavorites} nextPage={nextPage} previousPage={previousPage}/>
            </div>
        )
    } else if (isClicked) {
        if (favorites.length === 0) {
            return (
                <div>
                    <SearchBox change={handleSearchInput} changeIndex={handleIndexInput} click={fetchItems} showFav={showFavorites}/>
                    <h1>You have no favorites</h1>
                </div>    
            )
        }
        return (
            <div>
                <SearchBox change={handleSearchInput} changeIndex={handleIndexInput} click={fetchItems} showFav={showFavorites}/>
                <FavoritesBox favItem={currentPageItems} clickFav={deleteFavorite} paginationArray={paginationArray} paginate={paginate}/>
            </div>
        )
    } else {
        return (
            <div>
                <SearchBox change={handleSearchInput} changeIndex={handleIndexInput} click={fetchItems} showFav={showFavorites}/>
            </div>
        )
    }
}
