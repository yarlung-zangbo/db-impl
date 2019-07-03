package com.zxz.se.yuesheng.Repository;

import com.zxz.se.yuesheng.Entity.TextAudio;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TextAudioRepository extends MongoRepository<TextAudio, String> {
    public TextAudio findByBookId(int bookId);
    public TextAudio deleteByBookId(int bookId);
}
