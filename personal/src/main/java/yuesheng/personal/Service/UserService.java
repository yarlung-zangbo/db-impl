package yuesheng.personal.Service;

import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Entity.User;

import java.util.List;

public interface UserService {
    List<Soundbook> getSelfBooks(String username);
    List<Soundbook> getFavorite(String username);
}
