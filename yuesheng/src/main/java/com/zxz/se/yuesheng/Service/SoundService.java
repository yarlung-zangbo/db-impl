package com.zxz.se.yuesheng.Service;

import com.zxz.se.yuesheng.Entity.Sound;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface SoundService {
    public Sound findSound(String name);
    /*
    public void initSound() throws IOException;
    */
    public void saveSound(String name, byte[] content);
}
