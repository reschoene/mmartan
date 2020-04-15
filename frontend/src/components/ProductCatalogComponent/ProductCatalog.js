import React, {Component} from 'react';
import './ProductCatalog.scss';
import { connect } from 'react-redux';
import Loading from '../LoadingComponent/Loading';
import Error from '../ErrorComponent/Error';
import PaginationBar from '../PaginationBarComponent/PaginationBar';
import Subtittle from '../SubtittleComponent/Subtittle';
import ProductCatalogItem from './ProductCatalogItem';

const mapStateToProps = state => {
    return {
        products: state.products,
        isLoading: state.isLoading,
        errMsg: state.errMsg,
        totalProducts: state.totalProducts,
        searchFilter: state.searchFilter
    }   
}

/**
 * Component responsible for rendering the product catalog.
 * Its composed by three parts:
 * 1) A caption displaying the total of found products
 * 2) A series of rows showing data of each product
 * 3) A pagination bar
 */
class ProductCatalog extends Component{
    render(){
        /** The products are loaded from a external API. So, when fetching products there are three possible states:
         * 1) Loading: there's still no response from the server, which is loading the products
         * 2) errMsg: for some reason the request ended with errors. In this case, shows a message indicating this state. 
        *             Detailed error information will be displayed in the browser console.
         * 3) Loading false and no error message: this state indicates the request was successfully completed.
         */
        if (this.props.isLoading){
            return (
                <Loading description="Carregando produtos ..."/>
            );
        }
        else if (this.props.errMsg){
            return (
                <Error message="Não foi possível carregar os produtos. Serviço indisponível, tente novamente mais tarde."/>
            );
        }
        else{
            let foundProducts = '';
            if (this.props.searchFilter)
                foundProducts = `${this.props.totalProducts} PRODUTOS ENCONTRADOS`;

            //Populates an array mapping each found product as a ProductCatalogItem component
            const items = this.props.products.map((product) =>
                <ProductCatalogItem key={product.id} product={product} />
            );

            //renders the product catalog
            return (
                <>
                    <Subtittle value={foundProducts}/>                
                    <div className="catalogItems">{items}</div>
                    <PaginationBar />
                </>
            )
        }
    }        
}

export default connect(mapStateToProps, null)(ProductCatalog);