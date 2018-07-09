import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../config';
import styles from './newsList.css'
import Button from '../../widgets/Buttons/buttons'
import CardInfo from '../../widgets/CardInfo/cardInfo'
import { firebaseTeams, firebaseArticles, firebaseLooper } from '../../../firebase';

class NewsList extends Component {
    state = {
        teams: [],
        items: [],
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

        firebaseArticles.orderByChild('id').startAt(start).endAt(end).once('value')
            .then((snapshot) => {
                const articles = firebaseLooper(snapshot);
                this.setState({
                    items: [...this.state.items, ...articles],
                    start,
                    end
                })
            })
            .catch(e => {
                console.log(e)
            })
    };

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    };

    renderNews = (type) => {
        let tempalte = null;

        switch(type) {
            case('card'):
                tempalte = this.state.items.map((item, i) => (
                    <CSSTransition
                        classNames={{
                            enter: styles.newslist_wrapper,
                            enterActive: styles.newslist_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                    >
                        <div >
                            <div className={styles.newslist_item}>
                                <Link to={`/articles/${item.id}`}>
                                    <CardInfo
                                        teams={this.state.teams}
                                        team={item.team}
                                        date={item.date}
                                    />
                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </div>
                    </CSSTransition>
                ));
                break;

            case('cardMain'):
                tempalte = tempalte = this.state.items.map((item, i) => (
                    <CSSTransition
                        classNames={{
                            enter: styles.newslist_wrapper,
                            enterActive: styles.newslist_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                    >
                        <Link to={`/articles/${item.id}`}>
                            <div className={styles.flex_wrapper}>
                                <div className={styles.left}
                                    style={{
                                        background: `url('/images/articles/${item.image}')`
                                    }}>
                                    <div>

                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <CardInfo
                                        teams={this.state.teams}
                                        team={item.team}
                                        date={item.date}
                                    />
                                    <h2>{item.title}</h2>
                                </div>
                            </div>
                        </Link>

                    </CSSTransition>
                ));
                break;
            default:
                tempalte = null;
        }

        return tempalte;
    };

    render(){
        return(
            <div>
                <TransitionGroup component='div' className='list'>
                    {this.renderNews(this.props.type)}
                </TransitionGroup>

                <Button
                    type='loadMore'
                    loadMore={()=>this.loadMore()}
                    cta='Load More News'
                />
            </div>
        )
    }
}

export default NewsList