import React from 'react';
import WeddingPlanningTemplate from "../../components/WeddingPlanningTemplate";

const bulletPoints = [
    "Honey Moon Planning",
"Wedding Concierge Service",
    "Full Wedding Weekend Planning",
    "Destination Wedding Package­ We love to travel! If you are planning a destination wedding, our planners can assist you in making your dream wedding happen in your dream location!",
    "Rehearsal Dinner Coordination Farewell Brunch, or Bridal Shower Coordination - $400 each",
    "Bridal Shower, Bridal Luncheon, Rehearsal Dinner or Bachelor/ Bachelorette Party Planning - $400 each",
    "Ceremony & Reception Venue Tours & Contract Review - $400 For up to 6 Venues",
    "Vendor Referrals & Contract Review - $300 (Get 5 referrals per vendor category based on your wedding & contract review upon booking)",
    "Development of Wedding Planning Timeline - $150",
    "Unique event theme, color & décor design - $250",
    "Budget Development & Tracking - $150",
    "Cookie car",
    "We also do Cookie bars"
];

const WeddingALaCarteView = () => (
        <WeddingPlanningTemplate
            title="A La Carte"
            description={"The Following services can be added to any package, purchased A­ la­ Carte or combined into a " +
            "customized package."}
            bulletPoints={bulletPoints}
        />
)

export default WeddingALaCarteView;
