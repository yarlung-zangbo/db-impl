package yuesheng.personal.Service;

public interface ListenService {
    public Object listen(String username, int bookid);
    public Object deleteListen(int listenid, String username);
}
