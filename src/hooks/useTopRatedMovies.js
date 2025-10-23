import  { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants';
import { useDispatch,useSelector } from 'react-redux';
import {addTopRatedMovies} from "../utils/moviesSlice"

const useTopRatedMovies = ()=>{



    //Fetch Data from TMDB API and update Store 
  const dispatch =useDispatch();

  const topRatedMovies =useSelector (
    (store) => store.movies.topRatedMovies
  )

  const getTopRatedMovies =()=>{

  fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS)
  .then(res => res.json())
  .then(
    data => {console.log(data);
    dispatch(addTopRatedMovies(data.results))
  
  })
  .catch(err => console.error(err));

}

useEffect(()=>{
  !topRatedMovies && getTopRatedMovies();



},[])

}

export default useTopRatedMovies;