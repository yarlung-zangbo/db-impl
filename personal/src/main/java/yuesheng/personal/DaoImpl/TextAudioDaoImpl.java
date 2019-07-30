package yuesheng.personal.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.personal.Dao.TextAudioDao;
import yuesheng.personal.Entity.TextAudio;
import yuesheng.personal.Repository.TextAudioRepository;

@Repository
public class TextAudioDaoImpl implements TextAudioDao {

    @Autowired
    private TextAudioRepository textAudioRepository;

    @Override
    public TextAudio findByBookid(int bookid) {
        return textAudioRepository.findByBookId(bookid);
    }

    @Override
    public int deleteByBookid(int bookid) {
        textAudioRepository.deleteByBookId(bookid);
        return bookid;
    }
}
