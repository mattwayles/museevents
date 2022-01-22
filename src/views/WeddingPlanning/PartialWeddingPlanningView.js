import React from 'react';
import lightbox1 from '../../assets/img/wedding-planning-page/partial/lightbox_1.jpg';
import lightbox2 from '../../assets/img/wedding-planning-page/partial/lightbox_2.jpg';
import lightbox3 from '../../assets/img/wedding-planning-page/partial/lightbox_3.jpg';
import lightbox4 from '../../assets/img/wedding-planning-page/partial/lightbox_4.jpg';
import lightbox5 from '../../assets/img/wedding-planning-page/partial/lightbox_5.jpg';
import lightbox6 from '../../assets/img/wedding-planning-page/partial/lightbox_6.jpg';
import WeddingPlanningTemplate from "../../components/WeddingPlanningTemplate";

const lightboxData = [
    { title: "Wedding Couple", description: "Newlyweds at Sweatheart", image: lightbox1},
    { title: "Denver Wedding Couple Decor", description: "Happy Couple Dancing at a Denver Wedding", image: lightbox2},
    { title: "Vail Wedding", description: "Vail Wedding at Piney River Ranch", image: lightbox3},
    { title: "Wedding Favors", description: "Cute favors for the Wedding Guests", image: lightbox4},
    { title: "Table Decor", description: "Wedding Decor & Inspiration", image: lightbox5},
    { title: "Barn Wedding", description: "Chatfield Botanic Gardens Denver newlyweds having the BEST time at their reception", image: lightbox6},
];

const bulletPoints = [
    "Unlimited Consultation Hours",
    "Budget Development & Management",
    "Custom Timelines, Schedules, & Checklists",
    "Ceremony and Reception Site Search & Visits",
    "Vendor Referrals & Selection",
    "Contract Negotiation & Review",
    "Unique Wedding Theme & Design",
    "Floral Design & Décor Assistance",
    "Invitation, Stationery, Favor, & Gift Selection",
    "Vows, Readings, & Music Selection",
    "Rental Assistance",
    "Negotiation of guest room blocks",
    "Development of floor plan and seating chart",
    "Menu & Catering Assistance",
    "Delivery of welcome baskets/bags to hotel",
    "Final Vendor Confirmations ",
    "Detailed wedding day timeline",
    "Delivery of wedding gown & DIY to venue",
    "Oversee Setup of Ceremony & Reception",
    "Full setup and decoration of ceremony & reception area",
    "Setup of guest book, place cards, favors, etc. at reception",
    "Assist bride and wedding party prior to ceremony",
    "Distribution & Set up of all wedding flowers",
    "Coordinate Rehearsal, Ceremony, & Reception",
    "Coordinate Processional & Recessional",
    "Supervise Vendors",
    "Behind the scenes event management & troubleshooting",
    "Coordination of entertainment and announcements",
    "Manage Reception Timing",
    "Distribution of gratuities to the necessary vendors",
    "Oversee Reception Breakdown & Cleanup",
    "Wedding Day Emergency Kit Pricing"
];

const PartialWeddingPlanningView = () => (
        <WeddingPlanningTemplate
            title="Partial Planning"
            description={"At Muse Events, we have created this custom package for the couple looking to play an active " +
            "role in the planning process. If you enjoy planning your wedding but need a little professional help making " +
            "decisions and planning the details whether you have begun the planning process, or not, this is the package " +
            "for you. Relax and leave the stress to us. With this package you will receive unlimited consultations via " +
            "phone, email or in person, answers to questions and advice and a monthly timeline for you to follow. We provide " +
            "vendor recommendations and bid estimates, arrange vendor appointments, and negotiate  contracts. We will " +
            "arrange out-of-town guest accommodations and create your ceremony and reception site designs as well as " +
            "handling all set up and delivery scheduling.\nStarting at only $2400."}
            lightbox={lightboxData}
            bulletPoints={bulletPoints}
            onYourDay
        />
)

export default PartialWeddingPlanningView;
