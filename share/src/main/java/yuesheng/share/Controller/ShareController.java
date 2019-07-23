package yuesheng.share.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import yuesheng.share.Entity.Comment;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Entity.User;
import yuesheng.share.Service.CommentService;
import yuesheng.share.Service.MarkService;
import yuesheng.share.Service.SoundbookService;
import yuesheng.share.Service.UserService;

import java.util.List;

@RestController
@CrossOrigin(allowCredentials = "true")
public class ShareController {

    @Autowired
    private UserService userService;

    @Autowired
    private SoundbookService soundbookService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private MarkService markService;

    /* Test */
    @GetMapping(value="/getAllUser")
    public List<User> getAllUser(){
        return userService.getAllUser();
    }

    /* Test */

    @GetMapping(value="/getBook")
    public Object getBook(String username, int bookid){
        return soundbookService.findByBookid(username, bookid);
    }

    @GetMapping(value="/getComment")
    public Object getComment(int bookid){
        return soundbookService.getComment(bookid);
    }

    @PostMapping("/comment")
    public Object addComment(String username, int bookid, String content){
        return commentService.addComment(username, bookid, content);
    }

    @PostMapping("/mark")
    public Object mark(String username, int bookid, int score){
        return markService.mark(username, bookid, score);
    }

}
