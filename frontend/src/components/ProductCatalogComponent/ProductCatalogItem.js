import React from 'react';
import './ProductCatalog.scss';
import formatCurreny from '../../shared/format';

function ProductCatalogItem({product}){
    const photos = product.photos.map((photo, idx) =>
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
                        <div className="ml-5 row prod-title">{product.name}</div>
                        <div className="ml-5 row prod-subtitle">{product.line.name} - {product.size.name}</div>
                    </div>
                </div>
                <div className="col-3 prod-price">
                    <span className="prod-reg-price">{formatCurreny(product.regularPrice)}</span>
                    <span className="prod-price-sep">&nbsp; por &nbsp;</span>
                    <span className="prod-sale-price">{formatCurreny(product.salePrice)}</span>
                </div>            
            </div>
        </div>
    );    
}

export default ProductCatalogItem;