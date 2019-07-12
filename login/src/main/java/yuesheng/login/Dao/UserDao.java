package yuesheng.login.Dao;
import yuesheng.login.Entity.User;

import java.util.List;

public interface UserDao {
    public User save(User user);
    public User findByUsername(String username) ;
    public void addUser(String username, String password, String email);
}
