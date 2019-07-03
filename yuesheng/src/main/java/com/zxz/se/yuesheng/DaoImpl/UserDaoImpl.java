package com.zxz.se.yuesheng.DaoImpl;

import com.zxz.se.yuesheng.Dao.UserDao;
import com.zxz.se.yuesheng.Entity.User;
import com.zxz.se.yuesheng.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
    public User save(User user) {
        return userRepository.saveAndFlush(user);
    }

    @Override
    public User findByUsername(String userName) {
        return userRepository.getOne(userName);
    }
}
