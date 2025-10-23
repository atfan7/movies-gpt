import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import client from '../utils/openai'
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {
  const dispatch =useDispatch();
   
  const langKey = useSelector(store => store.config.lang)
  const searchText = useRef(null);

  //search movie in TMDB

  const searchMovieTMDB = (movie)=>{
  return fetch("https://api.themoviedb.org/3/search/movie?query=" +movie+ "&include_adult=false&language=en-US&page=1", API_OPTIONS)
  .then(res => res.json())
  .then(json => {
    console.log('TMDB result for', movie, json.results);
    return json.results
   })
  .catch(err => {
    console.error('TMDB error:', err);

    return [];
  })
 

  }

  

  const handleGptSearchClick = async()=>{
    console.log(searchText.current.value)

    //Make an API call to GPT API and get movie Results 

  

    

    const gptResults = await client.responses.create({
    model: 'gpt-3.5-turbo',
    instructions: 'Act as a Movie Recommendation system and suggest some movies for the query.Only give me names of 5 movies.Comma seperated like the example result given ahead .Example Result : Don,Butterfly Effect, GolMaal,Koi mil gaya,Tenet',
    input: searchText.current.value,

    
});
    console.log(gptResults.output_text);

    const gptMovies=gptResults.output_text.split(",");

    // For each movie search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    //[Promise,Promise,Promise,Promise,Promise]

    const tmdbResults = await Promise.all(promiseArray)
    console.log(tmdbResults)

    dispatch(addGptMovieResult({movieNames : gptMovies, movieResults :tmdbResults}))



    



  }

  return (
    <div className='pt-[35%] md:pt-[10%] flex justify-center'>

        <form className='w-full md:w-1/2 bg-black grid grid-cols-12'onSubmit={(e)=>e.preventDefault()}>


           <input
           ref={searchText}
            type='text' 
            className='p-4 m-4 col-span-9' 
            placeholder={lang[langKey].gptSearchPlaceholder} />

           <button 
           className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'
          onClick={handleGptSearchClick}>
           {lang[langKey].search}
            </button>


        </form>
    </div>
  )
}

export default GptSearchBar