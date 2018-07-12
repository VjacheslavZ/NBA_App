import React, {Component} from 'react';
import {firebase, firebaseArticles, firebaseLooper } from '../../../firebase';
import SliderTemplates from './slider_templates';

class NewsSlider extends Component {

    state = {
        news: [],
    };

    componentWillMount(){
        firebaseArticles.limitToFirst(99).once('value')
            .then((snapshot) => {
                const news = firebaseLooper(snapshot);

                const asyncFunction = (item, i, cb) => {
                    firebase.storage().ref('images')
                        .child(item.image).getDownloadURL()
                        .then(url => {
                            news[i].image = url;
                            cb();
                        })
                };

                let requests = news.map((item,i) => {
                    return new Promise((resolve) => {
                        asyncFunction(item, i, resolve)
                    })
                });

                Promise.all(requests).then(() => {
                    this.setState({
                        news
                    })
                })




            })
    }

    render(){
        return(
            <SliderTemplates
                data={this.state.news}
                type={this.props.type}
                settings={this.props.settings}
            />
        )
    }
}

export default NewsSlider;