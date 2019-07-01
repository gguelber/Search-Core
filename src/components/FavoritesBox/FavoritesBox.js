import React from 'react'
import SearchItem from '../SearchItem/SearchItem'

export default function FavoritesBox(props) {
    return (
        <div>
            <h1>Pages:</h1>
            <ul className="paginationList">
                {props.paginationArray.map(number => (
                    <li key={number} className="paginationItem">
                        <button id='topBtn' className="paginationBtn" onClick={() => props.paginate(number)} >{number}</button>
                    </li>                    
                ))}
            </ul>
            <h1>Favorites</h1>
            {props.favItem.map(item => (
                <SearchItem
                key={item.id} 
                id={item.id}
                title={item.title}
                btnName='Remove'
                clickFav={props.clickFav} 
                authors={item.authors} 
                type={item.type} 
                description={item.description}
                urls={item.downloadUrl} />
            ))}
            <h1>Pages:</h1>
            <ul className="paginationList">
                {props.paginationArray.map(number => (
                    <li key={number} className="paginationItem">
                        <button id='bottomBtn' className="paginationBtn" onClick={() => props.paginate(number)} >{number}</button>
                    </li>                    
                ))}
            </ul>
        </div>
    )
}
