package yuesheng.personal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yuesheng.personal.Entity.Soundbook;

import java.util.List;

public interface SoundbookRepository extends JpaRepository<Soundbook, Integer> {
    public Soundbook deleteByBookId(int bookId);
    public List<Soundbook> findByNameContaining(String name);
}
