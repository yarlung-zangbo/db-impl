package yuesheng.share.Tool;

public class PackTool {

    public static PackJson pack(String status, Object values){
        PackJson json=new PackJson();
        json.setStatus(status);
        json.setValues(values);
        return json;
    }

}
