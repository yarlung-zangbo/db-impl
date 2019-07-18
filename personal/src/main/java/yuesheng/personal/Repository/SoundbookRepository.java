package yuesheng.personal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import yuesheng.personal.Entity.Soundbook;

import javax.transaction.Transactional;


public interface SoundbookRepository extends JpaRepository<Soundbook, Integer> {
    @Modifying
    @Transactional
    @Query(value = "delete from soundbook where bookid = ?1",nativeQuery = true)
    public void delete(int bookid);

    public Soundbook findByBookid(int bookid);
}
