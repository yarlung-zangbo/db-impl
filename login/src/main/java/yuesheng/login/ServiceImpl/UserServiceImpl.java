package yuesheng.login.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import yuesheng.login.Dao.UserDao;
import yuesheng.login.Entity.User;
import yuesheng.login.Service.UserService;
import yuesheng.login.tool.PackTool;
import yuesheng.login.tool.TimeTool;

import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private MailService mailService;

    @Value("${yuesheng.login.server}")
    private String server;

    @Value("${yuesheng.email.activateMailSubject}")
    private String activateSubject;

    @Value("${yuesheng.email.activateMailContent}")
    private String activateContent;

    @Value("${yuesheng.email.modifyMailSubject}")
    private String modifySubject;

    @Value("${yuesheng.email.modifyMailContent}")
    private String modifyContent;


    @Override
    public User getUserMessage(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public Object checkUser(String username) {
        System.out.println(username);
        User user = userDao.findByUsername(username);
        if (user == null) {
            return PackTool.pack("fail", "user not found");
        } else {
            if (user.getRegistertime() == null) {
                return PackTool.pack("fail", "user not activated");
            }
            if (user.getDisabled() != null && user.getDisabled().compareTo(TimeTool.now()) > 0) {
                return PackTool.pack("fail", "user is disabled");
            }
            return PackTool.pack("fail", "password wrong");
        }
    }

    @Override
    @Transactional
    public Object register(String username, String email, String password, String confirmPassword) {
        if (username.trim().equals(""))
            return PackTool.pack("fail", "username cannot be null");
        if (password.trim().equals(""))
            return PackTool.pack("fail", "password cannot be null");
        if (!email.matches("\\w+@\\w+(\\.\\w{2,3})*\\.\\w{2,3}"))
            return PackTool.pack("fail", "invalid email format");
        if (!password.equals(confirmPassword))
            return PackTool.pack("fail", "different password");
        if (userDao.findByUsername(username) != null) {
            return PackTool.pack("fail", username + " has been registered");
        }
        userDao.addUser(username, username, password, email);
        String con = "<p>" + this.activateContent + " <br />" + "<a href='" + this.server + "activate?username=" + username + "'>activate</a></p>";
        mailService.setContent(con);
        mailService.setSubject(this.activateSubject);
        try {
            mailService.sendMail(email, username);
            return PackTool.pack("ok", "check emial to activate account");
        } catch (Exception err) {
            err.printStackTrace();
            return PackTool.pack("fail", "send email fail");
        }
    }

    @Override
    @Transactional
    public Object activate(String username) {
        User user = userDao.findByUsername(username);
        if (user == null) return PackTool.pack("fail", username + " not exist");
        if (user.getRegistertime() == null) {
            user.setRegistertime(TimeTool.now());
            userDao.save(user);
        }
        return PackTool.pack("ok", username);
    }

    @Override
    @Transactional
    public Object modifyName(String username, String name) {
        User user = userDao.findByUsername(username);
        user.setName(name);
        userDao.save(user);
        return PackTool.pack("ok", name);
    }

    @Override
    @Transactional
    public Object modifyGender(String username, int gender) {
        if (gender > 3)
            return PackTool.pack("fail", gender);

        User user = userDao.findByUsername(username);
        user.setGender(gender);
        userDao.save(user);
        return PackTool.pack("ok", gender);
    }

    @Override
    @Transactional
    public Object modifyPassword(String username, String oldPassword, String newPassword, String confirmPassword) {
        User user = userDao.findByUsername(username);
        String password = user.getPassword();
        if (!password.equals(oldPassword)) return PackTool.pack("fail", "old password wrong");
        if (newPassword == null || newPassword.trim().equals(""))
            return PackTool.pack("fail", "password cannot be null");
        if (!newPassword.equals(confirmPassword)) return PackTool.pack("fail", "different password");
        user.setPassword(newPassword);
        userDao.save(user);
        return PackTool.pack("ok", "modify password successfully");
    }

    @Override
    @Transactional
    public Object modifyEmail(String username, String email) {
        if (!email.matches("\\w+@\\w+(\\.\\w{2,3})*\\.\\w{2,3}"))
            return PackTool.pack("fail", "invalid email format");
        User user = userDao.findByUsername(username);
        String con = "<p>" + this.activateContent + " <br />" + "<a href='" + this.server + "confirmModifyEmail?username=" + username + "'>modify</a></p>";
        mailService.setSubject(this.modifySubject);
        mailService.setContent(con);
        try {
            mailService.sendMail(email, username);
            user.setModifyemail(email);
            userDao.save(user);
            return PackTool.pack("ok", "check email to modify email");
        } catch (Exception err) {
            err.printStackTrace();
            return PackTool.pack("fail", "send email fail");
        }
    }

    @Override
    public Object confirmModifyEmail(String username) {
        User user = userDao.findByUsername(username);
        if (user.getModifyemail() != null) {
            user.setEmail(user.getModifyemail());
            userDao.save(user);
            return PackTool.pack("ok", user.getModifyemail());
        }
        return PackTool.pack("ok", user.getEmail());
    }


}
