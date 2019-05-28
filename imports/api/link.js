import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
export const Links = new Mongo.Collection('links');
import shortid from 'shortid';

if(Meteor.isServer){
    Meteor.publish('links',function (){
        return Links.find({userId:this.userId});
    });
}

Meteor.methods({
    'links.insert'(url){
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }

        //validates url
            new SimpleSchema({
                url: {
                    type: String,
                    label: 'Your link',
                    regEx: SimpleSchema.RegEx.Url
                }
            }).validate({url});

        // inserts url
        Links.insert({
            _id: shortid.generate(),
            url,
            userId: this.userId,
            visible: true,
            visitedCount:0,
            lastVisitedAt:null
        });
    },
    'links.setVis'(_id, visible){
        //check if user is logged in and throw an error if not
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
        }

        //validates id
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible:{
                type: Boolean
            }
        }).validate({_id, visible});

        Links.update({
            _id,
            userId: this.userId
        },{
            $set: {visible}
        });
    },
    'links.trackVisit'(_id){
        //validates id
        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id});

        Links.update({
            _id
        }, {
            $set: {
                lastVisitedAt: new Date().getTime()
            },
            $inc: {
                visitedCount: 1
            }
        })
    }
});