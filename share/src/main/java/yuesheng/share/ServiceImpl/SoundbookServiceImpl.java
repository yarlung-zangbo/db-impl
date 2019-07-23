package yuesheng.share.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.share.Dao.SoundbookDao;
import yuesheng.share.Entity.Comment;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Service.SoundbookService;
import yuesheng.share.Tool.CheckBook;
import yuesheng.share.Tool.PackTool;

import java.util.List;

@Service
public class SoundbookServiceImpl implements SoundbookService {

    @Autowired
    private SoundbookDao soundbookDao;

    @Override
    public Object findByBookid(String username, int bookid) {
        Soundbook book=soundbookDao.findByBookid(bookid);
        if(book.getCreater().getUsername().equals(username))
            return PackTool.pack("ok", book);
        String check=CheckBook.check(book);
        if(check!=null)
            return PackTool.pack("fail", check);
        return PackTool.pack("ok", book);
    }

    @Override
    public Object getComment(int bookid) {
        Soundbook book=soundbookDao.findByBookid(bookid);
        String check= CheckBook.check(book);
        if(check!=null)
            return PackTool.pack("fail", check);
        return PackTool.pack("ok", book.getCommentList());
    }

    @Override
    public Object share(String username, int bookid) {
        return null;
    }
}
