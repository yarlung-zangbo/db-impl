package yuesheng.personal.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.personal.Dao.TextAudioDao;
import yuesheng.personal.Entity.TextAudio;
import yuesheng.personal.Service.TextAudioService;
import yuesheng.personal.tool.PackTool;

@Service
public class TextAudioServiceImpl implements TextAudioService {

    @Autowired
    private TextAudioDao textAudioDao;

    @Override
    public Object getTextAudio(int bookid) {
        TextAudio textAudio=textAudioDao.findByBookid(bookid);
        if(textAudio==null)
            return PackTool.pack("fail", bookid+", book not exist");
        return PackTool.pack("ok", textAudio);
    }
}
