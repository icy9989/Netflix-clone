import { MovieInterface } from '@/types'
import React from 'react'
import MovieCard from './movieCard'

interface MovieListProps {
    title: string,
    data: MovieInterface []
}

const MovieList:React.FC<MovieListProps> = ({ title, data }) => {
  return (
    <div className='px-4 md:px-12 mt-8 space-y-8'>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>{title}</p>
        <div className='grid grid-cols-4 gap-2'>
            {data.map((movie) => (
                <MovieCard key={movie.id} data={movie} />
            ))}
        </div>
    </div>
  )
}

export default MovieList