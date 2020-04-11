package reschoene.mmartan.controller;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import reschoene.mmartan.dao.ProductDao;
import reschoene.mmartan.model.Product;

@RestController
public class ProductController extends BaseController{    
    @GetMapping("/getProductCatalog")
    @CrossOrigin(FRONT_END_URL)
    public List<Product> getProductCatalog(@RequestParam int pageNumber, 
                                           @RequestParam int pageSize, 
                                           @RequestParam(required = false) String prodDescription) throws ClassNotFoundException, SQLException {
        
      //Protecao para os parametros recebidos pela API
      if (prodDescription == null)
          prodDescription = "";
      
      if (pageNumber <= 0)
          pageNumber = 1;
      
      if (pageSize < 0)
          pageSize = 0;
      
      List<Product> productList = new ProductDao().getProductCatalog(pageNumber, pageSize, prodDescription);      
      
      return productList;
    }
}
