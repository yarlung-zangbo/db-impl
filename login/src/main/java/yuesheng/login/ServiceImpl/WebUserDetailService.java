package yuesheng.login.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import yuesheng.login.Dao.UserDao;
import yuesheng.login.Repository.UserRepository;
import yuesheng.login.tool.TimeTool;

@Configuration
public class WebUserDetailService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username){
        try{
            yuesheng.login.Entity.User user=userDao.findByUsername(username);
            if(user.getRegistertime()==null){
                throw new Exception();
            }
            if(user.getDisabled()!=null && user.getDisabled().compareTo(TimeTool.now())>0){
                throw new Exception();
            }
            String password=user.getPassword();
            return new org.springframework.security.core.userdetails.User(username, this.passwordEncoder.encode(password), true,
                    true, true,
                    true, AuthorityUtils.commaSeparatedStringToAuthorityList("admin"));
        }catch(Exception err){
            throw new UsernameNotFoundException(username);
        }
    }
}
