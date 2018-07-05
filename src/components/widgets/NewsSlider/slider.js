import React, {Component} from 'react';
import SliderTempaltes from './slider_templates';
import axios from 'axios'

class NewsSlider extends Component {

    state = {
        news: [],
    };
    //before render
    componentWillMount(){
        axios.get(`http://localhost:3004/articles?_start=0&_end=3`)
            .then(response => {
                this.setState({
                    news: response.data
                })
            })
    }

    render(){
        return(
            <SliderTempaltes data={this.state.news} type='featured'/>
        )
    }
}

export default NewsSlider;