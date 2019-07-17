package yuesheng.login;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.FileInputStream;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RegisterTest {
    // init settings
    @Autowired
    private WebApplicationContext wac;
    private MockMvc mockMvc;
    private static final Logger log = LoggerFactory.getLogger(RegisterTest.class);
    private static final String uri="/register";

    // info settings
    @BeforeAll
    public static void init() {
        log.info("@BeforeAll: init()");
    }

    @AfterAll
    public static void done() {
        log.info("@AfterAll: done()");
    }

    @BeforeEach
    public void setUp() throws Exception {
        log.info("@BeforeEach: setUp()");
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @AfterEach
    public void tearDown() throws Exception {
        log.info("@AfterEach: tearDown()");
    }

    // service test
    @ParameterizedTest(name = "{0} {1} {2} {3} {4} {5}")
    @DisplayName("TestCase1: Judge Triangle")
    @CsvSource({
            " ' ' , 2625666138@qq.com, wsy, wsy, 200, '{\"status\":\"fail\",\"values\":\"username cannot be null\"}'",
            "wsy, 2625666138@qq.com, ' ' , wsy, 200, '{\"status\":\"fail\",\"values\":\"password cannot be null\"}'",
            "wsy, 2625666138@qq.com, wsy, wsy, 200, '{\"status\":\"ok\",\"values\":\"check emial to activate account\"}'",
            "wsy, 2625666138@qq.com, wsy, wsy, 200, '{\"status\":\"fail\",\"values\":\"wsy has been registered\"}'",
            "mbw, 2625666138@qq, mbw, mbw, 200, '{\"status\":\"fail\",\"values\":\"invalid email format\"}'",
            "mbw, 2625666138@com, mbw, mbw, 200, '{\"status\":\"fail\",\"values\":\"invalid email format\"}'",
            "mbw, 2625666138.com, mbw, mbw, 200, '{\"status\":\"fail\",\"values\":\"invalid email format\"}'",
            "mbw, 2625666138@qq.com, mbw, mb , 200, '{\"status\":\"fail\",\"values\":\"different password\"}'",
    })
    public void registerTest(String username, String email, String password, String confirmPassword, int status, String msg) throws Exception {
        // post request
        mockMvc.perform(MockMvcRequestBuilders
                .post(uri)
                .param("username", username)
                .param("email",email)
                .param("password", password)
                .param("confirmPassword", confirmPassword))
                // assert response
                .andExpect(status().is(status))
                .andExpect(content().string(msg));
    }

}
