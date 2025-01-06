import { Paper } from "@mui/material";
import { BASE_IMAGE_URL_SMALL } from "../../services/api";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function Card2(props) {
    const radius = 45;
    const circ = 2 * Math.PI * radius;
    const progress = (props.vote_average / 10) * circ;
    
    const year = new Date(props?.['release_date'] || props?.['first_air_date']).getFullYear();

    return (
        <Link key={props.id} to={`/${props['media_type'] ? props['media_type'] : props.type}/${props.id}`} className="flex flex-col  max-w-60">
            <div className="px-2 flex-1 flex flex-col group overflow-hidden">
                <Paper elevation={1} className={`flex-1 h-full w-full rounded-lg overflow-hidden relative`}>
                    <img src={props['poster_path'] || props['backrop_path'] ? BASE_IMAGE_URL_SMALL + props['poster_path'] || props['backdrop_path'] : '/src/assets/placeholder.svg'} alt={props?.title}  className="h-full min-h-[15rem] w-full object-cover"/>
                    <div className="absolute top-0 md:translate-y-full group-hover:translate-y-0 transition duration-200 h-full w-full bg-gradient-to-t from-[#000000ee] to-transparent to-25% md:to-75% z-1"></div>
                    <div className="flex justify-between absolute bottom-1 w-full px-2">
                        <span className="text-neutral-100 text-sm font-medium opacity-100 md:opacity-0 group-hover:md:opacity-100 transition duration-300" title={props['release_date'] ? `released on ${props['release_date']}` : `First aired on ${props['first_air_date']}`}>{year || 'NA'}</span>
                        {props['media_type'] == 'tv' && <p className="text-neutral-100 text-xs md:text-sm font-medium hidden md:block md:opacity-0 group-hover:md:opacity-100 transition duration-300">TV Show</p>}
                    </div>
                </Paper>
                <div className="flex flex-col-reverse md:flex-row gap-2 md:translate-y-10 md:opacity-0 group-hover:opacity-100 md:group-hover:translate-y-0 transition duration-300">
                    <div className="flex gap-1 items-center justify-between">
                        {/* <span className="text-neutral-100 text-xs md:text-sm font-bold transition duration-300 md:hidden" title={props['release_date'] ? `released on ${props['release_date']}` : `First aired on ${props['first_air_date']}`}>{year || 'NA'}</span> */}
                        <div className="relative md:size-11 mt-1 shrink-0">
                            <svg className="w-full hidden md:block h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r={radius} fill="transparent" strokeWidth="8" strokeDasharray={`${circ}`} strokeDashoffset={circ - progress}  className={`transition-all duration-500 ${props['vote_average'] >= 7 ? 'stroke-green-700' : 'stroke-yellow-600'}`} />
                            </svg>
                            <span className={`md:absolute text-xs md:text-sm w-full h-full left-0 top-0 ${props['vote_average'] >= 7 ? 'text-green-300' : 'text-yellow-400' } flex items-center justify-center`} title='rating'>
                                {Math.floor(props['vote_average']) > 0 ? Math.floor(props['vote_average'] * 10) / 10 : 'NR'}
                            </span>
                        </div>
                        {
                            props['media_type'] == 'tv' && <p className="text-neutral-100 text-xs md:text-sm font-bold md:hidden">TV Show</p>
                        }
                    </div>
                    <h2 className="text-white text-xs sm:text-sm md:text-normal lg:text-medium mt-2 line-clamp-3 md:self-center" title={props?.title || props?.name}>{props?.title || props?.name}</h2>
                </div>
            </div>
        </Link>
    )
}