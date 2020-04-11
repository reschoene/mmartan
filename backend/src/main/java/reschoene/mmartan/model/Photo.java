package reschoene.mmartan.model;

public class Photo extends BaseModel{
    String path;
    
    public Photo(Long pId, String pName, String pPath) {
        super(pId, pName);
        
        this.path = pPath;
    }
    
    public String getPath() {
        return path;
    }
    
    public void setPath(String path) {
        this.path = path;
    }
}
