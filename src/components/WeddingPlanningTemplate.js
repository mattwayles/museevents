import React from 'react';
import Lightbox from "./Lightbox";

const WeddingPlanningTemplate = (props) => {
    const { title, description, lightbox, bulletPoints, onYourDay } = props;

    return (
        <div className="flex flex-col justify-start items-center">
            <p className="text-5xl font-didot p-8">{title}</p>
            <div className="w-4/5 bg-sand text-center mb-8 whitespace-pre-line">
                <div className="whitespace-pre-line p-4 font-didot">{description}</div>
            </div>
            {lightbox && <Lightbox data={lightbox} />}
            {(title.indexOf("Full") > -1 || title.indexOf("Partial") > -1) && <div className="w-4/5 bg-sand text-center my-4 whitespace-pre-line">
                <div className="whitespace-pre-line p-4 font-didot">Your Planner Can help you with the following Wedding
                    Planning Services based on what you need and want. The list is endless. If you do not see something
                    here that you need help with, just let us know!</div>
            </div>}
            {bulletPoints && <BulletPoints data={bulletPoints} onYourDay={onYourDay} />}
        </div>
    )
}

export default WeddingPlanningTemplate;

const BulletPoints = (props) => (
    <div className="flex flex-row flex-wrap justify-center items-start mt-4">
        <BulletPointColumn data={props.data.slice(0, props.data.length / 2)} />
        <BulletPointColumn data={props.data.slice(props.data.length / 2, props.data.length)} onYourDay={props.onYourDay} />
    </div>
)

const BulletPointColumn = (props) => (
    <div className="flex flex-col flex-wrap justify-start items-start ml-12 max-w-xl">
        {props.onYourDay && <p className="text-sm font-didot my-2 font-bold">On Your Big Day...</p>}
        {props.data.map(point => <p className="text-sm font-didot my-2">♥&nbsp;&nbsp;{point}</p>)}
    </div>
)
