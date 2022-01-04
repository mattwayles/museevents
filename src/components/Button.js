import React from 'react';
import {Link} from "react-router-dom";

const Button = (props) => (
        <Link to={props.url} className="font-didot text-sm">
            <button className="
                p-3
                border-2
                border-peach
                border-solid
                hover:bg-peach
                hover:text-white
                transition
                duration-500
                ease-in-out"
            >
                {props.label}
            </button>
        </Link>
)

export default Button;
