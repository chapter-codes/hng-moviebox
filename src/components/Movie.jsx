import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "./Loading"

import Logo from '../assets/tv.svg'
import Home from '../assets/Home.svg'
import MovieProjector from '../assets/Movie Projector.svg'
import TVShow from '../assets/TV Show.svg'
import Calendar from '../assets/Calendar.svg'
import Logout from '../assets/Logout.svg'
import Play from '../assets/Play.svg'




export default function Movie() {
    const [movie, setMovie]= useState('')
    const [loading, setLoading]= useState(true)
    
    const movieUrl='https://api.themoviedb.org/3/movie/615656'
    const imageBaseUrl='https://image.tmdb.org/t/p/original'
    
    const releaseDate= movie? movie.release_date :''
    const utcYear= releaseDate? new Date(releaseDate).getUTCFullYear() : ''

    useEffect(()=>{
        loadMovie(movieUrl)
        .then(res=> {
            setMovie({...res.data})
            setLoading(false)
        })
        .catch(err=>console.log(err))


    },[])

  return (

    loading? <Loading /> : 
    <div className="flex h-screen w-full "> 
       <div className="sidebar flex flex-col w-auto justify-evenly rounded-3xl border-r-[1px] border-black ">
       <p className=" flex justify-center items-center text-[#333333] px-2 mt-6 mb-4 font-bold  ">
        <img  className="w-[55px] h-[55px] pr-4 " src={Logo} alt="home icon" /> MovieBox</p>


        <p className="font-bold flex items-center  text-[#666666]  pl-8 py-2"><img  className="w-[40px] h-[40px] pr-4 " src={Home} alt="home icon" /> Home</p>
        <p className=" font-bold flex items-center text-[#666666]  pl-8 py-2"><img className="w-[40px] h-[40px] pr-4" src={MovieProjector} alt="home icon" /> Movie</p>
        <p className=" font-bold flex items-center text-[#666666]  pl-8 py-2"><img  className="w-[40px] h-[40px] pr-4"src={TVShow} alt="home icon" /> TV Series</p>
        <p className=" font-bold flex items-center text-[#666666]  pl-8 py-2"><img  className="w-[40px] h-[40px] pr-4"src={Calendar} alt="home icon" />Upcoming</p>

        <div className="border-[#BE123CB2] border-[1px] rounded-2xl mx-2 bg-[#FEE2E2]">
            <p className="px-4 mt-8 font-bold text-sm text-[#333333CC] max-w-[172px] ">
            Play movie quizes and earn free tickets 
            </p>
            <p className="px-4 py-1 text-[#666666] text-xs ">50k people are playing now</p>
            
            <p className="m-6 p-2 rounded-full text-[#BE123C] bg-[#BE123C33] text-center">Start playing</p>
        </div>

        <p  className="font-bold flex items-center text-[#666666]  pl-8 py-2"><img  className="w-[40px] h-[40px] pr-4"src={Logout} alt="home icon" />Logout</p>
       </div>

        <div className="movie  grow px-20 pt-8">
            <div className={`poster w-full h-[40vh] md:h-[50vh] relative md:h-[60vh]  `}>
                <img className='absolute w-full  h-full top-0 left-0 rounded-2xl overflow-hidden' src={imageBaseUrl+ movie.backdrop_path} alt="movie poster" />

                <div className="watch-trailer absolute w-full h-full flex flex-col justify-center items-center top-0 left-0">
                <   div className="play flex items-center justify-center rounded-full w-20 h-20 bg-[#E5E7EB] opacity-60 hover:opacity-80">
                      <img src={Play} alt="watch trailer" />
                    </div>
                    <p className="text-sm py-2">watch trailer</p>
                </div>
                
            </div>
            <div className="flex justify-between items-center pt-2 ">
                <div className="left flex gap-2">
                    <p className="text-[#404040] text-sm" data-testid='movie-title'>{movie.title}</p>
                    <div className="dot text-[#404040] text-[1.5rem] leading-[9px] font-bold">.</div>
                    <p className="text-[#404040] text-sm" data-testid='movie-release-date'>{utcYear}</p>
                    <div className="dot text-[#404040] text-[1.5rem] leading-[9px] font-bold">.</div>
                    <p className="text-[#404040] text-sm">{movie.adult?'PG-18': 'PG-13'}</p>
                    <div className="dot text-[#404040] text-[1.5rem] leading-[9px] font-bold">.</div>
                    <p className="text-[#404040] text-sm" data-testid='movie-runtime'>{String(Math.floor(movie.runtime/60)).padStart(2,0)+'m'}  {String(Math.floor(movie.runtime%60)).padStart(2, '0') +'m'}</p>
                    {
                        movie.genres.map(genre=><p className="" key={genre.id}>{genre.name}</p>)
                    }
                    <p className=""></p>
                    <p className=""></p>

                </div>


            </div>

        </div>


    </div>
  )
}



async function loadMovie(url){    
   
    const headers=
     {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWJhNDE3ZTc1NjU5ZDFkZWMyOTFjMjNjNWNjZTE3OCIsInN1YiI6IjYxZWI3N2U0OTQ0YTU3MDA0MzVhMWI1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tEewROreqmHUdeZTmHH43RzySOLrmETYMGMToI_-Zw8'
     }
     
 
     const movies= await axios.get(url,[headers] )
     return movies 
 
 }


//  {
//     "adult": false,
//     "backdrop_path": "/5mzr6JZbrqnqD8rCEvPhuCE5Fw2.jpg",
//     "belongs_to_collection": {
//         "id": 742536,
//         "name": "The Meg Collection",
//         "poster_path": "/7sAnVGMn5he5NZBZCE6fhDpA7fl.jpg",
//         "backdrop_path": "/rNoyJmjdhgn30bVbvd8n3DJMocB.jpg"
//     },
//     "budget": 129000000,
//     "genres": [
//         {
//             "id": 28,
//             "name": "Action"
//         },
//         {
//             "id": 878,
//             "name": "Science Fiction"
//         },
//         {
//             "id": 27,
//             "name": "Horror"
//         }
//     ],
//     "homepage": "https://www.themeg.movie",
//     "id": 615656,
//     "imdb_id": "tt9224104",
//     "original_language": "en",
//     "original_title": "Meg 2: The Trench",
//     "overview": "An exploratory dive into the deepest depths of the ocean of a daring research team spirals into chaos when a malevolent mining operation threatens their mission and forces them into a high-stakes battle for survival.",
//     "popularity": 2943.17,
//     "poster_path": "/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
//     "production_companies": [
//         {
//             "id": 56242,
//             "logo_path": "/1YORRYmg7hgYIgoJek8jU3cykuQ.png",
//             "name": "Apelles Entertainment",
//             "origin_country": "US"
//         },
//         {
//             "id": 174,
//             "logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
//             "name": "Warner Bros. Pictures",
//             "origin_country": "US"
//         },
//         {
//             "id": 435,
//             "logo_path": "/AjzK0s2w1GtLfR4hqCjVSYi0Sr8.png",
//             "name": "di Bonaventura Pictures",
//             "origin_country": "US"
//         },
//         {
//             "id": 92484,
//             "logo_path": "/dfWwoWRp8snHjzDKO5IFkiCAUe7.png",
//             "name": "CMC Pictures",
//             "origin_country": "CN"
//         },
//         {
//             "id": 208093,
//             "logo_path": null,
//             "name": "DF Pictures",
//             "origin_country": ""
//         },
//         {
//             "id": 208094,
//             "logo_path": null,
//             "name": "Onaroll Productions",
//             "origin_country": ""
//         }
//     ],
//     "production_countries": [
//         {
//             "iso_3166_1": "CN",
//             "name": "China"
//         },
//         {
//             "iso_3166_1": "US",
//             "name": "United States of America"
//         }
//     ],
//     "release_date": "2023-08-02",
//     "revenue": 384056482,
//     "runtime": 116,
//     "spoken_languages": [
//         {
//             "english_name": "English",
//             "iso_639_1": "en",
//             "name": "English"
//         }
//     ],
//     "status": "Released",
//     "tagline": "Back for seconds.",
//     "title": "Meg 2: The Trench",
//     "video": false,
//     "vote_average": 7.02,
//     "vote_count": 1669
// }