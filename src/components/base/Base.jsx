import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from 'react-router-dom'

export default function Base() {
    return (
        <div className="flex flex-1 flex-col h-full">
            <Header/>
                <div className="flex-1">
                    <Outlet />
                </div>
            <Footer />
        </div>
        
    )
}