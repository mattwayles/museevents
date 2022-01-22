import React, {useState} from 'react';

const Lightbox = (props) => {
    const { data } = props;
    const [display, setDisplay] = useState(false);
    const [currentItem, setCurrentItem] = useState('');

    const showImage = (item) => {
        setCurrentItem(item);
        setDisplay(true);
    }

    const hideLightbox = () => {
        setDisplay(false);
    }

    //show next image in lightbox
    const showNext = (e) => {
        e.stopPropagation();
        const currentIndex = getCurrentIndex();

        currentIndex >= data.length - 1 ?  setDisplay(false) :  setCurrentItem(data[currentIndex + 1]);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        const currentIndex = getCurrentIndex();
        currentIndex <= 0 ? setDisplay(false) : setCurrentItem(data[currentIndex - 1]);
    };

    const getCurrentIndex = () => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title === currentItem.title) {
                return i;
            }
        }
    }

    return (
        <React.Fragment>
            <Gallery data={data} showImage={showImage} />
            {display && <div
                onClick={hideLightbox}
                className="fixed z-1 top-[75px] left-0 w-full h-full bg-black/90 flex justify-between items-center px-4">
                <button className="text-white text-5xl" onClick={showPrev}>{"<"}</button>
                <div className="h-full flex flex-col justify-start items-center">
                    <img className="h-4/6 mt-8" src={currentItem.image} alt="Muse Events" />
                    <p className="text-2xl font-bold font-didot text-slate-200 mt-2">{currentItem.title}</p>
                    <p className="text-xl font-didot text-slate-300 mt-2">{currentItem.description}</p>
                </div>
                <button className="text-white text-5xl" onClick={showNext}>{">"}</button>
            </div>}
        </React.Fragment>
    )
}

export default Lightbox;

const Gallery = (props) => (
    <div className="flex flex-row justify-center items-center w-4/5 flex-wrap">
        {props.data.map(item =>
            <div className="w-1/4 min-h-[26vh] max-h-[26vh] m-2 overflow-hidden" >
                <img
                    onClick={() => props.showImage(item)}
                    className="object-cover cursor-pointer"
                    src={item.image}
                    alt="Muse Events" />
            </div>
        )}
    </div>
)
