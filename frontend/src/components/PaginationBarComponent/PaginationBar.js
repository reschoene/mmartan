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
      searchFilter: state.searchFilter,
      totalProducts: state.totalProducts
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: (pageNumber, pageSize, prodDescr) => dispatch(fetchProducts(pageNumber, pageSize, prodDescr)),
    setPageNumber: (pageNumber)                      => dispatch(setPageNumber(pageNumber)),
    setPageSize:   (pageSize)                        => dispatch(setPageSize(pageSize)),
});

/**
 * A bar containing a pagination and a page size selector component
 */
class PaginationBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            pageSizeDropOpened: false
        };
    }

    /**
     * event handler triggered on changing the page number
     * @param {int} pageNumber selected page number
     */
    pageNumberChange(pageNumber){
        //updates page number on store and loads the products in this page
        this.props.setPageNumber(pageNumber);
        this.props.fetchProducts(pageNumber, this.props.pageSize, this.props.searchFilter);
    }

    /**
     * event handler triggered on changing the page size
     * @param {int} pageSize selected page size. Page size specifies the amount of products displayed in each page.
     */    
    pageSizeChange(pageSize){
        //updates store with the selected page size and set the first page as the current page
        this.props.setPageSize(pageSize);
        this.props.setPageNumber(1);

        //Loads the first page products using the selected page size
        this.props.fetchProducts(1, pageSize, this.props.searchFilter);
    }

    /** Used in Bootstrap Dropdown page size for controlling its collapsible state*/
    togglePageSizeDropDown(){
        this.setState({pageSizeDropOpened: !this.state.pageSizeDropOpened});
    }

    render(){
        //Fixed some page size values to be avaliable in the Dropdown
        //Populate pageSizeItems with an array of DropdownItem components
        const pageSizeItems = [16, 30, 50, 75, 100].map((pageSize, idx) =>
            <DropdownItem key={idx} value={pageSize} onClick={(e) => this.pageSizeChange(parseInt(e.target.value))} className="dropdown-page-size-items">
                {`${pageSize} produtos por página`}
            </DropdownItem>
        );

        return (
            <div className="pagination-bar d-flex justify-content-between">
                {/** Dropdown for selecting the page size */}
                <Dropdown isOpen={this.state.pageSizeDropOpened} toggle={() => this.togglePageSizeDropDown()}>
                    <DropdownToggle className="dropdown-page-size" color="white">
                        {`${this.props.pageSize} produtos por página`}
                        <i className="ml-3 fa fa-chevron-down" aria-hidden="true"></i>
                    </DropdownToggle>
                    <DropdownMenu>
                        {pageSizeItems}
                    </DropdownMenu>
                </Dropdown>
                
                { /** Pagination allows user to navigate between the founded products */}
                <Pagination
                    /** Assign icons from font-awesome e uses some bootstrap css classes for styling */
                    firstPageText={<i className='fa fa-step-backward' />}
                    nextPageText ={<i className='fa fa-chevron-right' />}
                    prevPageText ={<i className='fa fa-chevron-left' />}
                    lastPageText ={<i className='fa fa-step-forward' />}
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={this.props.pageNumber}
                    onChange={(pageNumber) => this.pageNumberChange(pageNumber)}
                    itemsCountPerPage={this.props.pageSize}
                    totalItemsCount={this.props.totalProducts}
                    pageRangeDisplayed={5}
                />
            </div>
        )
    }        
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBar);