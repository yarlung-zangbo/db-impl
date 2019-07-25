package yuesheng.share.Service;

public interface MarkService {
    public Object mark(String username, int bookid, int score);
    public Object getMark(String username, int bookid);
}
