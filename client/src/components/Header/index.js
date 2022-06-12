import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
    /*
        menus to include in the header:
        Towing Login, Building Login, Dashboard, Logout

    */

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
            <nav>
                {Auth.loggedIn() ? (
                    <>
                        <Link to="/dashboard">My Dashboard</Link>
                        <a href="/" onClick={logout}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/towingLogin">Towing Login</Link>
                        <Link to="/buildingLogin">Building Login</Link>
                        <Link to="/signup">SignUp</Link>
                    </>
                )}
            </nav>
        </header>
    )
};

export default Header;