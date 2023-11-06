"use client"

import { NextPageContext } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { signOut, useSession } from "next-auth/react";
import { authOptions } from './api/auth/[...nextauth]/route';
import useCurrentUser from '@/hooks/useCurrentUser';
import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MovieList from '@/components/movieList';
import useMovieList from '@/hooks/useMovieList';
import useFavorites from '@/hooks/useFavorites';
import InfoModal from '@/components/infoModal';
import useInfoModal from '@/hooks/useInfoModal';

export default function Home() {

  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/auth");
    },
  })
  
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar /> 
      <Billboard />
      <div className='pb-40'>
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}
