package com.zxz.se.yuesheng.Dao;

import com.zxz.se.yuesheng.Entity.Sound;

public interface SoundDao {
    public Sound findByName(String name);
    public void insertSound(Sound sounc);
}
