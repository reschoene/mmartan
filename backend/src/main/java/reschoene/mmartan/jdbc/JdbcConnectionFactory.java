package reschoene.mmartan.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/** 
 * A simple connection factory that allows the creation of transactional and non-transactional connections
 * */
public class JdbcConnectionFactory {
    public static Connection getConnection() throws SQLException, ClassNotFoundException {  
        Connection connection = null;  
        try {    
            //Requests to DriverManager a database connection
            connection = DriverManager.getConnection(DBConnectionData.url, DBConnectionData.user, DBConnectionData.password);    
            return connection;  
        } catch (SQLException e) {  
            System.out.println("Nao foi possivel conectar ao banco de dados.");  
            throw e;  
        }  
    }
    public static Connection getTransConnection() throws SQLException, ClassNotFoundException {
        Connection con = getConnection();
        
        //Setting autocommit to false allows doing several DML operations without the automatic 
        //commit of each one. The commit will be done manually only after the last operation.
        con.setAutoCommit(false);
        
        return con;
    }
}
