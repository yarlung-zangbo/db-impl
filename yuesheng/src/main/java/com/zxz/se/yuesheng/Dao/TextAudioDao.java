package com.zxz.se.yuesheng.Dao;

import com.zxz.se.yuesheng.Entity.TextAudio;

public interface TextAudioDao {
    public TextAudio save(TextAudio textAndAudio);
    public TextAudio findByBookId(int bookId);
    public TextAudio deleteByBookId(int bookId);
}

