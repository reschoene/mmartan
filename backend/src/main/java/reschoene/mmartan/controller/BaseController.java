package reschoene.mmartan.controller;

/** 
 * Base class for all controller classes 
 **/
public class BaseController {
  //FRONT_END_URL will be changed according to the environment this server will be running.
  //Its used to configure the cross origin control, setting the trust domains  
    
  //production    public static final String FRONT_END_URL = "http://vps6174.publiccloud.com.br";
  //local         public static final String FRONT_END_URL = "http://localhost:4200";
  public static final String FRONT_END_URL = "http://localhost:3000";
}
