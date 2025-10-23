import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {addPopularMovies} from "../utils/moviesSlice"
import { useSelector } from 'react-redux';

const usePopularMovies = ()=>{



    //Fetch Data from TMDB API and update Store 
  const dispatch =useDispatch();

  const popularMovies =useSelector (
    (store) => store.movies.popularMovies
  )

  const getPopularMovies =()=>{

  fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS)
  .then(res => res.json())
  .then(
    data => {console.log(data);
    dispatch(addPopularMovies(data.results))
  
  })
  .catch(err => console.error(err));

}

useEffect(()=>{
  !popularMovies && getPopularMovies();



},[])

}

export default usePopularMovies;