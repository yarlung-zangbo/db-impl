package com.zxz.se.yuesheng.DaoImpl;

import com.zxz.se.yuesheng.Dao.SoundbookDao;
import com.zxz.se.yuesheng.Entity.Soundbook;
import com.zxz.se.yuesheng.Repository.SoundbookRepository;
import com.zxz.se.yuesheng.tool.TimeTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SoundbookDaoImpl implements SoundbookDao {

    @Autowired
    SoundbookRepository soundbookRepository;

    @Override
    public Soundbook save(Soundbook soundbook) {
        return soundbookRepository.saveAndFlush(soundbook);
    }

    @Override
    public Soundbook deleteByBookId(int bookId) {
        Soundbook book=soundbookRepository.deleteByBookId(bookId);
        soundbookRepository.flush();
        return book;
    }

    @Override
    public List<Soundbook> findByName(String name) {
        return soundbookRepository.findByNameContaining(name);
    }

    @Override
    public List<Soundbook> findAll() {
        return soundbookRepository.findAll();
    }

    @Override
    public List<Soundbook> findReleasedBookByName(String name) {
        return soundbookRepository.findByRealeaseLessThanAndNameContaining(TimeTool.now(), name);
    }
}
