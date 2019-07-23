package yuesheng.personal.Service;

import yuesheng.personal.Entity.Listen;
import yuesheng.personal.Entity.Soundbook;
import yuesheng.personal.Entity.User;

import java.util.List;

public interface UserService {
    Object getSelfBooks(String username);
    Object getFavorite(String username);
    Object getListenRecorde(String username);
    Object findSelfBook(String username, String name);
    Object findFavorite(String username, String name);
    Object favorite(String username, int bookid);
    Object unFavorite(String username, int bookid);
}
