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
    @Value("${yuesheng.login.server}")
    private String server;
    @Value("${yuesheng.email.activateMailSubject}")
    private String subject;
    @Value("${yuesheng.email.activateMailContent}")
    private String content;
    @Value("${yuesheng.email.host}")
    private String emailHost;
    @Value("${yuesheng.email.protocol}")
    private String protocol;

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
            transport.connect(this.email, password);
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
        String con="<p>"+ this.content+" <br />"+"<a href='"+ this.server+"activate?username="+username+"'>activate</a></p>";
        message.setContent(con, "text/html;charset=UTF-8");
        message.setSentDate(new Date());
        message.saveChanges();
        return message;
    }

}
