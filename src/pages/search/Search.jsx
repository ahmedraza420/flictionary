import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { getSearch } from "../../services/search";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card2 from "../../components/common/Card2";
import { Button } from "@mui/material";

export default function Search() {
    const { query } = useParams();
    const navigate = useNavigate();
    // console.log(params)

    const searchResult = useQuery({
        queryKey: ['search', query],
        queryFn: () => getSearch(query),
    })
    
    console.log(searchResult.data);

    return (
        <>
            {/* <div className="grid grid-cols-[300px,1fr] pt-10">
                <div className=""></div>
                <div className=""> */}
                <div className="md:max-w-4xl lg:max-w-5xl xl:max-w-7xl mx-auto px-10 flex flex-col gap-5 py-5">  
                    <div className="py-2 px-3 flex gap-10">
                        <Button component="label" role={undefined} color="primary" variant="text" tabIndex={3} startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}> Back </Button>
                        <h2 className="text-2xl text-slate-200">Searched For <span className="font-bold">&quot;{query}&quot;</span></h2>
                    </div>
                    {
                        searchResult.isLoading ? 
                            <div className="flex-col gap-4 w-full flex items-center justify-center">
                                <div className="w-20 h-20 border-4 border-transparent animate-spin flex items-center justify-center border-t-teal-400 rounded-full">
                                    <div className="w-16 h-16 border-4 border-transparent animate-spin flex items-center justify-center border-t-blue-400 rounded-full" ></div>
                                </div>
                            </div>
                            :
                            <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,1fr))] grid-rows-[repeat(auto-fit,_minmax(100px,1fr))] gap-x-6 gap-y-8 justify-items-center">
                                {
                                    searchResult.data?.results?.filter((item)=> item?.['media_type'] !== 'person').map((item) => (
                                        <Card2 key={item.id} {...item} slider='false'/>
                                    ))
                                }
                            </div>
                    }
                {/* </div> */}
            </div>
            <div id="pageBottom" className="min-h-10 pb-5">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-20 h-20 border-4 border-transparent animate-spin flex items-center justify-center border-t-teal-400 rounded-full">
                        <div className="w-16 h-16 border-4 border-transparent animate-spin flex items-center justify-center border-t-blue-400 rounded-full" ></div>
                    </div>
                </div>
            </div>
        </>
    )
}