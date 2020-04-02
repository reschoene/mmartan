import React, {Component} from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import ProductCatalog from './ProductCatalogComponent';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/ActionCreators';

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
      <div>
        <Header />
        <ProductCatalog />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
