package reschoene.mmartan.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JdbcConnectionFactory {
    public static Connection getConnection() throws SQLException, ClassNotFoundException {  
        Connection connection = null;  
        try {    
            connection = DriverManager.getConnection(DBConnectionData.url, DBConnectionData.user, DBConnectionData.password);    
            return connection;  
        } catch (SQLException e) {  
            System.out.println("Nao foi possivel conectar ao banco de dados.");  
            throw e;  
        }  
    }
    public static Connection getTransConnection() throws SQLException, ClassNotFoundException {
        Connection con = getConnection();
        con.setAutoCommit(false);
        return con;
    }
}
