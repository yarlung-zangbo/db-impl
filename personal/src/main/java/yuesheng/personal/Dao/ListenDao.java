package yuesheng.personal.Dao;

import yuesheng.personal.Entity.Listen;

public interface ListenDao {
    public Listen save(Listen listen);

    public void delete(int listenid);

    public Listen findByListenid(int listenid);
}
