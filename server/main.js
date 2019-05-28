import { Meteor } from 'meteor/meteor';
import {WebApp} from 'meteor/webapp';

import '../imports/api/users';
import {Links} from '../imports/api/link';
import '../imports/startup/simple-schema-config';


Meteor.startup(() => {

    WebApp.connectHandlers.use((req, res, next)=>{
        const _id = req.url.slice(1);
        const link = Links.findOne({_id});

        if(link){
            Meteor.call('links.trackVisit',_id);
            res.statusCode = 302;
            res.setHeader('Location', link.url);
            res.end();

        } else{
            next();
        }

    });
});
