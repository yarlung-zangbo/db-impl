package yuesheng.login.Service;
import yuesheng.login.Entity.User;

import java.util.List;

public interface UserService {
    public User getUserMessage(String username);
    public Object checkUser(String username);
    public Object register(String username, String email, String password, String confirmPassword);
    public Object activate(String username);
    public Object modifyName(String username, String name);
    public Object modifyGender(String username, int gender);
    public Object modifyPassword(String username, String oldPassword, String newPassword, String confirmPassword);
    public Object modifyEmail(String username, String email);
    public Object confirmModifyEmail(String username);
}
