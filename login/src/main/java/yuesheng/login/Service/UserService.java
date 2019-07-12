package yuesheng.login.Service;
import yuesheng.login.Entity.User;

import java.util.List;

public interface UserService {
    public User getUserMessage(String username);
    public Object checkUser(String username);
    public Object register(String username, String email, String password, String confirmPassword);
    public Object activate(String username);
}
