package yuesheng.login.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import yuesheng.login.Service.UserService;
import yuesheng.login.ServiceImpl.MailService;
import yuesheng.login.tool.PackTool;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/authentication/require")
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Object requireAuthentication(){
        return PackTool.pack("fail", "not login");
    }

    @RequestMapping(value="/loginError")
    public Object loginError(HttpServletRequest request){
        return userService.checkUser(request.getParameter("username"));
    }

    @RequestMapping(value="/userMessage")
    public Object userMessage(HttpServletRequest request){
        String username=request.getRemoteUser();
        System.out.println(username);
        return PackTool.pack("ok", userService.getUserMessage(username));
    }

    @GetMapping(value="/isLogin")
    public Object isLogin(HttpServletRequest request){
        return PackTool.pack("ok", request.getRemoteUser());
    }

    @PostMapping(value="/register")
    public Object register(HttpServletRequest request){
        String username=request.getParameter("username");
        String password=request.getParameter("password");
        String confirmPassword=request.getParameter("confirmPassword");
        String email=request.getParameter("email");
        return userService.register(username, email, password, confirmPassword);
    }

    @RequestMapping("/activate")
    public Object activate(String username){
        return userService.activate(username);
    }

    @PostMapping("/modifyName")
    public Object modifyName(HttpServletRequest request){
        String username=request.getRemoteUser();
        String name=request.getParameter("name");
        return userService.modifyName(username, name);
    }

    @PostMapping("/modifyGender")
    public Object modifyGender(HttpServletRequest request){
        String username=request.getRemoteUser();
        int gender=Integer.valueOf(request.getParameter("gender"));
        return userService.modifyGender(username, gender);
    }

    @PostMapping("/modifyPassword")
    public Object modifyPassword(HttpServletRequest request){
        String username=request.getRemoteUser();
        String oldPassword=request.getParameter("oldPassword");
        String newPassword=request.getParameter("newPassword");
        String confirmPassword=request.getParameter("confirmPassword");
        return userService.modifyPassword(username, oldPassword, newPassword, confirmPassword);
    }

    @PostMapping("/modifyEmail")
    public Object modifyEmail(HttpServletRequest request){
        String username=request.getRemoteUser();
        String email=request.getParameter("email");
        return userService.modifyEmail(username, email);
    }

    @RequestMapping("/confirmModifyEmail")
    public Object confirmModify(String username){
        return userService.confirmModifyEmail(username);
    }
}
