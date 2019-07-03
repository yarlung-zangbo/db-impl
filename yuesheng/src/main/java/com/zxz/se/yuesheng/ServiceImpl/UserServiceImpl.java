package com.zxz.se.yuesheng.ServiceImpl;

import com.zxz.se.yuesheng.Dao.UserDao;
import com.zxz.se.yuesheng.Entity.User;
import com.zxz.se.yuesheng.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<User> getAllUser() {
        return userDao.findAllUser();
    }
}
