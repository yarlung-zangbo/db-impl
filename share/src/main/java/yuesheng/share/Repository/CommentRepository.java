package yuesheng.share.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yuesheng.share.Entity.Comment;


public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
