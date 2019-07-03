package com.zxz.se.yuesheng.Repository;

import com.zxz.se.yuesheng.Entity.Soundbook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SoundbookRepository extends JpaRepository<Soundbook, Integer> {
    public Soundbook deleteByBookId(int bookId);
}
