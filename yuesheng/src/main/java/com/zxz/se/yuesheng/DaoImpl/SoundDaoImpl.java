package com.zxz.se.yuesheng.DaoImpl;

import com.zxz.se.yuesheng.Dao.SoundDao;
import com.zxz.se.yuesheng.Entity.Sound;
import com.zxz.se.yuesheng.Repository.SoundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class SoundDaoImpl implements SoundDao {

    @Autowired
    private SoundRepository soundRepository;

    @Override
    public Sound findByName(String name) {
        return soundRepository.findByName(name);
    }

    @Override
    public void insertSound(Sound sound) {
        soundRepository.insert(sound);
    }
}
