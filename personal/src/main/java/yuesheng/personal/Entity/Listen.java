package yuesheng.personal.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Embeddable
@Table(name="listen", schema="yuesheng", catalog="")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "listenid"
)
@JsonIgnoreProperties(value={"listener"})
public class Listen {
    private int listenid;
    private String time;
    private User listener;
    private Soundbook soundbook;

    @Id
    @Column(name="listenid")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    public int getListenid() {
        return listenid;
    }

    public void setListenid(int listenid) {
        this.listenid = listenid;
    }

    @Basic
    @Column(name="time")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "username", unique = true)
    public User getListener() {
        return listener;
    }

    public void setListener(User listener) {
        this.listener = listener;
    }

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "bookid", unique = true)
    public Soundbook getSoundbook() {
        return soundbook;
    }

    public void setSoundbook(Soundbook soundbook) {
        this.soundbook = soundbook;
    }
}
