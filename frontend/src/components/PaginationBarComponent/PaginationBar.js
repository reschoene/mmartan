import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './PaginationBar.scss';

class PaginationBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 16,
            pageSizeDropOpened: false
        };
    }

    handlePageClick(pageNumber){
        this.setState({...this.state, pageNumber});
    }

    pageSizeChange(pageSize){
        //Change pageSize and set pageSizeDrodDown as closed
        this.setState({...this.state, pageSize, pageSizeDropOpened: false});
    }

    openPageSizeDropDown(){
        if (!this.state.pageSizeDropOpened)
            this.setState({...this.state, pageSizeDropOpened: true});
    }

    render(){
        const pageSizeItems = [16, 32, 64, 128, 256, 512].map((pageSize, idx) =>
            <DropdownItem key={idx} value={pageSize} onClick={(e) => this.pageSizeChange(parseInt(e.target.value))} className="dropdown-page-size-items">
                {`${pageSize} produtos por página`}
            </DropdownItem>
        );

        return (
            <div className="pagination-bar d-flex justify-content-between">
                <Dropdown isOpen={this.state.pageSizeDropOpened} toggle={() => this.openPageSizeDropDown()}>
                    <DropdownToggle className="dropdown-page-size" color="white">
                        {`${this.state.pageSize} produtos por página`}
                        <i className="ml-3 fa fa-chevron-down" aria-hidden="true"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        {pageSizeItems}
                    </DropdownMenu>
                </Dropdown>
                
                <Pagination
                    firstPageText={<i className='fa fa-step-backward' />}
                    nextPageText ={<i className='fa fa-chevron-right' />}
                    prevPageText ={<i className='fa fa-chevron-left' />}
                    lastPageText ={<i className='fa fa-step-forward' />}
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.state.pageNumber}
                    onChange={(pageNumber) => this.handlePageClick(pageNumber)}
                    itemsCountPerPage={this.state.pageSize}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                />
            </div>
        )
    }        
}

export default PaginationBar;