package yuesheng.share.Dao;


import yuesheng.share.Entity.Soundbook;

import java.util.List;

public interface SoundbookDao {
    public Soundbook findByBookid(int bookid);
    public List<Soundbook> findReleasedBookByName(String name);
    public List<Soundbook> findAll();
}
