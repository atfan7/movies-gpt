import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {addNowPlayingMovies} from "../utils/moviesSlice"

const useNowPlayingMovies = ()=>{



    //Fetch Data from TMDB API and update Store 
  const dispatch =useDispatch();

  const nowPlayingMovies =useSelector (
    (store) => store.movies.nowPlayingMovies
  )

  const getNowPlayingMovies =()=>{

  fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS)
  .then(res => res.json())
  .then(
    data => {console.log(data);
    dispatch(addNowPlayingMovies(data.results))
  
  })
  .catch(err => console.error(err));

}

useEffect(()=>{
  !nowPlayingMovies && getNowPlayingMovies();



},[])

}

export default useNowPlayingMovies;