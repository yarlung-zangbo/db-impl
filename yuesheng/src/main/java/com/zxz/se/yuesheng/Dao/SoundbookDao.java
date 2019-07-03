package com.zxz.se.yuesheng.Dao;

import com.zxz.se.yuesheng.Entity.Soundbook;

public interface SoundbookDao {
    public Soundbook save(Soundbook soundbook);
    public Soundbook deleteByBookId(int bookId);
}
