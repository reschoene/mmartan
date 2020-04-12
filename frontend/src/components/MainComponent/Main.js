import React, {Component} from 'react';
import TopBar from '../TopBarComponent/TopBar';
import Tittle from '../TittleComponent/Tittle';
import ProductCatalog from '../ProductCatalogComponent/ProductCatalog';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/ActionCreators';
import PaginationBar from '../PaginationBarComponent/PaginationBar';
import Subtittle from '../SubtittleComponent/Subtittle';

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
    let foundProducts = `${this.props.products.length} PRODUTOS ENCONTRADOS`;
    let currentSearch = (this.props.searchFilter? this.props.searchFilter: "Lista de produtos");

    return(
      <>
        <TopBar />
        <Tittle value={currentSearch}/>
        <Subtittle value={foundProducts}/>
        <ProductCatalog products={this.props.products}/>
        <PaginationBar />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
