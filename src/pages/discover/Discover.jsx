import { useParams } from "react-router-dom";

export default function Discover() {
    console.log(useParams());
    const { type } = useParams();

    return (
        <h1>Discover [{type}]</h1>
    )
}