package yuesheng.login;

import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ModifyTest {
    private static final Logger log = LoggerFactory.getLogger(ModifyTest.class);
    private static final String request_uri = "/modifyEmail";

    // init settings
    @Autowired
    private WebApplicationContext wac;
    private MockMvc mockMvc;

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
    @DisplayName("TestCase: Email")
    @CsvSource({
            "zxz, yuanzhuo0118@163.com, 200,'{\"status\":\"ok\",\"values\":\"check email to modify email\"}'",
            "zxz, y@163.com, 200,'{\"status\":\"fail\",\"values\":\"send email fail\"}'"
    })
    public void emailTest(String username, String email, int status, String msg) throws Exception {
        // post request
        mockMvc.perform(MockMvcRequestBuilders
                .post(request_uri)
                .param("username", username)
                .param("email", email))
                // assert response
                .andExpect(status().is(status))
                .andExpect(content().string(msg));
    }


}