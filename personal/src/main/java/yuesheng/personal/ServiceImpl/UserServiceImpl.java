package yuesheng.personal.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import yuesheng.personal.Dao.UserDao;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Entity.User;
import yuesheng.personal.Service.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<Soundbook> getSelfBooks(String username) {
        User user=userDao.findByUsername(username);
        return user.getSelfBooks();
    }

    @Override
    public List<Soundbook> getFavorite(String username) {
        User user=userDao.findByUsername(username);
        return user.getFavorite();
    }
}
