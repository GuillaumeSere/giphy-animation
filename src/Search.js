import React from 'react'
import Enter from './Enter.svg'

export function Search({search, setSearch, fetchData, setTitle}) {
// Handle Submit
const handleSubmit = (e)=>{
    // Prevent default
    e.preventDefault();
    // Set Title
    setTitle(search);
    // Fetch
    fetchData(search);
    // Reset form search value
    setSearch('');
}

// RETURN    
    return (
        <div>
            <form className='gif-search' onSubmit={handleSubmit}>
            <input 
            type="text"
            value={search}
            onChange={ e => setSearch(e.target.value)}
            /> 
            <button className='gif-btn-submit' type='submit'>
            <img className='svg' src={Enter} alt="enter" />
            </button>
            </form>
        </div>
    )
}
