package yuesheng.personal.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.personal.Dao.SoundbookDao;
import yuesheng.personal.Dao.TextAudioDao;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Entity.TextAudio;
import yuesheng.personal.Service.TextAudioService;
import yuesheng.personal.tool.PackTool;
import yuesheng.personal.tool.TimeTool;

@Service
public class TextAudioServiceImpl implements TextAudioService {

    @Autowired
    private TextAudioDao textAudioDao;

    @Autowired
    private SoundbookDao soundbookDao;

    @Override
    public Object getTextAudio(int bookid) {
        Soundbook book=soundbookDao.findByBookid(bookid);
        TextAudio textAudio=textAudioDao.findByBookid(bookid);
        if(book==null || textAudio==null)
            return PackTool.pack("fail", "have no this book");
        if(book.getDisabled().compareTo(TimeTool.now())>0)
            return PackTool.pack("fail", "book disabled");
        return PackTool.pack("ok", textAudio);
    }
}
