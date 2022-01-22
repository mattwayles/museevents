import React from 'react';
import lightbox1 from '../../assets/img/wedding-planning-page/full/lightbox_1.jpg';
import lightbox2 from '../../assets/img/wedding-planning-page/full/lightbox_2.jpg';
import lightbox3 from '../../assets/img/wedding-planning-page/full/lightbox_3.jpg';
import lightbox4 from '../../assets/img/wedding-planning-page/full/lightbox_4.jpg';
import lightbox5 from '../../assets/img/wedding-planning-page/full/lightbox_5.jpg';
import lightbox6 from '../../assets/img/wedding-planning-page/full/lightbox_6.jpg';
import WeddingPlanningTemplate from "../../components/WeddingPlanningTemplate";

const lightboxData = [
    { title: "Wedding Beaver Creek", description: "Beaver Creek Wedding with V.I.P Guest List", image: lightbox1},
    { title: "Summer Bliss", description: "Summer Wedding in Breckenridge", image: lightbox2},
    { title: "Sunset Newlyweds", description: "Newlyweds alight in the Colorado sunset", image: lightbox3},
    { title: "Saying Vows", description: "Exchanging vows at Spruce Mountain Ranch in Colorado", image: lightbox4},
    { title: "First Kiss", description: "Newlyweds first kiss as a married couple at Red Rocks in Morrison, Colorado", image: lightbox5},
    { title: "Keystone Bridal Party", description: "Wedding Party Fun in the Rocky Mountains", image: lightbox6},
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

const FullWeddingPlanningView = () => (
        <WeddingPlanningTemplate
            title="Full Wedding Planning"
            description='At Muse Events our expert wedding planners coordinate the details, vendors and itinerary for
            your wedding. With our services you will receive unlimited consultations via phone, email, and in person,
            as well as answers to questions, advice and a monthly planning checklists. We will create a realistic budget,
            provide recommendations and bid estimates, arrange vendor appointments, negotiate  contracts,
            arrange out-of-town guest accommodations and create your ceremony and reception site designs as well as
            handling all set up and delivery scheduling. We develop a timeline and keep all vendors on schedule on your
            wedding day. Muse Events will be on-site for your ceremony and reception, tending to all of your wedding
            needs. In short, we attend to all details and issues that may arise so you can enjoy your wedding.
            All we need from you is to show up and say "I do"!'
            lightbox={lightboxData}
            bulletPoints={bulletPoints}
        />
)

export default FullWeddingPlanningView;
