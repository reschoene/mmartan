package reschoene.mmartan.model;

import java.util.LinkedList;
import java.util.List;

/** 
 * Represents a catalog of products. 
 * This class is used as a response for getProductCatalog request.
 * */
public class ProductCatalog {
    private List<Product> products = new LinkedList<Product>();
    private int totalProducts = 0;
    
    public List<Product> getProducts() {
        return products;
    }
    public void setProducts(List<Product> products) {
        this.products = products;
    }
    public int getTotalProducts() {
        return totalProducts;
    }
    public void setTotalProducts(int totalProducts) {
        this.totalProducts = totalProducts;
    }
}
