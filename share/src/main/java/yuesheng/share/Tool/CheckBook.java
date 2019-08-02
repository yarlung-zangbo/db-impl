package yuesheng.share.Tool;

import yuesheng.share.Entity.Soundbook;

public class CheckBook {
    public static String check(Soundbook book){
        if(book.getDisabled()!=null && book.getDisabled().compareTo(TimeTool.now())>0)
            return "book disabled";
        if(book.getReleasetime()==null)
            return "book not release";
        return null;
    }
}
