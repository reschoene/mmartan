import React, {Component} from 'react';
import TopBar from '../TopBarComponent/TopBar';
import Tittle from '../TittleComponent/Tittle';
import ProductCatalog from '../ProductCatalogComponent/ProductCatalog';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/ActionCreators';

/** makes avaliable to the connected component parts of the redux store */
const mapStateToProps = state => {
  return {
    products: state.products,
    pageSize: state.pageSize,
    pageNumber: state.pageNumber,
    searchFilter: state.searchFilter
  }   
}

/** makes avaliable to the connected component some dispatch functions */
const mapDispatchToProps = dispatch => ({
    fetchProducts: (pageNumber, pageSize, prodDescr) => dispatch(fetchProducts(pageNumber, pageSize, prodDescr)),
})


/**
 * The Main application's component
 */
class Main extends Component{
  componentDidMount(){
    //Start loading the first page products
    this.props.fetchProducts(this.props.pageNumber, this.props.pageSize, this.props.searchFilter);
  }

  render(){
    //Tittle displays the search term with a default value
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

/** The connect() function connects a React component to a Redux store.
 *  It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store
 *  @returns The return of connect() is a wrapper function that takes your component and returns a wrapper component with the additional props it injects
*/
export default connect(mapStateToProps, mapDispatchToProps)(Main);
