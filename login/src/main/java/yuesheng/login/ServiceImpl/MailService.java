package yuesheng.login.ServiceImpl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

@Service
public class MailService {
    @Value("${yuesheng.email.address}")
    private String email;
    @Value("${yuesheng.email.password}")
    private String password;
    @Value("${yuesheng.email.nickName}")
    private String nickName;
    @Value("${yuesheng.email.host}")
    private String emailHost;
    @Value("${yuesheng.email.protocol}")
    private String protocol;

    private String subject;
    private String content;

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void sendMail(String emailAddress, String username){
        try{
            Properties props = new Properties();
            props.setProperty("mail.transport.protocol", this.protocol);
            props.setProperty("mail.smtp.host", this.emailHost);
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.starttls.enable","true");

            Session session = Session.getInstance(props);
            session.setDebug(true);
            MimeMessage message = createMimeMessage(session, emailAddress, username);
            Transport transport = session.getTransport();
            transport.connect(this.email, this.password);
            transport.sendMessage(message, message.getAllRecipients());
            transport.close();
        }catch(Exception err){
            err.printStackTrace();
        }
    }

    private MimeMessage createMimeMessage(Session session, String receiveMail, String username) throws Exception {
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(this.email, this.nickName, "UTF-8"));
        message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(receiveMail, username, "UTF-8"));
        message.setSubject(this.subject, "UTF-8");
        message.setContent(this.content, "text/html;charset=UTF-8");
        message.setSentDate(new Date());
        message.saveChanges();
        return message;
    }

}
