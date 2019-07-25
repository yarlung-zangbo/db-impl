package yuesheng.personal.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.personal.Dao.SoundbookDao;
import yuesheng.personal.Dao.UserDao;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Entity.User;
import yuesheng.personal.Service.UserService;
import yuesheng.personal.tool.PackTool;
import yuesheng.personal.tool.TimeTool;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private SoundbookDao soundbookDao;

    @Override
    public Object getSelfBooks(String username) {
        User user=userDao.findByUsername(username);
        return PackTool.pack("ok", user.getSelfBooks());
    }

    @Override
    public Object getFavorite(String username) {
        User user=userDao.findByUsername(username);
        return PackTool.pack("ok", user.getFavorite());
    }

    @Override
    public Object getListenRecorde(String username) {
        User user=userDao.findByUsername(username);
        return PackTool.pack("ok", user.getListenRecord());
    }

    @Override
    public Object findSelfBook(String username, String name) {
        User user=userDao.findByUsername(username);
        List<Soundbook> selfBooks=user.getSelfBooks();
        List<Soundbook> books=new ArrayList<Soundbook>();
        if(name==null) name="";
        for(Soundbook book: selfBooks){
            if(book.getName().indexOf(name)>=0)
                books.add(book);
        }
        return PackTool.pack("ok", books);
    }

    @Override
    public Object findFavorite(String username, String name) {
        User user=userDao.findByUsername(username);
        List<Soundbook> selfBooks=user.getFavorite();
        List<Soundbook> books=new ArrayList<Soundbook>();
        for(Soundbook book: selfBooks){
            if(book.getName().indexOf(name)>=0)
                books.add(book);
        }
        return PackTool.pack("ok", books);
    }

    @Override
    public Object favorite(String username, int bookid) {
        User user=userDao.findByUsername(username);
        Soundbook book=soundbookDao.findByBookid(bookid);
        if(book.getDisabled().compareTo(TimeTool.now())>0){
            return PackTool.pack("fail", "book disabled");
        }
        if(book.getReleasetime()==null){
            return PackTool.pack("fail", "book not release");
        }
        List<Soundbook> favorite= user.getFavorite();
        for(Soundbook b:favorite){
            if(b.getBookid()==bookid)
                return PackTool.pack("ok", 0);
        }
        favorite.add(book);
        userDao.save(user);
        return PackTool.pack("ok", bookid);
    }

    @Override
    public Object unFavorite(String username, int bookid) {
        User user=userDao.findByUsername(username);
        List<Soundbook> favorite=user.getFavorite();
        for(Soundbook book:favorite){
            if(book.getBookid()==bookid){
                favorite.remove(book);
                userDao.save(user);
                return PackTool.pack("ok", bookid);
            }
        }
        return PackTool.pack("ok", 0);
    }

    @Override
    public Object checkFavorite(int bookid, String username) {
        Integer id=userDao.checkFavorite(bookid, username);
        if(id!=null)
            return PackTool.pack("ok", true);
        return PackTool.pack("fail", false);
    }


}
