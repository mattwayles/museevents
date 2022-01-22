import React from 'react';
import lightbox1 from '../../assets/img/wedding-planning-page/intimate/lightbox_1.jpg';
import lightbox2 from '../../assets/img/wedding-planning-page/intimate/lightbox_2.jpg';
import lightbox3 from '../../assets/img/wedding-planning-page/intimate/lightbox_3.jpg';
import lightbox4 from '../../assets/img/wedding-planning-page/intimate/lightbox_4.jpg';
import lightbox5 from '../../assets/img/wedding-planning-page/intimate/lightbox_5.jpg';
import lightbox6 from '../../assets/img/wedding-planning-page/intimate/lightbox_6.jpg';
import WeddingPlanningTemplate from "../../components/WeddingPlanningTemplate";

const lightboxData = [
    { title: "Wedding Beaver Creek", image: lightbox1},
    { title: "You May Now Kiss The Bride!", image: lightbox2},
    { title: "Exchanging Vows", image: lightbox3},
    { title: "Lakefront Ceremony", image: lightbox4},
    { title: "Colorful Table Settings", image: lightbox5},
    { title: "Happy Bride Hears Groom's Vows", image: lightbox6}
    ];

const bulletPoints = [
    "Complete wedding design, planning & coordination",
    "Personal Assistance",
    "Budget Development & Management",
    "Vendor Referrals & Selection & Booking",
    "Ceremony and Reception Site Search & Visits",
    "Etiquette Advisement",
    "Menu & Catering Assistance",
    "Delivery of welcome baskets/bags to hotel",
    "Planning and execution of rehearsal dinner",
    "Invitation, Stationery, Favor, & Gift Selection",
    "Unlimited Consultation Hours",
    "Custom Timelines, Schedules, & Checklists",
    "Wedding day schedule for bridal party and family",
    "Contract Negotiation & Review",
    "Unique Wedding Theme & Design",
    "Floral Design & Décor Assistance",
    "Tent, Chair, & Linen Rental Assistance",
    "Negotiation of guest room blocks if needed",
    "Development of floor plan and seating chart for wedding day ",
    "Vows, Readings, & Music Selection"
];

const IntimateWeddingsAndElopementsView = () => (
        <WeddingPlanningTemplate
            title="Intimate Weddings & Elopements"
            description={"For the bride who wants a fabulous wedding without all the hassle of long term planning and BIG " +
            "guest lists!\n\nMuse Events offers flexible customized packages, please contact us for more information."}
            lightbox={lightboxData}
            bulletPoints={bulletPoints}
        />
)

export default IntimateWeddingsAndElopementsView;
