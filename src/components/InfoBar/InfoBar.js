import React from 'react';

const InfoBar = ({ roomName }) => (
    <div className="contact-profile">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
        <p>{roomName}</p>
        <div className="social-media">
            <i className="fa fa-facebook" aria-hidden="true" />
            <i className="fa fa-twitter" aria-hidden="true" />
            <i className="fa fa-instagram" aria-hidden="true" />
        </div>
    </div>
)

export default InfoBar;