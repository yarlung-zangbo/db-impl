package yuesheng.personal.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import yuesheng.personal.Entity.User;

public interface UserRepository  extends JpaRepository<User, String> {
    public User findByUsername(String username);
}
