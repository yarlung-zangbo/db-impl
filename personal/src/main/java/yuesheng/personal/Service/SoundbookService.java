package yuesheng.personal.Service;

import org.springframework.stereotype.Service;
import yuesheng.personal.Entity.Soundbook;

import java.util.List;

@Service
public interface SoundbookService {
    public Object modifyName(String username, int bookid, String name);
    public Object deleteBook(String username, int bookid);
}
