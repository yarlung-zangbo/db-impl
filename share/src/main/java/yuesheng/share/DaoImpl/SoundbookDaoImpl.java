package yuesheng.share.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.share.Dao.SoundbookDao;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Repository.SoundbookRepository;
import yuesheng.share.Tool.TimeTool;

import java.util.List;

@Repository
public class SoundbookDaoImpl implements SoundbookDao {

    @Autowired
    SoundbookRepository soundbookRepository;

    @Override
    public Soundbook findByBookid(int bookid) {
        return soundbookRepository.findByBookid(bookid);
    }

    @Override
    public List<Soundbook> findReleasedBookByName(String name) {
        return soundbookRepository.findByReleasetimeLessThanAndNameContaining(TimeTool.now(), name);
    }
}
