package com.zxz.se.yuesheng.ServiceImpl;

import com.zxz.se.yuesheng.Dao.SoundDao;
import com.zxz.se.yuesheng.Entity.Sound;
import com.zxz.se.yuesheng.Service.SoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

@Service
public class SoundServiceImpl implements SoundService {

    @Autowired
    private SoundDao soundDao;

    @Override
    public Sound findSound(String name) {
        return soundDao.findByName(name);
    }

    @Override
    public void initSound() throws IOException {
        String url="D:/gitRepo/se/db-impl/yuesheng/src/main/resources/static/sound/";
        String[] name={"风铃", "钟声"};
        for(int i=0;i<2;i++){
            String urli=url+i+".mp3";
            InputStream inStream=new FileInputStream(urli);
            byte[] contents=inStream.readAllBytes();
            System.out.println(new String(contents));
            Sound sound=new Sound();
            sound.setName(name[i]);
            sound.setContent(contents);
            soundDao.insertSound(sound);
        }
    }
}
