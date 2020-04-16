package reschoene.mmartan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main class for mmartan product catalog. It starts the Spring application
 * 
 * @author Renato Schoene
 * @version 1.0.0 
 * */
@SpringBootApplication
public class MmartanApplication {

    //application entry point. It bootstrap spring application
	public static void main(String[] args) {
		SpringApplication.run(MmartanApplication.class, args);
	}

}
