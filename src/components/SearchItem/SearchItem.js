import React from 'react'

export default function SearchItem(props) {
    return (
        <div className='searchItem'>
           <h2 className='searchTitleLabel'>Title</h2> 
           <h3 className='searchTitle'>{props.title}</h3> 
           <h2 className='searchAuthorsLabel'>Authors</h2>
           <h3 className='searchAuthors'>{props.authors}</h3> 
           <h2 className='searchTypeLabel'>Type</h2> 
           <h3 className='searchType'>{props.type}</h3>
           <h2 className='searchDescriptionLabel'>Description</h2> 
           <h3 className='searchDescription'>{props.description}</h3>
           <h2 className='searchUrlsLabel'>Url's</h2>
           <a className='urls' target='_blank' rel='noopener noreferrer' href={props.urls}>{props.urls}</a><br/> 
           <button className='favBtn' id={props.id} onClick={props.clickFav}><i className="fas fa-star"></i> {props.btnName}</button>
           
        </div>
    )
}
