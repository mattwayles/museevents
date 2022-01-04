import React from 'react';
import Button from "./Button";

const Footer = () => (
    <React.Fragment>
        <div className="w-full flex flex-row justify-center items-center">
            <BorderedFooterItem>
                <p className="font-didot">1350 Grant Street, #611</p>
                <p className="font-didot">Denver, Colorado</p>
            </BorderedFooterItem>
            <BorderedFooterItem>
                <p className="font-didot">Email:</p>
                <p className="font-didot"><a href="mailto:info@museevents.com">info@museevents.com</a></p>
            </BorderedFooterItem>
            <BorderedFooterItem>
                <p className="font-didot">© 2022 Muse Events</p>
            </BorderedFooterItem>
            <FooterItem>
                <Button label="Book a Consultation" url="/contact" />
            </FooterItem>
        </div>
        <p className="text-center my-8 font-didot text-sm">Select images courtesy of <a className="underline" href="https://jlaplante.com/">J. La Plante Photography</a></p>
    </React.Fragment>
    )

export default Footer;

const BorderedFooterItem = (props) => (
    <div className="flex flex-col justify-center items-start border-r-2 border-peach border-solid min-h-50 px-8">
        {props.children}
    </div>
)

const FooterItem = (props) => (
    <div className="flex flex-col justify-center items-start min-h-50 px-8">
        {props.children}
    </div>
)
