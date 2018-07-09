import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/home';
import NewsMain from './components/Article/News/Main/index';
import Layout from './hoc/Layout/layout';
import NewsArticles from './components/Article/News/Post/index';
import VideoArticle from './components/Article/Videos/Video/index';
import VideosMain from './components/Article/Videos/Main/index';
import SignIn from './components/signin/signin';

class Routes extends Component {
    render(){
        return(
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/news" exact component={NewsMain}/>
                    <Route path="/articles/:id" exact component={NewsArticles}/>
                    <Route path="/videos/:id" exact component={VideoArticle}/>
                    <Route path="/videos" exact component={VideosMain}/>
                    <Route path="/sign-in" exact component={SignIn}/>
                </Switch>
            </Layout>
        )
    }
}

export default Routes;