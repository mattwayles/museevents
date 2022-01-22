import React from 'react';
import stock1 from '../../assets/img/wedding-planning-page/stock_1.jpg';
import stock2 from '../../assets/img/wedding-planning-page/stock_2.jpg';
import stock3 from '../../assets/img/wedding-planning-page/stock_3.jpg';
import stock4 from '../../assets/img/wedding-planning-page/stock_4.jpg';
import stock5 from '../../assets/img/wedding-planning-page/stock_5.jpg';
import stock6 from '../../assets/img/wedding-planning-page/stock_6.jpg';
import stock7 from '../../assets/img/wedding-planning-page/stock_7.jpg';
import stock8 from '../../assets/img/wedding-planning-page/stock_8.jpg';
import stock9 from '../../assets/img/wedding-planning-page/stock_9.jpg';
import CardContainer from "../../components/CardContainer";

const links = [
    {label: "Full Wedding Planning", url: "/full-wedding-planning", img: stock1,
        description: "With this package, our team will help you with every single element of your wedding down to the " +
            "smallest detail. Your itinerary will be completely managed and planned to perfection."},
    {label: "Partial Wedding Planning", url: "/partial-planning", img: stock2, description: "Our partial wedding planning " +
            "package incorporates both your ideas and ours. We will incorporate our help with your needs."},
    {label: "Wedding Coordination", url: "/wedding-coordination", img: stock3, description: "At Muse Events, our staff " +
            "will help you coordinate your various wedding activities to make sure your special day goes smoothly."},
    {label: "Intimate Weddings", url: "/intimate-and-elopements", img: stock4, description: "Full Planning of every element of " +
            "your small wedding down to the smallest detail. Or Intimate Wedding Coordination for an intimate experience " +
            "managed to perfection."},
    {label: "Destination Weddings", url: "/wedding-design", img: stock5, description: "Worldwide, From Fiji to Italy, " +
            "Costa Rica or Hawaii!  we plan weddings all over the world, taking care of all of the planning from the " +
            "ceremony details to transportation your guests, to give you your dream wedding! "},
    {label: "Elopements", url: "/intimate-and-elopements", img: stock6, description: "Whether you want it to be just the two of you, " +
            "or maybe just a handful of guests. No matter what size your wedding, there as tons of details so we help you " +
            "through the planning of your Colorado elopement. "},
    {label: "A La Carte", url: "/a-la-carte", img: stock7, description: "We offer a wide variety of extra services that " +
            "can be added to any package. You can play around and mix and match a variety of these additional services " +
            "to make your wedding more unique and personalized."},
    {label: "Design", url: "/wedding-design", img: stock8, description: "Our design team will help your dreams come to " +
            "life through personalized plans made to meet all of your needs."},
    {label: "Rental Assistance", url: "/wedding-design", img: stock9, description: "Our team will coordinate all " +
            "rental plans that range from wedding dresses to decor that will be used at the wedding. Renting plans will " +
            "be coordinated between our team and your selected vendors."},

]

const WeddingPlanningView = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <CardContainer content={links} />
        </div>
    )
}

export default WeddingPlanningView;
