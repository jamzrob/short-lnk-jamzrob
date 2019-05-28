import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {Session} from 'meteor/session';
import {routes, onAuthChange} from '../imports/routes/routes'
import '../imports/startup/simple-schema-config';

Tracker.autorun(()=> {
    const isAuth = !!Meteor.userId();
    onAuthChange(isAuth);
});


Meteor.startup(()=>{
    Session.set('showVisible',true);
    ReactDOM.render(routes, document.getElementById('app'));
});