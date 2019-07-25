package yuesheng.personal.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yuesheng.personal.Service.SoundbookService;
import yuesheng.personal.Service.UserService;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(allowCredentials = "true")
public class PersonalController {

    @Autowired
    private UserService userService;

    @Autowired
    private SoundbookService soundbookService;

    @GetMapping("/getSelfBooks")
    public Object getSelfBooks(String username){
        return userService.getSelfBooks(username);
    }

    @GetMapping("/getFavorite")
    public Object getFavotite(String username){
        return userService.getFavorite(username);
    }

    @GetMapping("/getListenRecord")
    public Object getListenRecord(String username){
        return userService.getListenRecorde(username);
    }

    @PostMapping("/modifyName")
    public Object modifyName(String username, int bookid, String name, HttpServletRequest request){
        return soundbookService.modifyName(username, bookid, name);
    }

    @PostMapping("/deleteBook")
    public Object deleteBook(String username, int bookid){
        return soundbookService.deleteBook(username, bookid);
    }

    @GetMapping("/findSelfBook")
    public Object findSelfBook(String username, String name){
        return userService.findSelfBook(username, name);
    }

    @GetMapping("/findFavorite")
    public Object findFavorite(String username, String name){
        return userService.findFavorite(username, name);
    }

    @PostMapping("/favorite")
    public Object favorite(String username, int bookid){
        return userService.favorite(username, bookid);
    }

    @PostMapping("/unFavorite")
    public Object unFavorite(String username, int bookid){
        return userService.unFavorite(username, bookid);
    }

    @GetMapping("/checkFavorite")
    public Object checkFavorite(String username, int bookid){
        return userService.checkFavorite(bookid, username);
    }
}
