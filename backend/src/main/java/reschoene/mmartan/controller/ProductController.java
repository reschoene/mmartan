package reschoene.mmartan.controller;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import reschoene.mmartan.model.Line;
import reschoene.mmartan.model.Photo;
import reschoene.mmartan.model.Product;
import reschoene.mmartan.model.Size;

@RestController
public class ProductController extends BaseController{
    
    private Photo getNewPhoto(Product p, int nro) {
        return new Photo(p.getPhotos().size()+1L, nro+"", nro+".png");        
    }
    
    @GetMapping("/getProductCatalog")
    @CrossOrigin(FRONT_END_URL)
    public List<Product> getProductCatalog() {     
      List<Product> productList = new LinkedList<Product>();
      
      for (int i=0; i<50; i++) {
          Product p1 = new Product(productList.size()+1L, "Kit de Cama 201 fios");
          p1.setDescription("Lençol, colcha");
          p1.setRegularPrice(20800.23);
          p1.setSalePrice(98);
          p1.getPhotos().add(getNewPhoto(p1, 1));
          p1.getPhotos().add(getNewPhoto(p1, 2));
          p1.getPhotos().add(getNewPhoto(p1, 3));
          p1.getPhotos().add(getNewPhoto(p1, 4));
          p1.setLine(new Line(1L, "Classic"));
          p1.setSize(new Size(1L, "King Size"));
                
          Product p2 = new Product(productList.size()+2L, "Kit de Cama 201 fios");
          p2.setDescription("Lençol, colcha");
          p2.setRegularPrice(56.65);
          p2.setSalePrice(98);
          p2.getPhotos().add(getNewPhoto(p2, 5));
          p2.getPhotos().add(getNewPhoto(p2, 6));
          p2.getPhotos().add(getNewPhoto(p2, 3));
          p2.getPhotos().add(getNewPhoto(p2, 7));
          p2.setLine(new Line(1L, "Classic"));
          p2.setSize(new Size(1L, "King Size"));      
          
          productList.add(p1);
          productList.add(p2);
      }
      
      return productList;
    }
}
