import React from 'react';
import SearchItem from '../SearchItem/SearchItem';


export default function ResultsBox(props) {
    return (
        <div className='resultsBox'>
            <h1>RESULTADO DA BUSCA</h1>
            {props.items.map( i => (
                <SearchItem
                key={i.id}
                id={i.id}
                btnName='Add to Favorites'
                clickFav={props.clickFav} 
                title={i.title} 
                authors={i.authors} 
                type={'type not defined' || i.types} 
                description={i.description}
                urls={i.downloadUrl} />
            ))}
            <div className="paginationDiv">
                <button onClick={props.previousPage} id="previousBtn">Previous</button>
                <button onClick={props.nextPage} id="nextBtn">Next</button>
            </div>

        </div>
    )
}
