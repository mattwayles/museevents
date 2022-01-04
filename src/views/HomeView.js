import React from 'react';
import galleryImg from '../assets/img/homepage/homepage_gallery.jpg';
import services1Img from '../assets/img/homepage/homepage_services_1.jpg';
import testimonialsImg from '../assets/img/homepage/homepage_testimonials.jpg';
import Slideshow from "../components/Slideshow";
import Button from "../components/Button";

const HomeView = () => {
    return(
        <React.Fragment>
            <Slideshow />
            <p className="text-center mt-2 mb-32 font-didot font-bold text-xl">Muse Events Colorado - your perfect event awaits...</p>
            <Services />
            <Gallery />
            <Testimonials />
        </React.Fragment>
    )
}

export default HomeView;

const Services = () => (
    <HomepageSection
        title="Services"
        description="Muse Events is one of Denver's Top 10 Wedding Planners.
            Our weddings have been featured in Style Me Pretty, Perfect Wedding Guide and Whimsical Wonderland Weddings.
            We use personal touches to create a warm and intimate celebration for each of our couples.
            Our planners have the knowledge and experience to create an amazing and memorable experience."
        buttons={
            <React.Fragment>
                <Button label="Wedding Packages" url="/wedding-planning" />
                <Button label="Event Packages" url="/event-planning" />
            </React.Fragment>
        }
        imgSrc={services1Img}
    />
);

const Gallery = () => (
    <HomepageSection
        invert
        title="Gallery"
        description="Our portfolio illustrates the meticulous attention to detail that Muse Events puts into every
            single one of our events."
        buttons={<Button label="View Photos" url="/photo-albums" />}
        imgSrc={galleryImg}
    />
)

const Testimonials = () => (
    <HomepageSection
        title="Testimonials"
        description='"...wonderful ideas and was able to make all of my visions come to life..."    -Melissa'
        buttons={<Button label="More Testimonials" url="/testimonials" />}
        imgSrc={testimonialsImg}
    />
)


const HomepageSection = (props) => (
    <div className="w-full flex flex-row justify-center items-start mb-32">
        <div className="w-3/4 flex flex-row justify-evenly items-start">
            {props.invert && <img className="w-1/2 h-[25vw] drop-shadow-imgInvert" src={props.imgSrc} alt="Muse Events"/>}
            <HomepageSectionText{...props} />
            {!props.invert && <img className="w-1/2 h-[25vw] drop-shadow-img" src={props.imgSrc} alt="Muse Events"/>}
        </div>
    </div>
);

const HomepageSectionText = (props) => (
    <div className='flex flex-col justify-start items-start w-1/3'>
        <div className="flex flex-row justify-center items-baseline mb-6">
            <div className="font-didot text-7xl">{props.title.charAt(0)}</div>
            <div className="font-didot text-2xl">{props.title.slice(1)}</div>
        </div>
        <div className="font-proxima text-sm pl-8 mb-8">{props.description}</div>
        <div className="w-full flex flex-row justify-between items-center">
            {props.buttons}
        </div>
    </div>
);
