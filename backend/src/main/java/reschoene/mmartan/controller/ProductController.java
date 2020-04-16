package reschoene.mmartan.controller;

import java.sql.SQLException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reschoene.mmartan.dao.ProductDao;
import reschoene.mmartan.model.ProductCatalog;

/** 
 * Controller class for managing product catalog requests
 **/
@RestController
public class ProductController extends BaseController{
    
    /*
     * Defines a GET API end-point for getProductCatalog URL
     * @param pageNumber page number for searching products. Targeting performance, this filter will be applied 
     *                   in a database level, so only the records from this page will be returned.
     * @param pageSize total of products to be returned in a page
     * @param prodDescription. Its an optional parameter. When present, it acts as 
     *                         a filter term in the product search.                   
     * */    
    @GetMapping("/getProductCatalog")
    @CrossOrigin(FRONT_END_URL)
    public ProductCatalog getProductCatalog(@RequestParam int pageNumber,
                                           @RequestParam int pageSize, 
                                           @RequestParam(required = false) String prodDescription) throws ClassNotFoundException, SQLException {
        
      //Protection for the received parameters
      if (prodDescription == null)
          prodDescription = "";
      
      if (pageNumber <= 0)
          pageNumber = 1;
      
      if (pageSize < 0)
          pageSize = 0;
      
      return new ProductDao().getProductCatalog(pageNumber, pageSize, prodDescription);
    }
}
