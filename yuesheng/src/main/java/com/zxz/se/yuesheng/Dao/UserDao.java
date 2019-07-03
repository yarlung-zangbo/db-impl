package com.zxz.se.yuesheng.Dao;

import com.zxz.se.yuesheng.Entity.User;

import java.util.List;

public interface UserDao {
    /* Test */
    public List<User> findAllUser();
    /* Test */

    public User save(User user);
    public User findByUsername(String userName);
}
