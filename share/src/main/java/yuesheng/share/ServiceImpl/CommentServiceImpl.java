package yuesheng.share.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.share.Dao.CommentDao;
import yuesheng.share.Dao.SoundbookDao;
import yuesheng.share.Dao.UserDao;
import yuesheng.share.Entity.Comment;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Entity.User;
import yuesheng.share.Service.CommentService;
import yuesheng.share.Tool.CheckBook;
import yuesheng.share.Tool.PackTool;
import yuesheng.share.Tool.TimeTool;

import javax.transaction.Transactional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private SoundbookDao soundbookDao;

    @Autowired
    private CommentDao commentDao;

    @Override
    @Transactional
    public Object addComment(String username, int bookid, String content) {
        User user=userDao.findByUsername(username);
        Soundbook book=soundbookDao.findByBookid(bookid);
        String check=CheckBook.check(book);
        if(check!=null)
            return PackTool.pack("fail", check);
        Comment comment=new Comment();
        comment.setUser(user);
        comment.setContent(content);
        comment.setSoundbook(book);
        comment.setTime(TimeTool.now());
        commentDao.save(comment);
        return PackTool.pack("ok", bookid);
    }
}
