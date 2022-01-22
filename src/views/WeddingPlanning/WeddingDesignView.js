import React from 'react';
import lightbox1 from '../../assets/img/wedding-planning-page/design/lightbox_1.jpg';
import lightbox2 from '../../assets/img/wedding-planning-page/design/lightbox_2.jpg';
import lightbox3 from '../../assets/img/wedding-planning-page/design/lightbox_3.jpg';
import lightbox4 from '../../assets/img/wedding-planning-page/design/lightbox_4.jpg';
import lightbox5 from '../../assets/img/wedding-planning-page/design/lightbox_5.jpg';
import lightbox6 from '../../assets/img/wedding-planning-page/design/lightbox_6.jpg';
import WeddingPlanningTemplate from "../../components/WeddingPlanningTemplate";

const lightboxData = [
    { title: "Wedding Beaver Creek", image: lightbox1},
    { title: "Custom Wedding Photography", image: lightbox2},
    { title: "Celebration after 'I do!'", image: lightbox3},
    { title: "First Kiss", image: lightbox4},
    { title: "Only in Colorado", image: lightbox5},
    { title: "Smiles All Around", image: lightbox6}
    ];

const WeddingDesignView = () => (
        <WeddingPlanningTemplate
            title="Design"
            description="If you've planned your wedding, but you're kind of stuck when it comes to the 'look' then this
            package is for you.  We will work with your venue to create a floor plan that utilizes the reception space to
            its full ability.  We will then create a full design plan that reflects your vision including lighting, linens
            and florals while maximizing your budget."
            lightbox={lightboxData}
        />
)

export default WeddingDesignView;
