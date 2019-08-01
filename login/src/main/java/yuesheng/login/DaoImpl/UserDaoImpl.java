package yuesheng.login.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.login.Dao.UserDao;
import yuesheng.login.Entity.User;
import yuesheng.login.Repository.UserRepository;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User save(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public void addUser(String username, String name, String password, String email) {
        userRepository.insertUser(username, name, password, email);
    }
}
