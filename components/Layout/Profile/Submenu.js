import React from "react";

const Submenu = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">

                <div className="user-profile-submenu">
                    <ul>
                        <li><a className="active" href="#home">Activity</a></li>
                        <li><a href="#news">Shout Outs</a></li>
                        <li><a href="#contact">Followers</a></li>
                        <li><a href="#about">Favorites</a></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Submenu;
