package yuesheng.personal.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.personal.Dao.ListenDao;
import yuesheng.personal.Dao.SoundbookDao;
import yuesheng.personal.Dao.UserDao;
import yuesheng.personal.Entity.Listen;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Entity.User;
import yuesheng.personal.Service.ListenService;
import yuesheng.personal.tool.PackTool;
import yuesheng.personal.tool.TimeTool;

import javax.transaction.Transactional;

@Service
public class ListenServiceImpl implements ListenService {

    @Autowired
    private ListenDao  listenDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private SoundbookDao soundbookDao;

    @Override
    public Object listen(String username, int bookid) {
        User user=userDao.findByUsername(username);
        if(user==null)
            return PackTool.pack("fail", username+", user not exist");
        Soundbook book=soundbookDao.findByBookid(bookid);
        if(book==null)
            return PackTool.pack("fail", bookid+ ", book not exist");
        Listen listen=new Listen();
        listen.setListener(user);
        listen.setSoundbook(book);
        listen.setTime(TimeTool.now());
        listenDao.save(listen);
        return PackTool.pack("ok", bookid);
    }

    @Override
    @Transactional
    public Object deleteListen(int listenid, String username) {
        try{
            Listen listen=listenDao.findByListenid(listenid);
            if(!listen.getListener().getUsername().equals(username))
                return PackTool.pack("fail", "record isnot yours");
            listenDao.delete(listenid);
            return PackTool.pack("ok", listenid);
        }catch (Exception err){
            return PackTool.pack("fail", "delete fail");
        }
    }
}
