package yuesheng.share.Entity;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import javax.xml.stream.events.Comment;
import java.util.List;

@Entity
@Table(name="user", schema="yuesheng", catalog="")
@JsonIgnoreProperties(value={"handler", "hibernateLazyInitializer", "fieldHandler",
       /* "password", "selfBooks", "listenRecord", "favorite", "commentRecord" */})
/*
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "username"
)
*/
public class User {

    private String userName;
    private String name;
    private List<Comment> commentRecord;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="username", length=64)
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Basic
    @Column(name="name", length=64)
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(mappedBy="user", cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value={"user"})
    public List<Comment> getCommentRecord() {
        return commentRecord;
    }

    public void setCommentRecord(List<Comment> commentRecord) {
        this.commentRecord = commentRecord;
    }
}
