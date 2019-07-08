package com.zxz.se.yuesheng.Dao;

import com.zxz.se.yuesheng.Entity.Soundbook;

import java.util.List;

public interface SoundbookDao {
    public Soundbook save(Soundbook soundbook);
    public Soundbook deleteByBookId(int bookId);
    public List<Soundbook> findByName(String name);
    public List<Soundbook> findAll();
    public List<Soundbook> findReleasedBookByName(String Name);
}
