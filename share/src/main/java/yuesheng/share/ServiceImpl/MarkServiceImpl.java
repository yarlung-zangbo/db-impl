package yuesheng.share.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.share.Dao.MarkDao;
import yuesheng.share.Dao.SoundbookDao;
import yuesheng.share.Dao.UserDao;
import yuesheng.share.Entity.Mark;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Entity.User;
import yuesheng.share.Service.MarkService;
import yuesheng.share.Tool.CheckBook;
import yuesheng.share.Tool.PackTool;

import javax.transaction.Transactional;

@Service
public class MarkServiceImpl implements MarkService {

    @Autowired
    private MarkDao markDao;

    @Autowired
    private SoundbookDao soundbookDao;

    @Autowired
    private UserDao userDao;

    @Override
    @Transactional
    public Object mark(String username, int bookid, int score) {
        Soundbook book=soundbookDao.findByBookid(bookid);
        String check= CheckBook.check(book);
        if(check!=null)
            return PackTool.pack("fail", check);
        User user=userDao.findByUsername(username);
        Mark mark=markDao.getMark(user,book);
        if(mark==null){
            mark=new Mark();
            mark.setSoundbook(book);
            mark.setUser(user);
            mark.setScore(score);
        }else{
            mark.setScore(score);
        }
        markDao.save(mark);
        book.setMark(markDao.caculateMark(bookid));
        return PackTool.pack("ok", book.getMark());
    }

    @Override
    public Object getMark(String username, int bookid) {
        User user=userDao.findByUsername(username);
        Soundbook book=soundbookDao.findByBookid(bookid);
        Mark mark=markDao.getMark(user, book);
        if(mark==null)
            return PackTool.pack("ok", 0);
        return PackTool.pack("ok", mark.getScore());
    }
}
