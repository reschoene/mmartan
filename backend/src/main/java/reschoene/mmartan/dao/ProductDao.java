package reschoene.mmartan.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import reschoene.mmartan.jdbc.JdbcConnectionFactory;
import reschoene.mmartan.model.Line;
import reschoene.mmartan.model.Photo;
import reschoene.mmartan.model.Product;
import reschoene.mmartan.model.ProductCatalog;
import reschoene.mmartan.model.Size;

/** 
 * This class is responsible for loading and returning products data from database
 * Implements pattern Data Access Object. 
 * */
public class ProductDao {
    /**  
     * Load from database products whose descriptions matches pProdDescription, using the specified pagination parameters
     * 
     * @param pPageNumber page number of the result set to be returned
     * @param pPageSize number of records per page
     * @param pProdDescription term applied in the search to filtering products by description
     * @return returns all founded products at specified page that matches the search term.   
     * */    
    public ProductCatalog getProductCatalog(int pPageNumber, int pPageSize, String pProdDescription) throws ClassNotFoundException, SQLException{
        ProductCatalog productCatalog = new ProductCatalog();
        
        Connection conn = JdbcConnectionFactory.getConnection(); 
        
        //get total of products considering only description filter. The amount returned is the total of all pages
        final String sqlCount = 
            " SELECT Count(id) totalProducts FROM Products " +
            " WHERE description like ? ";
        
        PreparedStatement pstCount = conn.prepareStatement(sqlCount);
        pstCount.setString(1, "%" + pProdDescription + "%");
        ResultSet rsCount = pstCount.executeQuery();
        
        if (rsCount.next())
            productCatalog.setTotalProducts(rsCount.getInt("totalProducts"));
        
        //search products filtering by description, considering the page size and page number
        //pagination control is done directly in this query.
        
        //LIMIT is assign the page size, for setting the limit of records to be returned by database and
        //OFFSET is assign the number of records to be ignored. The results will start after these records 
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
        
        //This query returns several records per product. This happens because we can have several photos per product.
        //Therefore it's necessary to check if product ID has changed before adding it in the resulting productCatalog.
        while (rs.next()) {
            if (prodId != rs.getLong("prodId")) {
                p = new Product(rs.getLong("prodId"), rs.getString("prodName"));
                productCatalog.getProducts().add(p);
                                
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
