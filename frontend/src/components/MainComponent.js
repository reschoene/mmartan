import React, {Component} from 'react';
import TopBar from './TopBarComponent';
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
        <TopBar />
        <ProductCatalog />
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
