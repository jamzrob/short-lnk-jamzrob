import React from "react";
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkList from "./LinkList";
import LinksListFilters from './LinksListFilters';
export default () =>{

        return (
            <div>
                <PrivateHeader title="Short Lnk"/>
                <div className="page-content">
                    <LinksListFilters/>
                    <AddLink/>
                    <LinkList/>
                </div>
            </div>
        );
}