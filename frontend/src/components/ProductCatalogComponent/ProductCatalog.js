import React, {Component} from 'react';
import './ProductCatalog.scss';
import formatCurreny from '../../shared/format';

function ProductCatalogItem({productItem}){
    if (productItem === null) {
        return <div></div>;
    }

    const photos = productItem.photos.map((photo, idx) =>
        <div key={idx} className="col-12 col-md-6 col-lg-3">
            <img src={'./images/products/' + photo.path} alt={photo.name} height='85px' width='85px'/>
        </div>
    );

    return (
        <div className="container border">
            <div className="row mt-1 mb-1">
                <div className="col-4">
                    <div className="row">
                        {photos}
                    </div>                        
                </div>
                <div className="col-5 row align-items-center">
                    <div>
                        <div className="ml-5 row prod-title">{productItem.name}</div>
                        <div className="ml-5 row prod-subtitle">{productItem.line.name} - {productItem.size.name}</div>
                    </div>
                </div>
                <div className="col-3 prod-price">
                    <span className="prod-reg-price">{formatCurreny(productItem.regularPrice)}</span>
                    <span className="prod-price-sep">&nbsp; por &nbsp;</span>
                    <span className="prod-sale-price">{formatCurreny(productItem.salePrice)}</span>
                </div>            
            </div>
        </div>
    );    
}

class ProductCatalog extends Component{
    render(){
        if (!this.props.products){
            return (<div></div>);
        }else{
            const items = this.props.products.map((product) =>
                <ProductCatalogItem key={product.id} productItem={product} />
            );

            return (                    
                <div className="catalogItems">{items}</div>                                                                                                                                                                                                      
            )
        }
    }        
}

export default ProductCatalog;