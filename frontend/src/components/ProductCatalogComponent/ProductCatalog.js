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
        totalProducts: state.totalProducts
    }   
}

class ProductCatalog extends Component{
    render(){
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
            let foundedProducts = `${this.props.totalProducts} PRODUTOS ENCONTRADOS`;

            const items = this.props.products.map((product) =>
                <ProductCatalogItem key={product.id} product={product} />
            );

            return (
                <>
                    <Subtittle value={foundedProducts}/>                
                    <div className="catalogItems">{items}</div>
                    <PaginationBar />
                </>
            )
        }
    }        
}

export default connect(mapStateToProps, null)(ProductCatalog);