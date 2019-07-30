package yuesheng.personal.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.personal.Dao.SoundbookDao;
import yuesheng.personal.Dao.TextAudioDao;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Service.SoundbookService;
import yuesheng.personal.tool.PackTool;
import yuesheng.personal.tool.TimeTool;

import javax.transaction.Transactional;

@Service
public class SoundbookServiceImpl implements SoundbookService {

    @Autowired
    private SoundbookDao soundbookDao;

    @Autowired
    private TextAudioDao textAudioDao;

    @Override
    @Transactional
    public Object modifyName(String username, int bookid, String name) {
        Soundbook book=soundbookDao.findByBookid(bookid);
        if(book==null)
            return PackTool.pack("fail", "have no this book");
        if(book.getCreater().getUsername().equals(username)){
            book.setName(name);
            soundbookDao.save(book);
            return PackTool.pack("ok", name);
        }
        return PackTool.pack("fail", "this book isnot yours");
    }

    @Override
    @Transactional
    public Object deleteBook(String username, int bookid) {
        Soundbook book=soundbookDao.findByBookid(bookid);
        if(book==null)
            return PackTool.pack("fail", "have no this book");
        if(book.getCreater().getUsername().equals(username)){
            soundbookDao.deleteBook(bookid);
            textAudioDao.deleteByBookid(bookid);
            return PackTool.pack("ok", bookid);
        }
        return PackTool.pack("fail", "this book isnot yours");
    }

    @Override
    @Transactional
    public Object share(String username, int bookid) {
        Soundbook book=soundbookDao.findByBookid(bookid);
        if(book==null)
            return PackTool.pack("fail", "have no this book");
        if(!book.getCreater().getUsername().equals(username))
            return PackTool.pack("fail", "this book isnot yours");
        if(book.getDisabled().compareTo(TimeTool.now())>0)
            return PackTool.pack("fail", "book disabled");
        if(book.getReleasetime()==null)
            book.setReleasetime(TimeTool.now());
        else
            book.setReleasetime(null);
        soundbookDao.save(book);
        return PackTool.pack("ok", bookid);
    }
}
