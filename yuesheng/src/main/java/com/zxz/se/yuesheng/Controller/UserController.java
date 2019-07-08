package com.zxz.se.yuesheng.Controller;

import com.zxz.se.yuesheng.Entity.User;
import com.zxz.se.yuesheng.Service.SoundService;
import com.zxz.se.yuesheng.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SoundService soundService;

    /* Test */
    @GetMapping(value="/getAllUser")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    @GetMapping(value="/initSound")
    public void initSound(){
        try {
            soundService.initSound();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /* Test */



}
