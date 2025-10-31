import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
            <img className=" w-screen h-screen object-cover" src={BG_URL} alt="netflix-image"/>

        </div>

        <div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
        </div>
       
    </div>
  )
}

export default GptSearch
