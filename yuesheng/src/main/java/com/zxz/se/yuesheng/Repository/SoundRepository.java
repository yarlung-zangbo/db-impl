package com.zxz.se.yuesheng.Repository;

import com.zxz.se.yuesheng.Entity.Sound;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SoundRepository extends MongoRepository<Sound, String> {
    public Sound findByName(String name);
}
