package com.zxz.se.yuesheng.Repository;

import com.zxz.se.yuesheng.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, String> {
    public User findByUserName(String userName);
}
