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

    @Autowired
    private MailService mailService;

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
        return userService.getUserMessage(username);
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

}
