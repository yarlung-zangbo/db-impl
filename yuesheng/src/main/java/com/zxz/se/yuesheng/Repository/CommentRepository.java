package com.zxz.se.yuesheng.Repository;

import com.zxz.se.yuesheng.Entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
