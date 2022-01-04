import React from 'react';
import logoImg from '../assets/img/logo.jpg'
import {NavLink} from 'react-router-dom';

const NavigationBar = () => {

    const links = [
        {label: "Home", to: "/"},
        {label: "Wedding Planning", to: "/wedding-planning"},
        {label: "Event Planning", to: "/event-planning"},
        {label: "Amazing Proposals", to: "/amazing-proposals"},
        {label: "Testimonials", to: "/testimonials"},
        {label: "Instagram", to: "/instagram"},
        {label: "Gallery", to: "/photo-albums"},
        {label: "Contact", to: "/contactform"},
        {label: "Blog", to: "/blog"},
    ];

    return (
        <div className="fixed w-screen bg-white z-50 py-2">
            <div className="flex flex-row justify-between items-center w-screen px-8">
                <a href="https://www.museevents.com"><img src={logoImg} alt="Muse Events" /></a>
                    {links.map(link =>
                        <NavLink
                            className={({ isActive }) => 'mx-4 cursor-pointer text-sm font-proxima ' + (isActive && 'text-peach')}
                            to={link.to}>
                            {link.label}
                        </NavLink>)}
                        <div className="cursor-pointer font-didot">
                    <a className="no-underline" href="https://www.aisleplanner.com/signin/MuseEvents">
                        Client Login
                    </a>
                </div>
            </div>
        </div>
    )
}

export default NavigationBar;
