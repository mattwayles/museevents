import Button from "./Button";
import React from "react";

const CardContainer = (props) => (
    <div className="w-3/4 flex flex-row justify-center items-center flex-wrap">
        {props.content.map(link => <Card link={link} />)}
    </div>
)

const Card = (props) => {
    const { link } = props;
    return <div className="w-1/4 h-[28rem] bg-sand m-4">
        <img className="p-6 rounded-full" src={link.img} alt="Muse Events" />
        <div className="flex flex-col justify-center items-center">
            <Button label={link.label} url={link.url} />
            <p className="p-4 text-xs text-center font-didot">{link.description}</p>
        </div>
    </div>
}

export default CardContainer;
