package yuesheng.personal.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.personal.Dao.ListenDao;
import yuesheng.personal.Entity.Listen;
import yuesheng.personal.Repository.ListenRepository;

@Repository
public class ListenDaoImpl implements ListenDao {

    @Autowired
    private ListenRepository listenRepository;

    @Override
    public Listen save(Listen listen) {
        return listenRepository.saveAndFlush(listen);
    }

    @Override
    public void delete(int listenid) {
        listenRepository.delete(listenid);
    }

    @Override
    public Listen findByListenid(int listenid) {
        return listenRepository.findByListenid(listenid);
    }


}
