package dbInit;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;

public class Main {
    //Database access
    public static final String DB_URL = "jdbc:mysql://127.0.0.1:3306/mmartan";
    public static final String DB_USER = "root";
    public static final String DB_PASSWORD = "zz4115";
    
    public static final String[] prodNames = {"Lençol", "Colcha", "Cobertor", "Edredon", "Fronha",
                                              "Coberta", "Toalha de Rosto", "Toalha", "Toalha de Banho",
                                              "Caminho de Mesa", "Camas", "Cama", "Conjunto de Cama",
                                              "Roupão", "Manta", "Kit Camas", "Jogos de Lençol", "Travesseiro"};
    
    //Generate random data
    public static Random rand = new Random();
        
    //generation control
    public static final int PRODUCTS_TO_GENERATE = 200;
    
    public static final int PHOTOS_COUNT = 7;
    
    public static int insertedLines = 0;
    public static int insertedSizes = 0;
    public static int insertedPhotos = 0;
    
    public static void main(String[] args) {
        System.out.println("Connecting to mmartan database...\n");
        
        // auto close connection
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {

            if (conn != null) {                
                // start transaction block
                conn.setAutoCommit(false); // default true
                
                cleanupDB(conn);
                populateDB(conn);
                
                // end transaction block, commit changes
                conn.commit();

                // good practice to set it back to default true
                conn.setAutoCommit(true);                
            } else {
                System.out.println("Failed to make connection!");
            }

        } catch (SQLException e) {
            System.err.format("SQL State: %s\n%s", e.getSQLState(), e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        }        
    }    
    
    private static void cleanupDB(Connection pConn) throws SQLException {
        System.out.println("Deleting old records...");
        
        Statement st = pConn.createStatement();
        
        st.execute(" UPDATE Products SET idSize=null, idLine=null ");
        st.execute(" DELETE FROM `Lines` ");
        st.execute(" DELETE FROM Sizes ");
        st.execute(" DELETE FROM ProductsXPhotos ");
        st.execute(" DELETE FROM Products ");
        st.execute(" DELETE FROM Photos ");
        
        System.out.println("Cleanup done!\n");
    }
    
    private static void populateDB(Connection pConn)  throws SQLException  {
        System.out.println("Populating mmartan database...\n");
        
        generateLines(pConn);
        generateSizes(pConn);
        generatePhotos(pConn);
        generateProducts(pConn);
        
        System.out.println("mmartan database is successfully initialized!!");
    }    
    
    private static void generateLines(Connection pConn)  throws SQLException  {
        System.out.println("Generating Lines...");
        
        insertedLines = 0;
        
        final String SQL_INSERT = " INSERT INTO `Lines` (id, name) VALUES (?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        psInsert.setInt(1, ++insertedLines);
        psInsert.setString(2, "Classic");
        psInsert.execute();
        
        psInsert.setInt(1, ++insertedLines);
        psInsert.setString(2, "Modern");
        psInsert.execute();
        
        psInsert.setInt(1, ++insertedLines);
        psInsert.setString(2, "Casual");
        psInsert.execute();
        
        System.out.println("Generating Lines... done\n");
    }
    
    private static void generateSizes(Connection pConn)  throws SQLException  {
        System.out.println("Generating Sizes...");
        
        insertedSizes = 0;
        
        final String SQL_INSERT = " INSERT INTO Sizes (id, name) VALUES (?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        psInsert.setInt(1, ++insertedSizes);
        psInsert.setString(2, "King Size");
        psInsert.execute();
        
        psInsert.setInt(1, ++insertedSizes);
        psInsert.setString(2, "Queen Size");
        psInsert.execute();
        
        psInsert.setInt(1, ++insertedSizes);
        psInsert.setString(2, "Solteiro");
        psInsert.execute();        
        
        psInsert.setInt(1, ++insertedSizes);
        psInsert.setString(2, "Infantil");
        psInsert.execute();        
        
        System.out.println("Generating Sizes... done\n");
    }
    
    private static void generatePhotos(Connection pConn)  throws SQLException  {
        System.out.println("Generating Photos...");
        
        insertedPhotos = 0;        
        
        final String SQL_INSERT = " INSERT INTO Photos (id, name, path) VALUES (?,?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        for (int i=1; i<=PHOTOS_COUNT; i++) {
            psInsert.setInt(1, ++insertedPhotos);
            psInsert.setString(2, String.valueOf(i));
            psInsert.setString(3, String.format("%d.png", i));
            psInsert.execute();
        }
        
        System.out.println("Generating Photos... done\n");
    }
    
    private static void generateProducts(Connection pConn)  throws SQLException  {
        System.out.println("Generating Products...");
        
        final String SQL_INSERT = " INSERT INTO Products (id, idLine, idSize, name, description, regularPrice, salePrice) " + 
                                  " VALUES (?,?,?,?,?,?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        Statement st = pConn.createStatement();
        ResultSet rs = st.executeQuery("SELECT MAX(id) AS MAX_ID FROM ProductsXPhotos");
        
        int maxProdXPhoto = 1;
        if (rs.next())
            maxProdXPhoto = rs.getInt("MAX_ID") + 1;
        
        for (int i=1; i<=PRODUCTS_TO_GENERATE; i++) {
            String prodName = getRandUniqueProdName(i);
            
            double lowerPrice = getRandPrice();
            double higherPrice = getRandPrice();
            
            if (lowerPrice > higherPrice) {
                double tmp = lowerPrice;
                lowerPrice = higherPrice;
                higherPrice = tmp;
            }
                            
            psInsert.setInt(1, i);
            psInsert.setInt(2, getRandId(insertedLines));
            psInsert.setInt(3, getRandId(insertedSizes));            
            psInsert.setString(4, prodName);
            psInsert.setString(5, getUniqueProdDesc(prodName));
            psInsert.setDouble(6, higherPrice);
            psInsert.setDouble(7, lowerPrice);
            psInsert.execute();
            
            maxProdXPhoto = generateProductsXPhotos(pConn, i, maxProdXPhoto);
        }
        
        System.out.println("Generating Products... done\n");
    }
    
    private static int generateProductsXPhotos(Connection pConn, int pProductId, int pProdXPhotoId) throws SQLException {
        final String SQL_INSERT = " INSERT INTO ProductsXPhotos (id, idProduct, idPhoto) VALUES (?,?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        for (int i=1; i<=4; i++) {
            psInsert.setInt(1, pProdXPhotoId++);
            psInsert.setInt(2, pProductId);
            psInsert.setInt(3, getRandId(PHOTOS_COUNT));
            psInsert.execute();
        }        
        
        return pProdXPhotoId;
    }
    
    private static int getRandId(int pMaxValue) {
        int id = rand.nextInt(pMaxValue+1);
        
        if (id == 0)
            id = 1;
        
        return id;
    }
    
    private static String getRandUniqueProdName(int pId) {
        int idx = rand.nextInt(prodNames.length);
        return prodNames[idx] + " " + pId;
    }
    
    private static String getUniqueProdDesc(String pProductName) {
        return "Descrição do produto " + pProductName;
    }
    
    private static double getRandPrice() {
        double price = rand.nextDouble();
        
        //Para que o preco seja da ordem de 10, 100 ou 1000
        int fator = rand.nextInt(4);
        if (fator == 0)
            fator = 1;
        
        price *= Math.pow(10, fator);
        
        return truncatePrice(price);
    }
    
    private static double truncatePrice(double pPrice) {
        return Math.round(pPrice * 100) / 100d;
    }
}
