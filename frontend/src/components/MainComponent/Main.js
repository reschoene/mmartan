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
        <Tittle value="Lençol avulso"/>
        <Subtittle value="200 PRODUTOS ENCONTRADOS"/>        
        <ProductCatalog products={this.props.products}/>
        <PaginationBar />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
