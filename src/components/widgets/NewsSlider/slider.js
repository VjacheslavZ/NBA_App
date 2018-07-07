import React, {Component} from 'react';
import SliderTempaltes from './slider_templates';
import axios from 'axios'
import { URL } from '../../../config';

class NewsSlider extends Component {

    state = {
        news: [],
    };
    //before render
    componentWillMount(){
        axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
            .then(response => {
                this.setState({
                    news: response.data
                })
            })
    }

    render(){
        return(
            <SliderTempaltes data={this.state.news} type={this.props.type} settings={this.props.settings}/>
        )
    }
}

export default NewsSlider;