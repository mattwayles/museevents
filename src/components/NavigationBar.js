import React, {useEffect, useState} from 'react';
import logoImg from '../assets/img/logo.jpg'
import {NavLink} from 'react-router-dom';
import {useLocation} from "react-router";

const links = [
    {label: "Home", to: "/"},
    {label: "Wedding Planning", to: "/wedding-planning", menuItems: [
            {label: "Full Wedding Planning", to: "/full-wedding-planning"},
            {label: "Partial Planning", to: "/partial-planning"},
            {label: "Wedding Coordination", to: "/wedding-coordination"},
            {label: "A La Carte", to: "/a-la-carte"},
            {label: "Design", to: "/wedding-design"},
            {label: "Intimate Weddings & Elopements", to: "/intimate-and-elopements"},
        ]},
    {label: "Event Planning", to: "/event-planning", menuItems: [
            {label: "Corporate Events", to: "/corporate-events"},
            {label: "Events and Galas", to: "/events-and-galas"},
            {label: "Parties and Celebrations", to: "/parties-and-celebrations"},
        ]},
    {label: "Amazing Proposals", to: "/amazing-proposals", menuItems: [
            {label: "About", to: "/about"},
            {label: "Proposal Packages", to: "/proposal-packages"},
        ]},
    {label: "Testimonials", to: "/testimonials"},
    {label: "Instagram", to: "/instagram"},
    {label: "Gallery", to: "/photo-albums"},
    {label: "Contact", to: "/contactform"},
    {label: "Blog", to: "/blog"},
];

const NavigationBar = () => {
    return (
        <div className="fixed w-screen bg-white z-50 py-2">
            <div className="flex flex-row justify-between items-center w-screen px-8">
                <a href="https://www.museevents.com"><img src={logoImg} alt="Muse Events" /></a>
                {links.map(link => <NavigationItem link={link} />)}
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

const NavigationItem = (props) => {
    const { link } = props;
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(null);
    const [activeItems, setActiveItems] = useState(["Home"]);

    useEffect(() => {
        const updatedActiveItems = [];
        links.forEach(link => {
            if (link.to === location.pathname)
                updatedActiveItems.push(link.label);

            if (link.menuItems) {
                link.menuItems.forEach(menuItem => {
                    if (menuItem.to === location.pathname) {
                        updatedActiveItems.push(link.label);
                        updatedActiveItems.push(menuItem.label);
                    }
                })
            }
        });
        setActiveItems(updatedActiveItems);
    }, [location])

    return (
        <div className="flex flex-col"
             onClick={() => setMenuOpen(null)}
             onMouseLeave={() => setMenuOpen(null)}
             onMouseEnter={() => setMenuOpen(link.label)}>
            <NavLink
                className={'mx-4 cursor-pointer text-sm font-proxima ' + (activeItems.indexOf(link.label) > -1 && 'text-peach')}
                to={link.to}>
                {link.label}
            </NavLink>
            {link.menuItems && menuOpen === link.label && <NavigationMenu link={link} activeItems={activeItems} />}
        </div>
    )
}

const NavigationMenu = (props) => (
    <div className="absolute mt-5 ml-2 pt-2 bg-white flex flex-col drop-shadow-xl
                            border-l-2 border-r-2 border-b-2 border-solid overflow-hidden animate-grow">
        {props.link.menuItems.map(menuItem =>
            <NavLink
                className={"cursor-pointer text-xs font-proxima p-2 " +
                    (props.activeItems.indexOf(menuItem.label) > -1 && 'text-peach')}
                to={menuItem.to}>
                {menuItem.label}
            </NavLink>
        )}
    </div>
)

