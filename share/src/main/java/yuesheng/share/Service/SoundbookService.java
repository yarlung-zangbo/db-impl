package yuesheng.share.Service;

import yuesheng.share.Entity.Comment;
import yuesheng.share.Entity.Soundbook;

import java.util.List;

public interface SoundbookService {
    public Object findByBookid(String username, int bookid);
    public Object getComment(int bookid);
    public Object getAll();
    public Object findReleaseBook(String name);
}
