package reschoene.mmartan.controller;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import reschoene.mmartan.model.Line;
import reschoene.mmartan.model.Product;
import reschoene.mmartan.model.Size;

@RestController
public class ProductController extends BaseController{
    @GetMapping("/getProductCatalog")
    @CrossOrigin(FRONT_END_URL)
    public List<Product> getProductCatalog() {     
      List<Product> productList = new LinkedList<Product>();
      
      for (int i=0; i<50; i++) {
          Product p1 = new Product();
          p1.setId(productList.size()+1L);
          p1.setName("Kit de Cama 201 fios");
          p1.setDescription("Lençol, colcha");
          p1.setRegularPrice(20800.23);
          p1.setSalePrice(98);
          p1.getPhotos().add("1.png");
          p1.getPhotos().add("2.png");
          p1.getPhotos().add("3.png");
          p1.getPhotos().add("4.png");
          p1.setLine(new Line(1L, "Classic"));
          p1.setSize(new Size(1L, "King Size"));
                
          Product p2 = new Product();
          p2.setId(productList.size()+2L);
          p2.setName("Kit de Cama 201 fios");
          p2.setDescription("Lençol, colcha");
          p2.setRegularPrice(56.65);
          p2.setSalePrice(98);
          p2.getPhotos().add("5.png");
          p2.getPhotos().add("6.png");
          p2.getPhotos().add("3.png");
          p2.getPhotos().add("7.png");
          p2.setLine(new Line(1L, "Classic"));
          p2.setSize(new Size(1L, "King Size"));      
          
          productList.add(p1);
          productList.add(p2);
      }
      
      return productList;
    }
}
