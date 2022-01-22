import React from 'react';
import stock1 from '../../assets/img/event-planning-page/stock_1.jpg';
import stock2 from '../../assets/img/event-planning-page/stock_2.jpg';
import stock3 from '../../assets/img/event-planning-page/stock_3.jpg';
import CardContainer from "../../components/CardContainer";

const links = [
    {label: "Corporate Events", url: "/corporate-events", img: stock1,
        description: "With Muse Events, planning your corporate event is hassle free and easy. We will help structure and " +
            "formulate a plan that ensures your event goes smoothly and flawlessly. Our corporate events are both " +
            "engaging and exciting."},
    {label: "Events and Galas", url: "/events-and-galas", img: stock2, description: "Planning your special event is " +
            "important.You want everything to be perfect. At Muse Events, you’ll receive exceptional personal attention " +
            "with planning, coordinating, and executing the details of your occasion. resulting in a memorable affair."},
    {label: "Parties and Celebrations", url: "/parties-and-celebrations", img: stock3, description: "Whatever your event " +
            "style, our special event planners personally work with you to ensure your occasion is unique and remarkable. " +
            "From Birthdays to Engagement Parties, We strive to exceed your expectations and make your event extraordinary."}
];

const EventPlanningView = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <CardContainer content={links} />
        </div>
    )
}

export default EventPlanningView;
