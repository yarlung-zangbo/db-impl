package yuesheng.personal.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Service.UserService;

import java.util.List;

@RestController
@CrossOrigin(allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getSelfBooks")
    public List<Soundbook> getSelfBooks(String username){
        return userService.getSelfBooks(username);
    }

    @GetMapping("/getFavorite")
    public List<Soundbook> getFavotite(String username){
        return userService.getFavorite(username);
    }
}
