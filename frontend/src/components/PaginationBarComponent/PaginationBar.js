import React, {Component} from 'react';
import Pagination from "react-js-pagination";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { fetchProducts, setPageNumber,setPageSize } from '../../redux/ActionCreators';
import './PaginationBar.scss';

const mapStateToProps = state => {
    return {
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchFilter: state.searchFilter
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: (pageNumber, pageSize, prodDescr) => dispatch(fetchProducts(pageNumber, pageSize, prodDescr)),
    setPageNumber: (pageNumber)                      => dispatch(setPageNumber(pageNumber)),
    setPageSize:   (pageSize)                        => dispatch(setPageSize(pageSize)),
});

class PaginationBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageSizeDropOpened: false
        };
    }

    pageNumberChange(pageNumber){
        this.props.setPageNumber(pageNumber);
        this.props.fetchProducts(pageNumber, this.props.pageSize, this.props.searchFilter);
    }

    pageSizeChange(pageSize){
        this.props.setPageSize(pageSize);
        this.props.setPageNumber(1);
        this.props.fetchProducts(1, pageSize, this.props.searchFilter);
    }

    togglePageSizeDropDown(){
        this.setState({pageSizeDropOpened: !this.state.pageSizeDropOpened});
    }

    render(){
        const pageSizeItems = [16, 32, 64, 128, 256, 512].map((pageSize, idx) =>
            <DropdownItem key={idx} value={pageSize} onClick={(e) => this.pageSizeChange(parseInt(e.target.value))} className="dropdown-page-size-items">
                {`${pageSize} produtos por página`}
            </DropdownItem>
        );

        return (
            <div className="pagination-bar d-flex justify-content-between">
                <Dropdown isOpen={this.state.pageSizeDropOpened} toggle={() => this.togglePageSizeDropDown()}>
                    <DropdownToggle className="dropdown-page-size" color="white">
                        {`${this.props.pageSize} produtos por página`}
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
                    activePage={this.props.pageNumber}
                    onChange={(pageNumber) => this.pageNumberChange(pageNumber)}
                    itemsCountPerPage={this.props.pageSize}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                />
            </div>
        )
    }        
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBar);