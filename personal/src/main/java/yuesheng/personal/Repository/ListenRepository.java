package yuesheng.personal.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import yuesheng.personal.Entity.Listen;

public interface ListenRepository extends JpaRepository<Listen, Integer> {

    @Modifying
    @Query(value = "delete from listen where listenid = ?1",nativeQuery = true)
    public void delete(int listenid);

    public Listen findByListenid(int listenid);
}
