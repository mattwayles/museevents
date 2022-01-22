import React from 'react';
import lightbox1 from '../../assets/img/wedding-planning-page/coordination/lightbox_1.jpg';
import lightbox2 from '../../assets/img/wedding-planning-page/coordination/lightbox_2.jpg';
import lightbox3 from '../../assets/img/wedding-planning-page/coordination/lightbox_3.jpg';
import lightbox4 from '../../assets/img/wedding-planning-page/coordination/lightbox_4.jpg';
import lightbox5 from '../../assets/img/wedding-planning-page/coordination/lightbox_5.jpg';
import lightbox6 from '../../assets/img/wedding-planning-page/coordination/lightbox_6.jpg';
import WeddingPlanningTemplate from "../../components/WeddingPlanningTemplate";

const lightboxData = [
    { title: "Bride in the Woods", image: lightbox1},
    { title: "Wedding Welcome Sign", image: lightbox2},
    { title: "Their Special Day", image: lightbox3},
    { title: "Wedding Cake", image: lightbox4},
    { title: "Groom Bowtie and Corsage", image: lightbox5},
    { title: "Ceremony Decorations", image: lightbox6},
];

const bulletPoints = [
    "Final Vendor Confirmations",
    "Detailed wedding day timelines for vendors and staff",
    "Coordinate Rehearsal",
    "Pickup of all personal items for wedding day",
    "Delivery of wedding gown to the ceremony site",
    "Oversee Setup of Ceremony & Reception",
    "Set up of chairs, aisle runner, candles, programs, etc. at the ceremony",
    "Setup and decoration of reception area",
    "Assist bride and wedding party in dressing room prior to ceremony",
    "Organization and distribution of all personal wedding flowers",
    "Coordinate Ceremony",
    "Coordinate Processional & Recessional",
    "Transport decor & flowers from the ceremony to the reception",
    "Meet, Greet, & Supervise Vendors",
    "Behind the scenes event management and troubleshooting",
    "Manage Timing of Wedding Highlights",
    "Coordination of entertainment and all announcements of events",
    "Manage and Coordinate Reception",
    "Distribution of gratuities to the necessary vendors",
    "Oversee Reception Breakdown & Cleanup",
    "Wedding Day Emergency Kit"
];

const WeddingCoordinationView = () => (
        <WeddingPlanningTemplate
            title="Wedding Coordination"
            description={"Muse Events Wedding Day Coordination allows you to relax and enjoy your wedding day. This is the " +
            "ideal service to give you the wedding day you envision without the stress. When you see your beloved waiting " +
            "for you at the altar all you need to do is say “I do”, and we will take care of the rest. Although the service " +
            "is typically called wedding day coordination, Muse Events will begin working with you a month prior to the" +
            " wedding when your wedding director will meet with you to go over all of your planning details. From there " +
            "we confirm your wedding vendors, create your timeline, and manage everything from A-Z on your wedding day, " +
            "never limiting the number of hours we work on your wedding day." +
            "\n\nPrice Range $1,100-$1,800" +
            "\n\nIntimate Weddings $800-$1,200"}
            lightbox={lightboxData}
            bulletPoints={bulletPoints}
        />
)

export default WeddingCoordinationView;
