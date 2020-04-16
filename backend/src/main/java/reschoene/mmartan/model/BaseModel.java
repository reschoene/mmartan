package reschoene.mmartan.model;

/** 
 * Used by almost all model classes. It centralizes common properties as id and name
 * */
public class BaseModel {
    Long id;
    String name;
    
    public BaseModel(Long pId, String pName) {
        this.id = pId;
        this.name = pName;
    }
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
