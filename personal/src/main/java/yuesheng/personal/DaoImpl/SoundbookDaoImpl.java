package yuesheng.personal.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.personal.Dao.SoundbookDao;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Repository.SoundbookRepository;

import java.util.List;

@Repository
public class SoundbookDaoImpl implements SoundbookDao {

    @Autowired
    SoundbookRepository soundbookRepository;

    @Override
    public Soundbook save(Soundbook soundbook) {
        return soundbookRepository.saveAndFlush(soundbook);
    }

    @Override
    public Soundbook findByBookid(int bookid) {
        return soundbookRepository.findByBookid(bookid);
    }

    @Override
    public void deleteBook(int bookid) {
        soundbookRepository.delete(bookid);
    }
}
