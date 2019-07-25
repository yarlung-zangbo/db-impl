package yuesheng.personal.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import yuesheng.personal.Entity.User;

public interface UserRepository  extends JpaRepository<User, String> {
    public User findByUsername(String username);

    @Query(value="select bookid From favorite where bookid=?1 and username=?2",nativeQuery = true)
    public Integer checkFavorite(int bookid, String username);
}
