package yuesheng.personal.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="user", schema="yuesheng", catalog="")
@JsonIgnoreProperties(value={"handler", "hibernateLazyInitializer", "fieldHandler",
        "selfBooks", "favorite", "listenRecord"})

public class User {

    private String username;
    private String name;
    private List<Soundbook> selfBooks;
    private List<Soundbook> favorite;
    private List<Listen> listenRecord;

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="username", length=64)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name="name", length=64)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToMany(cascade={CascadeType.REMOVE},fetch=FetchType.LAZY,
            targetEntity = Soundbook.class,mappedBy = "creater")
    @OrderBy("createTime DESC ")
    public List<Soundbook> getSelfBooks() {
        return selfBooks;
    }

    public void setSelfBooks(List<Soundbook> selfBooks) {
        this.selfBooks = selfBooks;
    }

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="favorite", joinColumns=@JoinColumn(name="username"),
            inverseJoinColumns = @JoinColumn(name="bookid"))
    public List<Soundbook> getFavorite() {
        return favorite;
    }

    public void setFavorite(List<Soundbook> favorite) {
        this.favorite = favorite;
    }

    @OneToMany(mappedBy="listener",cascade=CascadeType.ALL)
    @OrderBy(value="time Desc")
    public List<Listen> getListenRecord() {
        return listenRecord;
    }

    public void setListenRecord(List<Listen> listenRecord) {
        this.listenRecord = listenRecord;
    }
}
