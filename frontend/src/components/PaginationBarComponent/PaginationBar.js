import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import './PaginationBar.scss';
import "bootstrap/dist/css/bootstrap.min.css";

class PaginationBar extends Component{
    constructor(props) {
        super(props);
        this.state = {pageNumber : 1};
    }

    handlePageClick(pageNumber){
        this.setState({pageNumber});
    }

    render(){
        return (
            <div className="pagination-bar">
                <Pagination
                    firstPageText={<i className='fa fa-step-backward' />}
                    nextPageText ={<i className='fa fa-chevron-right' />}
                    prevPageText ={<i className='fa fa-chevron-left' />}
                    lastPageText ={<i className='fa fa-step-forward' />}
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.pageNumber}
                    onChange={(pageNumber) => this.handlePageClick(pageNumber)}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                />
            </div>
        )
    }        
}

export default PaginationBar;