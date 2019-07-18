package yuesheng.login.Service;

import yuesheng.login.Entity.User;

public interface UserService {
    User getUserMessage(String username);

    Object checkUser(String username);

    Object register(String username, String email, String password, String confirmPassword);

    Object activate(String username);

    Object modifyName(String username, String name);

    Object modifyGender(String username, int gender);

    Object modifyPassword(String username, String oldPassword, String newPassword, String confirmPassword);

    Object modifyEmail(String username, String email);

    Object confirmModifyEmail(String username);
}
