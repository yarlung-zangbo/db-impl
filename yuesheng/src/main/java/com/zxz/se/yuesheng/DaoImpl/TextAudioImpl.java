package com.zxz.se.yuesheng.DaoImpl;


import com.zxz.se.yuesheng.Dao.TextAudioDao;
import com.zxz.se.yuesheng.Entity.TextAudio;
import com.zxz.se.yuesheng.Repository.TextAudioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TextAudioImpl implements TextAudioDao {

    @Autowired
    private TextAudioRepository textAudioRepository;

    @Override
    public TextAudio save(TextAudio textAudio) {
        return textAudioRepository.insert(textAudio);
    }

    @Override
    public TextAudio findByBookId(int bookId) {
        return textAudioRepository.findByBookId(bookId);
    }

    @Override
    public TextAudio deleteByBookId(int bookId) {
        return textAudioRepository.deleteByBookId(bookId);
    }
}
