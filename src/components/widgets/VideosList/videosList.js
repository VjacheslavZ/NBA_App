import React, { Component } from 'react';
import styles from './videosList.css';
import {firebaseTeams, firebaseVideos, firebaseLooper} from '../../../firebase';
import Button from '../Buttons/buttons'
import VideosListTemplate from './videosListTempalte';

class VideosList extends Component{
    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    };

    componentWillMount(){
        this.request(this.state.start, this.state.end)
    }

    request = (start, end) => {
        if(this.state.teams.length < 1) {
            firebaseTeams.once('value')
                .then((snapshot) => {
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    })
                })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
            .then((snapshot) => {
                const videos = firebaseLooper(snapshot);
                this.setState({
                    videos: [...this.state.videos, ...videos],
                    start,
                    end
                })
            })
            .catch(e => {
                console.log(e)
            })
    };

    renderVideos = () => {
        let tempalte = null;

        switch (this.props.type) {
            case('card'):
                tempalte = <VideosListTemplate
                    data={this.state.videos}
                    teams={this.state.teams}
                />


                break;
            default:
                tempalte = null;
        }

        return tempalte
    };

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end)
    };

    renderButton = () => {
        return this.props.loadMore ?
            <Button
                type='loadMore'
                loadMore={()=> this.loadMore()}
                cta='Load more videos'
            />
            :
            <Button type='linkTo' cta='More videos' linkTo='/videos/'/>
    };

    rendertitle = () => {
        return this.props.title ?
            <h3>
                <strong>NBA</strong>
                Videos
            </h3>
            : null;
    };

    render(){
        return(
            <div className={styles.videoList_wrapper}>
                {this.rendertitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}

export default VideosList;


