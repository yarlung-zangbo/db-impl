package yuesheng.login.Dao;

import yuesheng.login.Entity.User;

public interface UserDao {
    User save(User user);

    User findByUsername(String username);

    void addUser(String username, String name, String password, String email);
}
