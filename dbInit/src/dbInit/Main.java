package dbInit;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

/** 
 * Database Initializer. This console application aims to helps populate mmartan's database for testing and demonstrating purposes.
 * Its helps to conducts performance tests as well, as it generate automatically a lot of data.
 * 
 * @author Renato Schoene
 * @version 1.0.0
 * */
public class Main {
    //Database connection properties
    public static final String DB_URL = "jdbc:mysql://127.0.0.1:3306/mmartan";
    public static final String DB_USER = "root";
    public static final String DB_PASSWORD = "zz4115";
    
    //all possible product names for generation goes here
    public static final String[] prodNames = {"Lençol", "Colcha", "Cobertor", "Edredon", "Fronha",
                                              "Coberta", "Toalha de Rosto", "Toalha", "Toalha de Banho",
                                              "Caminho de Mesa", "Camas", "Cama", "Conjunto de Cama",
                                              "Roupão", "Manta", "Kit Camas", "Jogos de Lençol", "Travesseiro"};
    
    //for random data generation
    public static Random rand = new Random();
        
    //generation control
    public static final int PRODUCTS_TO_GENERATE = 2000;
    
    public static final int PHOTOS_COUNT = 7;
    
    public static int insertedLines = 0;
    public static int insertedSizes = 0;
    public static int insertedPhotos = 0;
    
    /** 
     * Application entry point, is the first method to be executed
     * */
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
    
    /** 
     * Delete all old records from database
     * @param pConn database connection id
     * */
    private static void cleanupDB(Connection pConn) throws SQLException {
        System.out.println("Deleting old records...");
        
        Statement st = pConn.createStatement();
        
        //This update is necessary for avoiding database foreign key constraint violations 
        st.execute(" UPDATE Products SET idSize=null, idLine=null ");
        
        st.execute(" DELETE FROM `Lines` ");
        st.execute(" DELETE FROM Sizes ");
        st.execute(" DELETE FROM ProductsXPhotos ");
        st.execute(" DELETE FROM Products ");
        st.execute(" DELETE FROM Photos ");
        
        System.out.println("Cleanup done!\n");
    }
    
    /** 
     * Populates database
     * @param pConn database connection id
     * */
    private static void populateDB(Connection pConn)  throws SQLException  {
        System.out.println("Populating mmartan database...\n");
        
        //starts data generations
        generateLines(pConn);
        generateSizes(pConn);
        generatePhotos(pConn);
        generateProducts(pConn);
        
        System.out.println("mmartan database is successfully initialized!!");
    }    
    
    
    /** 
     * Generate Lines records.
     * @param pConn database connection id
     * */
    private static void generateLines(Connection pConn)  throws SQLException  {
        System.out.println("Generating Lines...");
        
        insertedLines = 0;
        
        final String SQL_INSERT = " INSERT INTO `Lines` (id, name) VALUES (?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        //Generate fixed records 
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
    
    /** 
     * Generate Sizes records.
     * @param pConn database connection id
     * */
    private static void generateSizes(Connection pConn)  throws SQLException  {
        System.out.println("Generating Sizes...");
        
        insertedSizes = 0;
        
        final String SQL_INSERT = " INSERT INTO Sizes (id, name) VALUES (?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        //Generate fixed records
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
    
    /** 
     * Generate Photos records.
     * @param pConn database connection id
     * */    
    private static void generatePhotos(Connection pConn)  throws SQLException  {
        System.out.println("Generating Photos...");
        
        insertedPhotos = 0;        
        
        final String SQL_INSERT = " INSERT INTO Photos (id, name, path) VALUES (?,?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        //generate a total of PHOTOS_COUNT photos
        for (int i=1; i<=PHOTOS_COUNT; i++) {
            psInsert.setInt(1, ++insertedPhotos);
            psInsert.setString(2, String.valueOf(i));
            psInsert.setString(3, String.format("%d.png", i));
            psInsert.execute();
        }
        
        System.out.println("Generating Photos... done\n");
    }
    
    /** 
     * Generate products for the catalog. It'll be generated a total of PRODUCTS_TO_GENERATE records
     * @param pConn database connection id
     * */
    private static void generateProducts(Connection pConn)  throws SQLException  {
        System.out.println("Generating Products...");
        
        final String SQL_INSERT = " INSERT INTO Products (id, idLine, idSize, name, description, regularPrice, salePrice) " + 
                                  " VALUES (?,?,?,?,?,?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        //Get max from table ProductsXPhotos
        Statement st = pConn.createStatement();
        ResultSet rs = st.executeQuery("SELECT MAX(id) AS MAX_ID FROM ProductsXPhotos");
        
        int nextIdProdXPhoto = 1;
        if (rs.next())
            nextIdProdXPhoto = rs.getInt("MAX_ID") + 1;
        
        //Inserts a total of PRODUCTS_TO_GENERATE records 
        for (int i=1; i<=PRODUCTS_TO_GENERATE; i++) {            
            String prodName = getRandUniqueProdName(i);
                        
            double higherPrice = getRandPrice();
            double lowerPrice = calcSalePrice(higherPrice);           
                            
            psInsert.setInt(1, i);
            psInsert.setInt(2, getRandId(insertedLines));
            psInsert.setInt(3, getRandId(insertedSizes));            
            psInsert.setString(4, prodName);
            psInsert.setString(5, getUniqueProdDesc(prodName));
            psInsert.setDouble(6, higherPrice);
            psInsert.setDouble(7, lowerPrice);
            psInsert.execute();
            
            //generate several photos for product with id i.
            nextIdProdXPhoto = generateProductsXPhotos(pConn, i, nextIdProdXPhoto);
        }
        
        System.out.println("Generating Products... done\n");
    }
    
    /**
     * Generates photos for the product on table ProductsXPhotos
     * @param pConn database connection id
     * @param pProductId product id to generate photos
     * @param pProdXPhotoId next available id of table ProductsXPhotos
     * @return next available id of table ProductsXPhotos
     *   
     * ProductsXPhotos is a many to many table. So, one product can have several photos and one photo can belong to several products. 
     * A photo belong to more than one product will occur only in tests cenarios
     * */
    private static int generateProductsXPhotos(Connection pConn, int pProductId, int pProdXPhotoId) throws SQLException {
        final String SQL_INSERT = " INSERT INTO ProductsXPhotos (id, idProduct, idPhoto) VALUES (?,?,?) ";
        
        PreparedStatement psInsert = pConn.prepareStatement(SQL_INSERT);
        
        List<Integer> lsPhotoIds = new ArrayList<Integer>();
        for (int i=1; i<=PHOTOS_COUNT; i++)
            lsPhotoIds.add(i);
        Collections.shuffle(lsPhotoIds); //randomize ids
        
        for (int i=1; i<=4; i++) {
            psInsert.setInt(1, pProdXPhotoId++);
            psInsert.setInt(2, pProductId);
            psInsert.setInt(3, lsPhotoIds.get(i));
            psInsert.execute();
        }        
        
        return pProdXPhotoId;
    }
    
    /** 
     * Generates a random number to be used as an table id
     * @param max id value possible to generate
     * @return returns the generated id
     * */
    private static int getRandId(int pMaxValue) {
        //nextInt returns a random number between 0 and its parameters-1, so add to its parameters 
        int id = rand.nextInt(pMaxValue+1);
        
        //valid ids starts at 1
        if (id == 0)
            id = 1;
        
        return id;
    }
    
    /** 
     * Generates a random name based on the available names on array prodNames.
     * Add a suffix containing an id. This allows each name to be unique
     * @param pId id used to assures product names will be unique
     * @return generated product name
     * */
    private static String getRandUniqueProdName(int pId) {
        int idx = rand.nextInt(prodNames.length);
        return prodNames[idx] + " " + pId;
    }
    
    /** 
     * Generates a fake product description by adding a prefix in the given product name
     * @param pProductName product name used in description generation
     * @return generated product description
     * */
    private static String getUniqueProdDesc(String pProductName) {
        return "Descrição do produto " + pProductName;
    }
    
    /** 
     * Calculates and return a random price
     * @return generated random price without discount
     * */
    private static double getRandPrice() {
        //set initial value as a random number between 0 and 1
        double price = rand.nextDouble();
        
        //calculate a random factor between 0 and 3  
        int fator = rand.nextInt(4);
        if (fator == 0)
            fator = 1; //this makes factor stay between 1 and 3
        
        price *= Math.pow(10, fator); //this factor will be used as the magnitude order of the price
        
        //To be more realistic, increase low price values
        if (price < 10)
            price *= 3;
        
        return formatPrice(price);
    }
    
    /** 
     * Calculate and return the price with a random discount between 10% and 50%.
     * @param price the value to apply the discount
     * @return price after a random discount is applied
     * */
    private static double calcSalePrice(double pPrice) {
        double offPercent = rand.nextInt(5) + 1; //return integer between 1 and 5
        offPercent = 1 - (offPercent / 10);
        return formatPrice(pPrice * offPercent);
    }
    
    /** 
     * Formats the price with two decimal digits
     * @param pPrice price to format
     * @return returns price formatted with two decimal digits
     * */
    private static double formatPrice(double pPrice) {
        return Math.round(pPrice * 100) / 100d;
    }
}
