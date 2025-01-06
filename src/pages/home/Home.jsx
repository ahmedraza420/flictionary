import { useQuery } from "@tanstack/react-query"
import { BASE_IMAGE_URL_ORIGINAL, getHero, getPopularList, getTrendingList } from "../../services/api"
import { useState } from "react";
import StarsIcon from '@mui/icons-material/Stars';
import { Button } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import Slider1 from "../../components/common/Slider1";
import { Link } from "react-router-dom";

export default function Home() {
    const [movieTrendingTime, setMovieTrendingTime] = useState('day');
    const [showTrendingTime, setShowTrendingTime] = useState('day');
    const [popularType, setPopularType] = useState('movie');
    const getHeroItem = useQuery({
        queryKey: ['heroitem'],
        queryFn: getHero,
    })

    const getTrendingMovies = useQuery({
        queryKey: ['movieslist', movieTrendingTime],        
        queryFn: () => getTrendingList('movie', movieTrendingTime),
        stateTime: 1800000,
    })
    const getTrendingSeries = useQuery({
        queryKey: ['serieslist', showTrendingTime],        
        queryFn: () => getTrendingList('tv', showTrendingTime),
        stateTime: 1800000,
    })
    const getPopular = useQuery({
        queryKey: ['popular', popularType],
        queryFn: () => getPopularList(popularType),
        stateTime: 1800000,
    })
    return (
        <>
            <div className="relative min-h-[50vh] md:min-h-[70vh] bg-[image:var(--image-url)] bg-cover bg-top bg-no-repeat w-full max-h-[85vh] flex justify-center items-center"  style={{'--image-url' : `url(${BASE_IMAGE_URL_ORIGINAL + getHeroItem?.data?.['backdrop_path']})`}}>
                {getHeroItem.isLoading ? 
                        <div className="flex-col gap-4 w-full flex items-center justify-center">
                            <div className="w-20 h-20 border-4 border-transparent animate-spin flex items-center justify-center border-t-teal-400 rounded-full">
                                <div className="w-16 h-16 border-4 border-transparent animate-spin flex items-center justify-center border-t-blue-400 rounded-full" ></div>
                            </div>
                        </div>
                    :
                    <>
                        {/* <img src={BASE_IMAGE_URL_ORIGINAL + getHeroItem?.data?.backdrop_path} alt="" className="max-h-[85vh] w-full mx-auto object-cover"/> */}
                        <div className="z-10 bg-gradient-to-t from-black absolute top-0 left-0 w-full h-full"></div>
                        <div className="md:absolute top-1/2 left-[10%] md:-translate-y-1/2 z-20 text-white w-full px-10 md:px-0 md:w-1/2 drop-shadow-[0px_0px_4px_rgba(0,0,0,1)]">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">{getHeroItem?.data?.title}</h1>
                            <p className="pt-4 md:text-xs lg:text-sm font-normal md:font-medium line-clamp-4 md:line-clamp-none" title={getHeroItem?.data?.overview}>{getHeroItem?.data?.overview}</p>
                            <div className="flex flex-wrap items-center py-3 gap-4">
                                {getHeroItem?.data?.adult && <small className="text-xs text-slate-300 border rounded-md py-1 px-2">18+</small>}
                                <p className="text-sm text-neutral-100">{new Date(getHeroItem?.data?.['release_date']).toLocaleDateString()}</p>
                                <p className="text-lg text-neutral-50 flex items-center gap-1"><StarsIcon className="text-teal-300"/> {Math.floor(getHeroItem?.data?.['vote_average'] * 10) / 10}</p>
                            </div>
                            <Link to={`movie/${getHeroItem?.data?.id}`}><Button variant="contained" sx={{color: 'white', backgroundColor: '#3fc1ac'}} href="">DETAILS</Button></Link>
                        </div>
                    </>
                }
            </div>
            <div className="xl:max-w-5xl lg:max-w-4xl mx-7 sm:mx-10 lg:mx-auto py-4 animscroll">
                <div className="flex gap-1 sm:gap-3 md:gap-5 items-stretch sm:items-center justify-between sm:justify-start flex-col sm:flex-row">
                    <div className="flex gap-1 sm:gap-3 md:gap-5 items-center justify-between sm:justify-start">
                        <h2 className="text-slate-200 text-lg sm:text-xl md:text-2xl font-bold">Trending Movies</h2>
                        <div className="flex w-32 md:w-40 relative">
                            <input type="radio" name="movieTrending" id="movieDay" className='hidden peer/day' defaultChecked='true' onChange={() => setMovieTrendingTime('day')}/>
                            <label htmlFor='movieDay' className="text-xs md:text-sm px-1 sm:px-2 md:px-4 py-1 md:py-2 flex flex-1 items-center justify-center z-10 font-medium text-teal-300 hover:text-teal-500 peer-checked/day:text-teal-800"> Today </label>
                            <input type="radio" name="movieTrending" id="movieWeek" className='hidden peer/week' onChange={() => setMovieTrendingTime('week')}/>
                            <label htmlFor='movieWeek' className="text-xs md:text-sm px-1 sm:px-2 md:px-4 py-1 md:py-2 flex flex-1 items-center justify-center z-10 font-medium text-teal-300 hover:text-teal-500 peer-checked/week:text-teal-800"> Week </label>
                            <div className="background absolute w-1/2 h-full left-0 rounded-full bg-teal-200 peer-checked/week:translate-x-full transition duration-1000 ease-[linear(0,_0.009_0.9%,_0.035_1.8%,_0.139_3.8%,_0.277_5.7%,_0.727_11.2%,_0.948_14.6%,_1.025_16.2%,_1.087_17.9%,_1.13_19.6%,_1.155_21.3%,_1.165_23.5%,_1.156_25.9%,_1.015_37.4%,_0.989_40.8%,_0.975_44.4%,_0.974_49.4%,_1.004_67.2%,_1)]"></div>
                        </div>
                    </div>
                    <Link to={`/discover/movie/?sort=`} className="ml-auto"><Button variant="text"  sx={{color: '#5eead4'}} endIcon={<LaunchIcon />}> More </Button></Link>
                </div>
                <div className="py-4">
                    <Slider1 data={getTrendingMovies?.data?.results} />
                </div>
            </div>
            <div className="xl:max-w-5xl lg:max-w-4xl mx-7 sm:mx-10 lg:mx-auto py-4 animscroll">
                <div className="flex gap-1 sm:gap-3 md:gap-5 items-stretch sm:items-center justify-between sm:justify-start flex-col sm:flex-row">
                    <div className="flex gap-1 sm:gap-3 md:gap-5 items-center justify-between sm:justify-start">
                        <h2 className="text-slate-200 text-lg sm:text-xl md:text-2xl font-bold">Trending Shows</h2>
                        <div className="flex w-32 md:w-40 relative">
                            <input type="radio" name="showTrending" id="showDay" className='hidden peer/day' defaultChecked='true' onChange={() => setShowTrendingTime('day')}/>
                            <label htmlFor='showDay' className="text-xs md:text-sm px-1 sm:px-2 md:px-4 py-1 md:py-2 flex flex-1 items-center justify-center z-10 font-medium  text-teal-300 hover:text-teal-500 peer-checked/day:text-teal-800"> Today </label>
                            <input type="radio" name="showTrending" id="showWeek" className='hidden peer/week' onChange={() => setShowTrendingTime('week')}/>
                            <label htmlFor='showWeek' className="text-xs md:text-sm px-1 sm:px-2 md:px-4 py-1 md:py-2 flex flex-1 items-center justify-center z-10 font-medium text-teal-300 hover:text-teal-500 peer-checked/week:text-teal-800"> Week </label>
                            <div className="background absolute w-1/2 h-full left-0 rounded-full bg-teal-200 peer-checked/week:translate-x-full transition duration-1000 ease-[linear(0,_0.009_0.9%,_0.035_1.8%,_0.139_3.8%,_0.277_5.7%,_0.727_11.2%,_0.948_14.6%,_1.025_16.2%,_1.087_17.9%,_1.13_19.6%,_1.155_21.3%,_1.165_23.5%,_1.156_25.9%,_1.015_37.4%,_0.989_40.8%,_0.975_44.4%,_0.974_49.4%,_1.004_67.2%,_1)]"></div>
                        </div>
                    </div>
                    <Link to={`/discover/tv/?sort=`} className="ml-auto"><Button variant="text"  sx={{color: '#5eead4', marginLeft: 'auto'}} endIcon={<LaunchIcon />}> More </Button></Link>
                </div>
                <div className="py-4">
                    <Slider1 data={getTrendingSeries?.data?.results} />
                </div>
            </div>
            <div className="xl:max-w-5xl lg:max-w-4xl mx-7 sm:mx-10 lg:mx-auto py-4 animscroll">
                <div className="flex gap-1 sm:gap-3 md:gap-5 items-stretch sm:items-center justify-between sm:justify-start flex-col sm:flex-row">
                    <div className="flex gap-1 sm:gap-3 md:gap-5 items-center justify-between sm:justify-start">
                        <h2 className="text-slate-200 text-lg sm:text-xl md:text-2xl font-bold">Popular</h2>
                        <div className="flex w-32 md:w-40 relative">
                            <input type="radio" name="popular" id="popularMovie" className='hidden peer/movie' defaultChecked='true' onChange={() => setPopularType('movie')}/>
                            <label htmlFor='popularMovie' className="text-xs md:text-sm px-1 sm:px-2 md:px-4 py-1 md:py-2 flex flex-1 items-center justify-center z-10 font-medium  text-teal-300 hover:text-teal-500 peer-checked/movie:text-teal-800"> Movies </label>
                            <input type="radio" name="popular" id="popularShow" className='hidden peer/tv' onChange={() => setPopularType('tv')}/>
                            <label htmlFor='popularShow' className="text-xs md:text-sm px-1 sm:px-2 md:px-4 py-1 md:py-2 flex flex-1 items-center justify-center z-10 font-medium text-teal-300 hover:text-teal-500 peer-checked/tv:text-teal-800"> TV </label>
                            <div className="background absolute w-1/2 h-full left-0 rounded-full bg-teal-200 peer-checked/tv:translate-x-full transition duration-1000 ease-[linear(0,_0.009_0.9%,_0.035_1.8%,_0.139_3.8%,_0.277_5.7%,_0.727_11.2%,_0.948_14.6%,_1.025_16.2%,_1.087_17.9%,_1.13_19.6%,_1.155_21.3%,_1.165_23.5%,_1.156_25.9%,_1.015_37.4%,_0.989_40.8%,_0.975_44.4%,_0.974_49.4%,_1.004_67.2%,_1)]"></div>
                        </div>
                    </div>
                    <Link to={`/discover/${popularType}/?sort=`} className="ml-auto"><Button variant="text"  sx={{color: '#5eead4', marginLeft: 'auto'}} endIcon={<LaunchIcon />}> More </Button></Link>
                </div>
                <div className="py-4">
                    <Slider1 data={getPopular?.data?.results} type={popularType} />
                </div>
            </div>
        </>
    )
}