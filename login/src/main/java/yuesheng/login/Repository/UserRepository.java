package yuesheng.login.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import yuesheng.login.Entity.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsername(String username);

    @Modifying
    @Query(value = "insert user(username, password, email) values(?1, ?2, ?3)", nativeQuery = true)
    void insertUser(String username, String passwrod, String email);
}
