import React from "react";
import {Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
    return (
        <div className="header">
            <div className="header__content">
                <div className="header__title ">
                    <h1>{props.title}</h1>
                    <i>By James Raubenheimer</i>
                </div>
                <button className="button button--link-text" onClick={()=>Accounts.logout()}>Logout</button>
            </div>
        </div>


    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default PrivateHeader;