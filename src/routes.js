import React from 'react';
import { Switch } from 'react-router-dom';

import Home from './components/Home/home';
import NewsMain from './components/Article/News/Main/index';
import Layout from './hoc/Layout/layout';
import NewsArticles from './components/Article/News/Post/index';
import VideoArticle from './components/Article/Videos/Video/index';
import VideosMain from './components/Article/Videos/Main/index';
import SignIn from './components/signin/signin';
import Dashboard from './components/Dashboard/dashboard';

import PrivateRoutes from './components/AuthRoutes/priveteRoutes';
import PublicRoutes from './components/AuthRoutes/publicRoutes';

const Routes = (props) =>{
    return(
        <Layout user={props.user}>
            <Switch>
                <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
                <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain}/>
                <PublicRoutes {...props} restricted={false} path="/articles/:id" exact component={NewsArticles}/>
                <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideoArticle}/>
                <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain}/>
                <PublicRoutes {...props} restricted={true} path="/sign-in" exact component={SignIn}/>
                <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
            </Switch>
        </Layout>
    )
};

export default Routes;