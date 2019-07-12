package yuesheng.login.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.login.Dao.UserDao;
import yuesheng.login.Entity.User;
import yuesheng.login.Service.UserService;
import yuesheng.login.tool.PackTool;
import yuesheng.login.tool.TimeTool;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private MailService mailService;

    @Override
    public User getUserMessage(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public Object checkUser(String username) {
        System.out.println(username);
        User user=userDao.findByUsername(username);
        if(user==null){
            return PackTool.pack("fail", "user not found");
        }else {
            if(user.getRegistertime()==null){
                return PackTool.pack("fail", "user not activated");
            }
            if(user.getDisabled()!=null && user.getDisabled().compareTo(TimeTool.now())>0){
                return PackTool.pack("fail", "user is disabled");
            }
            return PackTool.pack("fail", "password wrong");
        }
    }

    @Override
    @Transactional
    public Object register(String username, String email, String password, String confirmPassword) {
        if(username.trim().equals(""))
            return PackTool.pack("fail", "username cannot be null");
        if(password.trim().equals(""))
            return PackTool.pack("fail", "password cannot be null");
        if(!email.matches("\\w+@\\w+(\\.\\w{2,3})*\\.\\w{2,3}"))
            return PackTool.pack("fail", "invalid email format");
        if(!password.equals(confirmPassword))
            return PackTool.pack("fail", "different password");
        if(userDao.findByUsername(username)!=null){
            return PackTool.pack("fail", username+" has been registered");
        }
        userDao.addUser(username, password, email);
        mailService.sendMail(email, username);
        return PackTool.pack("ok", "check emial to activate account");
    }

    @Override
    public Object activate(String username) {
        User user=userDao.findByUsername(username);
        if(user==null)return PackTool.pack("fail", username+" not exist");
        if(user.getRegistertime()==null){
            user.setRegistertime(TimeTool.now());
            userDao.save(user);
        }
        return PackTool.pack("ok", username);
    }
}
