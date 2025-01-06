import { useNavigate, useParams } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { BASE_IMAGE_URL_ORIGINAL, BASE_IMAGE_URL_LARGE, BASE_IMAGE_URL_SMALL } from "../../services/api";
import { getDetails, getMovieCredits, getRecommended, getSimilar } from "../../services/details";
import { useState } from "react";
import LaunchIcon from '@mui/icons-material/Launch';
import Slider1 from "../../components/common/Slider1";

export default function Detail() {
    const [castPage, setCastPage] = useState(1);
    const [crewPage, setCrewPage] = useState(1);
    const {id,type} = useParams();
    const navigate = useNavigate();
    
    const details = useQuery({
        queryKey: ['moviedetail', id],
        queryFn: () => getDetails(type, id),
        staleTime: 1800000,
    })

    const credits = useQuery({
        queryKey: ['credits', id],
        queryFn: () => getMovieCredits(type, id),
        staleTime: 1800000,
    })

    const similar = useQuery({
        queryKey: ['similar', id],
        queryFn: () => getSimilar(type, id),
        staleTime: 1800000,
    })

    const recommended = useQuery({
        queryKey: ['recommended', id],
        queryFn: () => getRecommended(type, id),
        staleTime: 1800000,
    })

    console.log(details.data);
    
    // console.log('similar', similar.data);
    console.log('credits', credits.data);
    // console.log(recommended.data)

    let date, dateTitle, runtimeTitle, runtime;
    if (details.isSuccess) {
        date = new Date(details.data['release_date']);
        dateTitle = 'release date'
        let datePrefix = 'Release on ';
        if (isNaN(date.getTime())) {
            date = new Date(details.data['first_air_date']);
            dateTitle = 'first air date'
            datePrefix = 'First Aired on '
        }
        date = datePrefix + date.toLocaleDateString()

        if (type === 'movie') {
            runtime = Math.floor(details.data.runtime / 60) > 0 ? Math.floor(details.data.runtime / 60) + 'h ' : '' + details.data.runtime % 60 + 'm';
            runtimeTitle = details.data.runtime + ' minutes runtime';
        }
        else {
            const seasons = details.data?.['number_of_seasons'];
            const episodes = details.data?.['number_of_episodes'];
            runtime = (
                <>
                    <span className="has-[+span]:after:content-['•'] after:text-lg after:mx-2">{seasons} Season{seasons > 1 && 's'}</span>
                    <span className="after:text-lg after:mx-2">{episodes} Episode{episodes > 1 && 's'}</span>
                </>
            )
            runtimeTitle = seasons + ' Season' + (seasons > 1 ? 's ' : ' ') + episodes + ' Episode' + (episodes > 1 ? 's ' : ' ');
        }
    }
    const radius = 45;
    const circ = 2 * Math.PI * radius;
    const progress = (details?.data?.vote_average / 10) * circ;
    
    return (
        <>
            <div className="w-full min-h-[70vh] bg-[image:var(--image-url)] bg-cover bg-top bg-no-repeat flex flex-col justify-center mb-16" style={{'--image-url' : `url(${BASE_IMAGE_URL_ORIGINAL + details.data?.['backdrop_path']})`}}>
                {details.isLoading ? 
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-20 h-20 border-4 border-transparent animate-spin flex items-center justify-center border-t-teal-400 rounded-full">
                            <div className="w-16 h-16 border-4 border-transparent animate-spin flex items-center justify-center border-t-blue-400 rounded-full" ></div>
                        </div>
                    </div>
                    : 
                    details.isError ?
                        <div className="flex-col gap-4 w-full flex items-center justify-center">
                            <h1 className="text-4xl text-slate-300 font-bold">Could Not Load The Page</h1>
                        </div>
                        :
                        <div className="w-full h-full backdrop-brightness-[25%] bg-gradient-to-t from-black to-10% flex-1">
                            <div className="py-2 px-3">
                                <Button component="label" role={undefined} color="primary" variant="text" tabIndex={3} startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}> Back </Button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-6 items-start md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto px-10 mb-10">
                                <img src={details.data?.['poster_path'] ? BASE_IMAGE_URL_LARGE + details.data?.['poster_path'] : '/src/assets/placeholder.svg'} alt="" className="h-full w-full object-cover md:col-span-2 rounded-2xl max-w-52 mx-auto"/>
                                <div className="md:col-span-5 mt-1">
                                    <h1 className="text-4xl text-slate-200 font-bold tracking-wider">{details.data?.title || details.data?.name}</h1>
                                    <p className="text-base text-neutral-100 font-bold tracking-wider" title={runtimeTitle}>{runtime}</p>
                                    <div className="flex gap-3 items-ceter my-2">
                                        {details.data.adult ? <small className="text-xs text-slate-300 border rounded-md p-1 inline-block" title='rated R'>18+</small> : null}
                                        <p className="text-sm text-neutral-100 flex items-center" title={dateTitle}>{date}  </p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="relative size-14 md:size-16 mt-1 shrink-0">
                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r={radius} fill="transparent" strokeWidth="8" strokeDasharray={`${circ}`} strokeDashoffset={circ - progress}  className={`transition-all duration-500 ${details.data['vote_average'] >= 7 ? 'stroke-green-700' : 'stroke-yellow-600'}`} />
                                            </svg>
                                            <span className={`absolute text-base md:text-lg w-full h-full left-0 top-0 ${details.data['vote_average'] >= 7 ? 'text-green-300' : 'text-yellow-400' } flex items-center justify-center`} title='rating'>
                                                {details.data?.['vote_average'] == 0 ? 'NR' : Math.floor(details.data['vote_average'] * 10) / 10}
                                            </span>
                                        </div>
                                        <div className="">
                                            <h3 className="text-lg font-light text-slate-200">Genre</h3>
                                            <div className="flex text-base font-medium flex-wrap">
                                                {details.data?.['genres'].map((item, index) => (
                                                    <p key={item.name + index} className="text-no-wrap has-[+p]:after:content-['•'] after:text-lg after:mx-2">{item.name}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="py-4 text-base text-slate-400">{details.data.tagline}</p>
                                    <p className="md:text-base lg:text-lg text-slate-200">{details.data.overview}</p>
                                    <div className="flex flex-wrap justify-start items-center mt-6 mb-2">
                                        {credits.data?.crew.filter((crewMember) => crewMember.job === 'Director').map((crewMember, index) => (
                                            <div key={crewMember.id + index} className="flex flex-col items-center">
                                                <h5 className="text-sm text-slate-100 font-bold tracking-wider">{crewMember.name}</h5>
                                                <p className="text-sm text-slate-400 font-medium">{crewMember.job}</p>
                                            </div>
                                            
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
            {
                details.isSuccess && 
                <div className="md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto px-10 flex flex-col gap-5">
                    { credits.data?.cast.length > 0 &&
                        <div className="flex flex-col">
                            <h2 className="text-slate-200 text-lg sm:text-xl md:text-2xl font-bold">CAST</h2>
                            <div className="flex justify-between gap-5 w-full overflow-auto my-5 pb-5 scrollbar">
                                {
                                    credits.data?.cast.slice(0, 10 * castPage).map((castMember, index) => (
                                        <div key={castMember.id * index} className="min-w-40 flex flex-col items-center">
                                                    <div className="relative flex items-center justify-center size-16 bg-slate-200 rounded-full overflow-hidden">
                                                        <div className="absolute top-0 left-0 size-full bg-slate-400 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                                                        {<img src={castMember?.['profile_path'] ? BASE_IMAGE_URL_SMALL + castMember?.['profile_path'] : '/src/assets/avatar.svg'} alt="" className={`${castMember?.['profile_path'] ? '' : 'size-3/5'} size-full object-cover relative z-10`} />}
                                                    </div>
                                                    <h5 className="text-sm text-slate-100 font-bold tracking-wider text-center text-nowrap">{castMember.name}</h5>
                                                    {
                                                        type === 'tv' ?
                                                        (
                                                            castMember.roles.slice(0,3).map((character, index) => (
                                                                <span key={index} className="text-sm text-slate-400 font-medium text-center">{character.character}</span>
                                                            ))
                                                        )
                                                        :
                                                        <p className="text-sm text-slate-400 font-medium text-center">{castMember.character}</p>
                                                    }
                                                    
                                        </div>
                                    ))
                                }
                                {credits.data?.cast.length > 10 * castPage &&
                                <div className="min-w-32 flex-1 flex flex-col items-center self-center">
                                    <Button color="secondary" sx={{fontSize: '22', fontWeight: '1000'}} onClick={()=> setCastPage((prev) => prev + 1)}>See More</Button>
                                </div>}

                            </div>
                        </div>
                    }
                    {credits.data?.crew.length > 0 &&
                        <div className="flex flex-col">
                            <h2 className="text-slate-200 text-lg sm:text-xl md:text-2xl font-bold">CREW</h2>
                            <div className="flex justify-between gap-5 w-full overflow-auto my-5 pb-5 scrollbar">
                                {
                                    credits.data?.crew.slice(0, 10 * crewPage).map((crewMember, index) => (
                                        <div key={crewMember.id * index} className="min-w-40 flex flex-col items-center">
                                                    <div className="relative flex items-center justify-center size-16 bg-slate-200 rounded-full overflow-hidden">
                                                        <div className="absolute top-0 left-0 size-full bg-slate-400 animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
                                                        {<img src={crewMember?.['profile_path'] ? BASE_IMAGE_URL_SMALL + crewMember?.['profile_path'] : '/src/assets/avatar.svg'} alt="" className={`${crewMember?.['profile_path'] ? '' : 'size-3/5 '}size-full object-cover relative z-10`} />}
                                                    </div>
                                                    <h5 className="text-sm text-slate-100 font-bold tracking-wider text-center text-nowrap">{crewMember.name}</h5>
                                                    {
                                                        crewMember.jobs.length > 0 ?
                                                        (
                                                            crewMember.jobs.slice(0,3).map((job, index) => (
                                                                <p key={index} className="text-sm text-slate-400 font-medium text-center">{job.job}</p>
                                                            ))
                                                        )
                                                        :
                                                        <p className="text-sm text-slate-400 font-medium text-center">{crewMember.job}</p>
                                                    }
                                        </div>
                                    ))
                                }
                            {credits.data?.crew.length > 10 * crewPage &&
                                <div className="min-w-32 flex-1 flex flex-col items-center self-center">
                                    <Button color="secondary" sx={{fontSize: '22', fontWeight: '1000'}} onClick={()=> setCrewPage((prev) => prev + 1)}>See More</Button>
                                </div>}
                            </div>
                        </div>
                        }
                    
                    {similar?.data?.results.length > 0 &&
                        <div className="xl:max-w-5xl lg:max-w-4xl lg:mx-auto py-4 animscroll">
                            <div className="flex gap-1 sm:gap-3 md:gap-5 items-stretch sm:items-center justify-between sm:justify-start">
                                <div className="flex gap-1 sm:gap-3 md:gap-5 items-center justify-between sm:justify-start">
                                    <h2 className="text-slate-200 text-lg sm:text-xl md:text-2xl font-bold">Similar</h2>
                                </div>
                                <Button variant="text"  sx={{color: '#5eead4', marginLeft: 'auto'}} endIcon={<LaunchIcon />}> More </Button>
                            </div>
                            <Slider1 data={similar?.data?.results} type={type}/>
                        </div>}
                    
                    {recommended?.data?.results.length > 0 &&
                        <div className="xl:max-w-5xl lg:max-w-4xl lg:mx-auto py-4 animscroll">
                            <div className="flex gap-1 sm:gap-3 md:gap-5 items-stretch sm:items-center justify-between sm:justify-start">
                                <div className="flex gap-1 sm:gap-3 md:gap-5 items-center justify-between sm:justify-start">
                                    <h2 className="text-slate-200 text-lg sm:text-xl md:text-2xl font-bold">Recommended</h2>
                                </div>
                                <Button variant="text"  sx={{color: '#5eead4', marginLeft: 'auto'}} endIcon={<LaunchIcon />}> More </Button>
                            </div>
                            <Slider1 data={recommended?.data?.results} type={type}/>
                        </div>}

                </div>
            }
        </>
    )
}