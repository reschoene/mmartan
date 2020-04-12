import React, {Component} from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Search from '../SearchComponent/Search';
import { connect } from 'react-redux';
import { fetchProducts, setSearchFilter, setPageNumber} from '../../redux/ActionCreators';
import './TopBar.scss'

const mapStateToProps = state => {
    return {
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchFilter: state.searchFilter
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProducts:   (pageNumber, pageSize, prodDescr) => dispatch(fetchProducts(pageNumber, pageSize, prodDescr)),
    setSearchFilter: (searchFilter)                    => dispatch(setSearchFilter(searchFilter)),
    setPageNumber:   (pageNumber)                      => dispatch(setPageNumber(pageNumber)),
});

class TopBar extends Component{
    doSearch(searchFilter){
        this.props.setSearchFilter(searchFilter);
        this.props.setPageNumber(1); //ao mudar o termo da busca, volta a pagina 1
        this.props.fetchProducts(1, this.props.pageSize, searchFilter);
    }

    render(){
        return (
            <Navbar color="white" fixed="top">
                <div className="row align-items-center">
                    <div className="col-8">
                        <NavbarBrand>
                            <img src="./images/logo.png" alt="Logo"/>
                        </NavbarBrand>
                    </div>
                    <div className="col-4">
                        <Search onSearch={(value) => this.doSearch(value)}/>
                    </div>                    
                </div>
            </Navbar>
        )
    }        
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);