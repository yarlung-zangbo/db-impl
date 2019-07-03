package com.zxz.se.yuesheng.DaoImpl;

import com.zxz.se.yuesheng.Dao.ListenDao;
import com.zxz.se.yuesheng.Entity.Listen;
import com.zxz.se.yuesheng.Repository.ListenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ListenDaoImpl implements ListenDao {

    @Autowired
    private ListenRepository listenRepository;

    @Override
    public Listen save(Listen listen) {
        return listenRepository.saveAndFlush(listen);
    }
}
