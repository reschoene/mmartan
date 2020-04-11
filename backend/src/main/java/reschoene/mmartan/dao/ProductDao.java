package reschoene.mmartan.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import reschoene.mmartan.jdbc.JdbcConnectionFactory;
import reschoene.mmartan.model.Line;
import reschoene.mmartan.model.Photo;
import reschoene.mmartan.model.Product;
import reschoene.mmartan.model.Size;

public class ProductDao {
    public List<Product> getProductCatalog(int pPageNumber, int pPageSize, String pProdDescription) throws ClassNotFoundException, SQLException{
        List<Product> productCatalog = new LinkedList<Product>();
        
        Connection conn = JdbcConnectionFactory.getConnection();
        
        final String sql = 
            " SELECT p.id AS prodId, l.id AS lineId, l.name AS lineName, s.id AS sizeId, s.name AS sizeName, " + 
            "       p.name AS prodName, p.description AS prodDesc, p.regularPrice AS prodRegPrice, p.salePrice AS prodSalePrice, " + 
            "       f.id AS photoId, f.name as photoName, f.path AS photoPath " + 
            " FROM Products p " + 
            " INNER JOIN `Lines`         AS l ON (l.id        = p.idLine) " + 
            " INNER JOIN Sizes           AS s ON (s.id        = p.idSize) " + 
            " INNER JOIN ProductsXPhotos AS x ON (x.idProduct = p.id) " + 
            " INNER JOIN Photos          AS f ON (f.id        = x.idPhoto) " + 
            " INNER JOIN ( " + 
            "   SELECT id FROM Products " + 
            "   WHERE description like ? " + 
            "   ORDER BY id " + 
            "   LIMIT ? OFFSET ? " + 
            " ) AS filteredRec ON (p.id = filteredRec.id) ";
        
        PreparedStatement pst = conn.prepareStatement(sql);
        pst.setString(1, "%" + pProdDescription + "%");
        pst.setInt(2, pPageSize); //limit
        pst.setInt(3, (pPageSize * (pPageNumber-1))); //offset
        ResultSet rs = pst.executeQuery();
        
        Product p = null;
        long prodId = 0L;
        
        while (rs.next()) {
            if (prodId != rs.getLong("prodId")) {
                p = new Product(rs.getLong("prodId"), rs.getString("prodName"));
                productCatalog.add(p);
                                
                p.setDescription(rs.getString("prodDesc"));
                p.setLine(new Line(rs.getLong("lineId"), rs.getString("lineName")));
                p.setSize(new Size(rs.getLong("sizeId"), rs.getString("sizeName")));
                p.setRegularPrice(rs.getDouble("prodRegPrice"));
                p.setSalePrice(rs.getDouble("prodSalePrice"));
            }
            
            p.getPhotos().add(new Photo(rs.getLong("photoId"), rs.getString("photoName"), rs.getString("photoPath")));
            
            prodId = rs.getLong("prodId");
        }
        
        return productCatalog;
    }
}
