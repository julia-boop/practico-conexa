import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }
    apiCall(url, c) {
        axios.get(url)
            .then(response => {c(response.data)})
            .catch(e => console.log(e))
    }

    componentDidMount() {
        this.apiCall("http://localhost:3002/fetchPosts", this.posts);
    }

    posts = (data) => {
        this.setState({
            posts: data  
        })
    }
    

    render(){
    return (

        <div className="main-container d-flex justify-content-center flex-wrap">
            <div className="return-button-container d-flex justify-content-center">
                <button className="main-button return-button"><Link to="/" exact="true">Home</Link></button>
            </div>

            {this.state.posts.map((post, i) => {
                return <div className="post-card" key={i}> 
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </div>
            })}
            
        </div>
    )
    }
}

export default Post