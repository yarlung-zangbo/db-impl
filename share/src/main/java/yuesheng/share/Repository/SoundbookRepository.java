package yuesheng.share.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import yuesheng.share.Entity.Soundbook;

import java.util.List;

public interface SoundbookRepository extends JpaRepository<Soundbook, Integer> {
    public Soundbook findByBookid(int bookid);
    public List<Soundbook> findByReleasetimeLessThanAndNameContaining(String time, String name);
}
