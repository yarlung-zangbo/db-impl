package yuesheng.share.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.share.Dao.UserDao;
import yuesheng.share.Entity.Comment;
import yuesheng.share.Entity.User;
import yuesheng.share.Service.UserService;
import yuesheng.share.Tool.PackTool;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<User> getAllUser() {
        return userDao.findAllUser();
    }

    @Override
    public Object getComments(String username) {
        User user=userDao.findByUsername(username);
        List<Comment> comments=user.getCommentRecord();
        return PackTool.pack("ok", comments);
    }


}
