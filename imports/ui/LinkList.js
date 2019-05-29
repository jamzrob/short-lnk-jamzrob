import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from "meteor/tracker";
import {Session} from 'meteor/session';
import  FlipMove from 'react-flip-move';
import {Links} from "../api/link";
import LinkListItem from './LinkListItem';


export default class LinkList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            links: []
        }
    }
    //just after component is shown to the screen
    componentDidMount() {
        this.linksTracker = Tracker.autorun(()=> {
            Meteor.subscribe('links');
            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({links});
        });
    }

    //right before component goes away
    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderLinksListItems() {
        if(this.state.links.length === 0){
           return ( <div className="item">
                        <p className="item__status-message">No Links Found</p>
                    </div>);
        } else {
            return this.state.links.map((link) => {
                const shortUrl = Meteor.absoluteUrl(link._id);
                return <LinkListItem key={link._id} shortUrl={shortUrl} {...link}/>;
            });
        }
    }

    render() {
        return (
            <div>
                <FlipMove maintaincontainerheights="true">
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
};