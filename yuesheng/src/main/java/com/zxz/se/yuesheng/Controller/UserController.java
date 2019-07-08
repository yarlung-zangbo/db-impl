package com.zxz.se.yuesheng.Controller;

import com.zxz.se.yuesheng.Entity.User;
import com.zxz.se.yuesheng.Service.SoundService;
import com.zxz.se.yuesheng.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
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

    /*
    @GetMapping(value="/initSound")
    public void initSound(){
        try {
            soundService.initSound();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    */

    /**
     *
     * @param file
     * @return
     */
    @RequestMapping("/uploadSound")
    @ResponseBody
    public Object uploadImage(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        if (!file.isEmpty()) {
            try {
                byte [] content=file.getBytes();
                String name=(String)request.getParameter("name");
                soundService.saveSound(name, content);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                return "fail";
            } catch (IOException e) {
                e.printStackTrace();
                return "fail";
            }
            return "{\"status\": \"ok\"}";
        } else {
            return "{\"status\": \"fail\", \"values\": \"empty file!\"}";
        }
    }
    /* Test */



}
