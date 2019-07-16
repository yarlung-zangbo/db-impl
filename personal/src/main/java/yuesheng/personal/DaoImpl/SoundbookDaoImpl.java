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
    public Soundbook deleteByBookId(int bookId) {
        Soundbook book=soundbookRepository.deleteByBookId(bookId);
        soundbookRepository.flush();
        return book;
    }

    @Override
    public List<Soundbook> findByName(String name) {
        return soundbookRepository.findByNameContaining(name);
    }
}
