import { useParams } from "react-router-dom"

export default function Search() {
    const params = useParams();
    // console.log(params)
    
    return (
        <div>{params.query}</div>
    )
}