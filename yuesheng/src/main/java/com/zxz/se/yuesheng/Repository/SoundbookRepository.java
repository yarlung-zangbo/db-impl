package com.zxz.se.yuesheng.Repository;

import com.zxz.se.yuesheng.Entity.Soundbook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SoundbookRepository extends JpaRepository<Soundbook, Integer> {
    public Soundbook deleteByBookId(int bookId);
    public List<Soundbook> findByNameContaining(String name);
    public List<Soundbook> findByRealeaseLessThanAndNameContaining(String time, String name);
}
