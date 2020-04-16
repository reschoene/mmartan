package reschoene.mmartan.model;

import java.util.LinkedList;
import java.util.List;

/** 
 * Represents a product available for sale.
 * */
public class Product extends BaseModel{
    String description;
    Line line;
    Size size;
    List<Photo> photos = new LinkedList<Photo>();
    double regularPrice;
    double salePrice;    
    
    public Product(Long pId, String pName) {
        super(pId, pName);
    }
    
    public double getRegularPrice() {
        return regularPrice;
    }
    public void setRegularPrice(double regularPrice) {
        this.regularPrice = regularPrice;
    }
    public double getSalePrice() {
        return salePrice;
    }
    public void setSalePrice(double salePrice) {
        this.salePrice = salePrice;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Line getLine() {
        return line;
    }
    public void setLine(Line line) {
        this.line = line;
    }
    public Size getSize() {
        return size;
    }
    public void setSize(Size size) {
        this.size = size;
    }
    public List<Photo> getPhotos() {
        return photos;
    }
    public void setPhotos(List<Photo> photos) {
        this.photos = photos;
    }
}
