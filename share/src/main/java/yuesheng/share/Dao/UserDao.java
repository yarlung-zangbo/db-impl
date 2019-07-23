package yuesheng.share.Dao;

import yuesheng.share.Entity.User;

import java.util.List;

public interface UserDao {
    /* Test */
    public List<User> findAllUser();
    /* Test */
    public User findByUsername(String userName);
}
