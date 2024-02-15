import React from "react";
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">
                        <i className="fa fa-mobile text-warning"></i> Contact <span className="text-warning">Manager</span>
                    </Link>
                </div>
            </nav>
        </React.Fragment>
    )
}
