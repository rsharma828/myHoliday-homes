import { Link } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import { SignOutButton } from "./SignOutButton";

export const Header = () => {

    const { isLoggedIn } = useAppContext();

    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-blod tracking-tight">
                    <Link to="/">Mybooking.com</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? <>
                        <Link className="flex items-center text-white hover:bg-blue-500 px-3 rounded-md" to="/my-bookings" >My Bookings</Link>
                        <Link className="flex items-center text-white hover:bg-blue-500 px-3 rounded-md" to="/my-hotels">My Hotels</Link>
                        <SignOutButton />
                    </> : <Link to="/signin" className="flex items-center bg-white text-blue-600 px-3 fond-bold hover:bg-gray-100">Sign In</Link>}

                </span>
            </div>
        </div>
    )
}