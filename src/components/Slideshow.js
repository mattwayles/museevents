import React, {useEffect, useRef, useState} from "react";
import slideshowImg1 from '../assets/img/homepage/slideshow/slideshow1.jpg';
import slideshowImg2 from '../assets/img/homepage/slideshow/slideshow2.jpg';
import slideshowImg3 from '../assets/img/homepage/slideshow/slideshow3.jpg';
import slideshowImg4 from '../assets/img/homepage/slideshow/slideshow4.jpg';
import slideshowImg5 from '../assets/img/homepage/slideshow/slideshow5.jpg';
import slideshowImg6 from '../assets/img/homepage/slideshow/slideshow6.jpg';
import slideshowImg7 from '../assets/img/homepage/slideshow/slideshow7.jpg';
import slideshowImg8 from '../assets/img/homepage/slideshow/slideshow8.jpg';
import slideshowImg9 from '../assets/img/homepage/slideshow/slideshow9.jpg';
import slideshowImg10 from '../assets/img/homepage/slideshow/slideshow10.jpg';
import slideshowImg11 from '../assets/img/homepage/slideshow/slideshow11.jpg';
import slideshowImg12 from '../assets/img/homepage/slideshow/slideshow12.jpg';
import slideshowImg13 from '../assets/img/homepage/slideshow/slideshow13.jpg';
import slideshowImg14 from '../assets/img/homepage/slideshow/slideshow14.jpg';
import slideshowImg15 from '../assets/img/homepage/slideshow/slideshow15.jpg';

const images = [slideshowImg1, slideshowImg2, slideshowImg3, slideshowImg4, slideshowImg5, slideshowImg6, slideshowImg7,
    slideshowImg8, slideshowImg9, slideshowImg10, slideshowImg11, slideshowImg12, slideshowImg13, slideshowImg14, slideshowImg15];
const delay = 3000;

const Slideshow = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (
        <div className="overflow-hidden mx-auto mb-32">
            <div
                className="whitespace-nowrap transition ease-in duration-500"
                style={{ transform: `translateX(${-index * 100}%)` }}
            >
                {images.map((image, index) => (
                    <img src={image}
                        className="inline-block w-screen h-navScreen"
                        key={index}
                         alt="Muse Events"
                    />
                ))}
            </div>

            <div className="text-center">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={"inline-block h-3 w-3 rounded-xl cursor-pointer mx-2 " + (index === idx ? "bg-peach" : "bg-slate-200")}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slideshow;
