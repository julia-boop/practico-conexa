import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            offset:0,
            photos: [],
            limit: 10, 
            currentPage:0
        }
    }
    apiCall(url) {
        axios.get(url)
            .then(res => {
                const data = res.data
                const slice = data.slice(this.state.offset, this.state.offset + this.state.limit)
                const photoData = slice.map((photo, i) => <React.Fragment>
                        <div className="photo-card" key={i}> 
                    <h3>{photo.title}</h3>
                    <img src={photo.thumbnailUrl}></img>
                </div>
                    </React.Fragment>
                )
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.limit),
                    photoData
                })
            })
            .catch(e => console.log(e))
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.limit;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.apiCall("http://localhost:3002/fetchPhotos")
        });

    };

    componentDidMount(){
        this.apiCall("http://localhost:3002/fetchPhotos")
    }

    render(){
    return (

        <div className="main-container d-flex justify-content-center flex-wrap">
            <div className="return-button-container d-flex justify-content-center">
                <button className="main-button return-button"><Link to="/" exact="true">Volver al Inicio</Link></button>
            </div>

            {this.state.photoData}
            <div className="pagination-container">
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
        </div>
    )
    }
}

export default Post