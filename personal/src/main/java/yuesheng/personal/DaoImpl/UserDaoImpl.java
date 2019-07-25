package yuesheng.personal.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.personal.Dao.UserDao;
import yuesheng.personal.Entity.User;
import yuesheng.personal.Repository.UserRepository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User save(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public Integer checkFavorite(int bookid, String username) {
        return userRepository.checkFavorite(bookid, username);
    }

}
