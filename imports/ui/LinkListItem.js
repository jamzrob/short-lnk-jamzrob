import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

// need to add piece of state
// create a boolean state called copied, default to false
// On success switch justCopied to true, then wait a second, and
// switch to false
// dynamically render the button text
export default class LinkListItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            copied: false
        }
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on('success',() => {
            this.setState({copied:true});
            setTimeout(()=> this.setState({copied:false}),1000);
        }).on('error',()=>{
            alert('Unable to copy please manually copy');
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
        let visitedMessage = null;
        if(typeof this.props.lastVisitedAt === 'number'){
            visitedMessage = `(visited ${moment(this.props.lastVisitedAt).fromNow()})`;
        }
        return (
                 <p className="item__message">
                     {this.props.visitedCount} {visitMessage} {visitedMessage}
                </p>
        );
    }


    render() {
        return (<div className="item">
                    <h2>{this.props.url}</h2>
                    <p className="item__message">{this.props.shortUrl}</p>
                    {this.renderStats()}
                    <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">
                        Visit
                    </a>
                    <button className="button button--pill" ref="copy" data-clipboard-text={this.props.shortUrl}>
                        {this.state.copied ? 'Copied': 'Copy' }
                    </button>
                    <button className="button button--pill" onClick={()=>{
                        Meteor.call('links.setVis',this.props._id, !this.props.visible);
                    }}>
                        {this.props.visible? 'Hide':'Unhide'}
                    </button>
            </div>
        );
    }
};

LinkListItem.propTypes = {
    _id: PropTypes.string,
    url: PropTypes.string,
    userId: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};



