package yuesheng.personal.Entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name="soundbook", schema="yuesheng", catalog="")
@JsonIgnoreProperties(value={"handler", "hibernateLazyInitializer", "fieldHandler", "disabled"})

public class Soundbook {
    private int bookid;
    private String name;
    private User creater;
    private String disabled;

    /*
    private int mark;
    private String releasetime;
    private String createTime;
    */

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="bookid")
    public int getBookid() {
        return bookid;
    }

    public void setBookid(int bookid) {
        this.bookid = bookid;
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
    public User getCreater() {
        return creater;
    }

    public void setCreater(User creater) {
        this.creater = creater;
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

    /*
    @Basic
    @Column(name="mark")
    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    @Basic
    @Column(name="releasetime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public String getReleasetime() {
        return releasetime;
    }

    public void setReleasetime(String releasetime) {
        this.releasetime = releasetime;
    }


    @Column(name="createtime")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
    */
}
