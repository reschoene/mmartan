package reschoene.mmartan.model;

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