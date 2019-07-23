package yuesheng.share.Dao;

import yuesheng.share.Entity.Mark;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Entity.User;

public interface MarkDao {
    public Mark getMark(User user, Soundbook book);
    public Mark save(Mark mark);
    public float caculateMark(int bookid);
}
