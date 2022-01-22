import React from 'react';
import UnderConstructionImg from '../assets/img/under_construction.jpg';

const UnderConstruction = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <img className="rounded-xl" src={UnderConstructionImg} alt="Under Construction" />
            <p className="font-didot text-2xl text-peach mt-4">We're currently planning something beautiful for this page</p>
            <p className="font-proxima text-md text-peach mt-4">Please check back later</p>
        </div>
    )
}

export default UnderConstruction;
