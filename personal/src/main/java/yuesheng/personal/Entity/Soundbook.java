package yuesheng.personal.Entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name="soundbook", schema="yuesheng", catalog="")
@JsonIgnoreProperties(value={"handler", "hibernateLazyInitializer", "fieldHandler"})

public class Soundbook {
    private int bookId;
    private String name;
    private User creater;
    private int mark;
    private String realease;
    private String disabled;
    private String createTime;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="bookid")
    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Basic
    @Column(name="name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="username")
    @JsonIgnoreProperties(value={"selfBooks", "favorite"})
    public User getCreater() {
        return creater;
    }

    public void setCreater(User creater) {
        this.creater = creater;
    }

    @Basic
    @Column(name="mark")
    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    @Basic
    @Column(name="release")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public String getRealease() {
        return realease;
    }

    public void setRealease(String realease) {
        this.realease = realease;
    }

    @Basic
    @Column(name="disabled")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public String getDisabled() {
        return disabled;
    }

    public void setDisabled(String disabled) {
        this.disabled = disabled;
    }

    @Column(name="createtime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

}
