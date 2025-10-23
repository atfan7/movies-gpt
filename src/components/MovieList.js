import MovieCard from "./MovieCard"


const MovieList = ({title,movies}) => {
    console.log(movies)
  return (
    <div className="px-6 text-white">
      <h1 className="text-lg md:text-3xl py-4">{title}</h1>
        <div className="flex overflow-x-scroll p-6">
            
        <div className="flex">
          {movies
          ?.filter(movie => movie?.poster_path)
          .map(movie => (
         <MovieCard key={movie.id} posterPath={movie.poster_path} />
))}

        
        </div>
    </div>
    </div>
  )
}

export default MovieList