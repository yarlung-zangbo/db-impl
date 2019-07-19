package yuesheng.share.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.share.Dao.MarkDao;
import yuesheng.share.Entity.Mark;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Entity.User;
import yuesheng.share.Repository.MarkRepository;


@Repository
public class MarkDaoImpl implements MarkDao {

    @Autowired
    public MarkRepository markRepository;

    @Override
    public Mark getMark(User user, Soundbook book) {
        return markRepository.findByUserAndSoundbook(user, book);
    }

    @Override
    public Mark save(Mark mark) {
        return markRepository.saveAndFlush(mark);
    }

    @Override
    public float caculateMark(int bookid) {
        return markRepository.caculateMark(bookid);
    }
}
