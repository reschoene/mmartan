import React, {Component} from 'react';
import TopBar from '../TopBarComponent/TopBar';
import Tittle from '../TittleComponent/Tittle';
import ProductCatalog from '../ProductCatalogComponent/ProductCatalog';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    products: state.products,
    pageSize: state.pageSize,
    pageNumber: state.pageNumber,
    searchFilter: state.searchFilter
  }   
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: (pageNumber, pageSize, prodDescr) => dispatch(fetchProducts(pageNumber, pageSize, prodDescr)),
})

class Main extends Component{
  componentDidMount(){
    this.props.fetchProducts(this.props.pageNumber, this.props.pageSize, this.props.searchFilter);
  }

  render(){    
    let currentSearch = (this.props.searchFilter? this.props.searchFilter: "Lista de produtos");

    return(
      <>
        <TopBar />
        <Tittle value={currentSearch}/>        
        <ProductCatalog />        
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
