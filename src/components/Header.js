import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
    const isOnline = useOnlineStatus();
    return (
        <div className="flex justify-between items-center p-6 bg-green-600 text-white">
            <div className="w-56">
                <img className="logo" src={LOGO_URL} alt="Netflix Logo" />
            </div>
            <div className="nav-items">
               
                <ul className="flex items-center gap-4">
                    <li className="nav-item"> {isOnline ? <h3>🟢 Online</h3> : <h3>🔴 Offline</h3>}</li>
                    <li className="cursor-pointer hover:text-gray-300">
                        {/* Using Link component from react-router-dom to navigate */}
                        <Link to="/">Home</Link>
                    </li>
                    <li className="cursor-pointer  hover:text-gray-300">
                        <Link to= "/about">About Us </Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-300">
                        <Link to= "/contact">Contact Us</Link>
                    </li>
                    <li className="cursor-pointer hover:text-gray-300">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                
                    <li className="cursor-pointer hover:text-gray-300">Cart</li>
                 </ul>   
            </div>
        </div>
    )
}

export default Header;