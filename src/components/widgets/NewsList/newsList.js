import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../config';
import styles from './newsList.css'
import Button from '../../widgets/Buttons/buttons'

class NewsList extends Component {
    state = {
        items: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    };

    componentWillMount(){
        this.request(this.state.start, this.state.end)
    }

    request = (start, end) => {
        axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
            .then(response => {
                this.setState({
                    items: [...this.state.items, ...response.data]
                })
            })
    };

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end, end);
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

                                    <h2>{item.title}</h2>
                                </Link>
                            </div>
                        </div>
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
                    type='loadmore'
                    loadMore={()=>this.loadMore()}
                    cta='Load More News'
                />
            </div>
        )
    }
}

export default NewsList