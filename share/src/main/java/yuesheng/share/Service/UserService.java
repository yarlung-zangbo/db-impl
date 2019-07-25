package yuesheng.share.Service;

import yuesheng.share.Entity.User;

import java.util.List;

public interface UserService {
    /* Test */
    public List<User> getAllUser();
    /* Test */

    public Object getComments(String username);
}
