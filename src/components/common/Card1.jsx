import { Paper } from "@mui/material";
import { BASE_IMAGE_URL_SMALL } from "../../services/api";
import { Link } from "react-router-dom";

let startX, startY;
const handleMouseDown = (e) => {
    e.preventDefault();
    startX = e.pageX;
    startY = e.pageY; 
}

const handleMouseClick = (e) => {
    if (startX !== e.pageX && startY !== e.pageY) {
        e.preventDefault();
    }
}

const handleMouseUp = (e) => {
    if (startX !== e.pageX && startY !== e.pageY) {
        e.preventDefault();
    }
}

/* eslint-disable react/prop-types */
export default function Card1(props, slider = 'true') {
    const radius = 45;
    const circ = 2 * Math.PI * radius;
    const progress = (props.vote_average / 10) * circ;
    
    const year = new Date(props?.['release_date'] || props?.['first_air_date']).getFullYear();

    return (
        <Link key={props.id} to={`/${props['media_type'] ? props['media_type'] : props.type}/${props.id}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onClick={handleMouseClick}>
            <div className="px-2 flex flex-col group overflow-hidden">
                <Paper elevation={1} className={`${slider ? 'sm:h-60 md:h-72' : 'w-full' } rounded-lg overflow-hidden relative`}>
                    <img src={props['poster_path'] || props['backrop_path'] ? BASE_IMAGE_URL_SMALL + props['poster_path'] || props['backdrop_path'] : '/src/assets/placeholder.svg'} alt={props?.title}  className="h-full w-full object-cover"/>
                    <div className="absolute top-0 md:translate-y-full group-hover:translate-y-0 transition duration-200 h-full w-full bg-gradient-to-t from-[#000000ee] to-transparent to-25% md:to-75% z-1"></div>
                    <span className="absolute bottom-1 left-3 text-neutral-200 text-sm font-medium opacity-0 group-hover:md:opacity-100 transition duration-300" title={props['release_date'] ? `released on ${props['release_date']}` : `First aired on ${props['first_air_date']}`}>{year || 'NA'}</span>
                </Paper>
                <div className="flex flex-col-reverse md:flex-row gap-2 md:translate-y-10 md:opacity-0 group-hover:opacity-100 md:group-hover:translate-y-0 transition duration-300">
                    <div className="flex gap-1 items-center">
                        <span className="text-neutral-100 text-xs md:text-sm font-bold transition duration-300 md:hidden" title={props['release_date'] ? `released on ${props['release_date']}` : `First aired on ${props['first_air_date']}`}>{year || 'NA'}</span>
                        <div className="relative md:size-11 mt-1 shrink-0 mx-auto md:mx-0">
                            <svg className="w-full hidden md:block h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r={radius} fill="transparent" strokeWidth="8" strokeDasharray={`${circ}`} strokeDashoffset={circ - progress}  className={`transition-all duration-500 ${props['vote_average'] >= 7 ? 'stroke-green-700' : 'stroke-yellow-600'}`} />
                            </svg>
                            <span className={`absolute text-xs md:text-sm w-full h-full left-0 top-0 ${props['vote_average'] >= 7 ? 'text-green-300' : 'text-yellow-400' } flex items-center justify-center`} title='rating'>
                                {Math.floor(props['vote_average']) > 0 ? Math.floor(props['vote_average'] * 10) / 10 : 'NR'}
                            </span>
                        </div>
                    </div>
                    <h2 className="text-white text-xs sm:text-sm md:text-normal lg:text-medium mt-2 line-clamp-3 self-center" title={props?.title || props?.name}>{props?.title || props?.name}</h2>
                </div>
            </div>
        </Link>
    )
}