package yuesheng.share.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.share.Dao.UserDao;
import yuesheng.share.Entity.User;
import yuesheng.share.Repository.UserRepository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UserRepository userRepository;

    /* Test */
    @Override
    public List<User> findAllUser() {
        return userRepository.findAll();
    }
    /* Test */

    @Override
    public User findByUsername(String userName) {
        return userRepository.getOne(userName);
    }
}
