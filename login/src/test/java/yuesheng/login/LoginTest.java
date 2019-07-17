package yuesheng.login;

import org.junit.Test;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.unauthenticated;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class LoginTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    public void logInWithValidUser() throws Exception {
        SecurityMockMvcRequestBuilders.FormLoginRequestBuilder
                login = formLogin()
                .user("zxz")
                .password("xiaxiao");
        mockMvc.perform(login)
                .andExpect(authenticated().withUsername("zxz"))
                .andExpect(MockMvcResultMatchers.content().string("{\"status\": \"ok\"}"));
    }

    @Test
    public void logInWithWrongPassword() throws Exception {
        SecurityMockMvcRequestBuilders.FormLoginRequestBuilder
                login = formLogin()
                .user("zxz")
                .password("zxz");
        mockMvc.perform(login)
                .andExpect(unauthenticated())
                .andExpect(MockMvcResultMatchers
                        .content()
                        .string("{\"status\": \"fail\", \"value\": \"Bad credentials\"}"));
    }

    @Test
    public void logInWithInvalidUser() throws Exception{
        SecurityMockMvcRequestBuilders.FormLoginRequestBuilder
                login = formLogin()
                .user("xiaxiao")
                .password("xiaxiao");
        mockMvc.perform(login)
                .andExpect(unauthenticated())
                .andExpect(MockMvcResultMatchers
                        .content()
                        .string("{\"status\": \"fail\", \"value\": \"Bad credentials\"}"));
    }
}