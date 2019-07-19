package yuesheng.share.DaoImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import yuesheng.share.Dao.CommentDao;
import yuesheng.share.Entity.Comment;
import yuesheng.share.Repository.CommentRepository;

@Repository
public class CommentDaoImpl implements CommentDao {

    @Autowired
    private CommentRepository commentRepository;

    @Override
    public Comment save(Comment comment) {
        return commentRepository.saveAndFlush(comment);
    }
}
