package yuesheng.personal.Dao;

import yuesheng.personal.Entity.User;

import java.util.List;

public interface UserDao {
    public User findByUsername(String username);
    public User save(User user);
    public Integer checkFavorite(int bookid, String username);
}
