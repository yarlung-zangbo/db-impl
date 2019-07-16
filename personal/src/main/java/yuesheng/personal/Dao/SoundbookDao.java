package yuesheng.personal.Dao;

import yuesheng.personal.Entity.Soundbook;

import java.util.List;

public interface SoundbookDao {
    public Soundbook save(Soundbook soundbook);
    public Soundbook deleteByBookId(int bookId);
    public List<Soundbook> findByName(String name);
}
