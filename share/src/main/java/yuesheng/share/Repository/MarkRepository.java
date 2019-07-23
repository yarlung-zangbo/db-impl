package yuesheng.share.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import yuesheng.share.Entity.Mark;
import yuesheng.share.Entity.Soundbook;
import yuesheng.share.Entity.User;

public interface MarkRepository extends JpaRepository<Mark, Integer> {
    public Mark findByUserAndSoundbook(User user, Soundbook book);

    @Query(value="select avg(score) from mark where bookid=?1", nativeQuery = true)
    public float caculateMark(int bookid);
}
