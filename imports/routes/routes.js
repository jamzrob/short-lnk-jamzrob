import {Meteor} from 'meteor/meteor';
import React from 'react';
import SignUp from '../ui/SignUp';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound'
import Login from '../ui/Login';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import history from '../api/history'


const unauthPages = ['/','/signup'];
const authPages = ['/links'];

const NotFoundRedirect = ()=>{
    <div>Test</div>
};

const onEnterPublicPage = () => {
    if(Meteor.userId()){
        history.replace('/links');
    }
};

const onEnterPrivatePage = () => {
    if(!Meteor.userId()){
        history.replace('/');
    }
};

export const routes = (
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login} onEnter={onEnterPublicPage()}/>
            <Route path="/signUp" component={SignUp} onEnter={onEnterPublicPage()}/>
            <Route path="/links" component={Link} onEnter={onEnterPrivatePage()}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);

export const onAuthChange = (isAuth) => {
    const pathname = history.location.pathname;
    const isUnauthPage = unauthPages.includes(pathname);
    const isAuthPage = authPages.includes(pathname);

    //if on an unauth page and user logged in, redirect to /links
    if(isUnauthPage && isAuth){
        history.replace('/links');
    }
    //if on auth page and not logged in, redirect to /
    if(isAuthPage && !isAuth){
        history.replace('/');
    }
};
