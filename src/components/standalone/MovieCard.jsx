
import Imdb from '../../assets/imdb.svg'
import Tomato from '../../assets/tomato.svg'

console.log(Imdb, Tomato)


export default function MovieCard({movie}) {
    const {release_date, genre_ids, poster_path, original_title, vote_average}=movie

    const date= new Date(release_date)
    const releaseUTCYear= date.getUTCFullYear()
    const imageUrl='https://image.tmdb.org/t/p/original'

  return (
   <div data-testid='movie-card'>
        <img src={imageUrl+ poster_path} alt="" data-testid='movie-poster' />
        <p className="release_date text-xs text-[#9CA3AF] pt-4 pb-2"  data-testid='movie-release-date'> USA, {releaseUTCYear}</p> 
        <p className="title text-base  text-[#111827] font-[700] py-2" data-testid='movie-title'>{original_title}</p>
        <div className="rating py-3 flex justify-between gap-2">
                <div className="imdb flex">
                    <img className=' w-9 h-4 pr-3' src={Imdb} alt="imdb logo" />
                    <p className="text-xs text-[#111827]">{(vote_average*10).toFixed(1)} / 100</p>
                </div>
                <div className="rotten-tomatoes flex gap-2">
                <   img className='w-2 h-2 md:w-4 md:h-4' src={Tomato} alt="tomato logo" />
                    <p className="text-xs text-[#111827]">{vote_average*10}%</p>
                </div>
            </div>
        <p className="genre-ids text-[#9CA3AF] text-xs">{genre_ids}</p>

    
   </div>

  )
}


// {"adult":false,"backdrop_path":"/53z2fXEKfnNg2uSOPss2unPBGX1.jpg","genre_ids":[27,9648,53],"id":968051,"original_language":"en","original_title":"The Nun II","overview":"In 1956 France, a priest is violently murdered, and Sister Irene begins to investigate. She once again comes face-to-face with a powerful evil.","popularity":2050.948,"poster_path":"/5gzzkR7y3hnY8AD1wXjCnVlHba5.jpg","release_date":"2023-09-06","title":"The Nun II","video":false,"vote_average":6.8,"vote_count":110}