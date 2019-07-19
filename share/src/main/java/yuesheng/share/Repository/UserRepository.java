package yuesheng.share.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yuesheng.share.Entity.User;

public interface UserRepository  extends JpaRepository<User, String> {
    public User findByUsername(String userName);
}
