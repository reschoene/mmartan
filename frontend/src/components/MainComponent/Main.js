import React, {Component} from 'react';
import TopBar from '../TopBarComponent/TopBar';
import Tittle from '../TittleComponent/Tittle';
import ProductCatalog from '../ProductCatalogComponent/ProductCatalog';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/ActionCreators';
import Pagination from '../PaginationComponent/Pagination';

const mapStateToProps = state => {
  return {
    products: state.products,
  }   
}

const mapDispatchToProps = dispatch => ({
    fetchProducts: () => dispatch(fetchProducts()),
})

class Main extends Component{
  componentDidMount(){
    this.props.fetchProducts();
  }

  render(){
    return(
      <>
        <TopBar />
        <Tittle value="teste"/>
        <ProductCatalog products={this.props.products}/>
        <Pagination />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
