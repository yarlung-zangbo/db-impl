package com.zxz.se.yuesheng.Controller;

import com.zxz.se.yuesheng.Entity.User;
import com.zxz.se.yuesheng.Service.SoundService;
import com.zxz.se.yuesheng.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Basic;
import javax.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin(allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SoundService soundService;

    /* Test */
    @CrossOrigin
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


    /**
     *
     * @param file
     * @return
     */
    @RequestMapping("/upload")
    @ResponseBody
    public Object upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {

        System.out.println("upload file");
        if (!file.isEmpty()) {
            try {
                String ret="name: "+file.getOriginalFilename();
                ret+="\ntype: "+file.getContentType();
                ret+="\nsize: "+file.getSize();
                System.out.println(ret);
                System.out.println(new String(file.getBytes(), "utf-8"));
                return "OK: \n"+ret;
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                return "fail";
            } catch (IOException e) {
                e.printStackTrace();
                return "fail";
            }
        } else {
            return "{\"status\": \"fail\", \"values\": \"empty file!\"}";
        }
    }

    /* Test */



}
