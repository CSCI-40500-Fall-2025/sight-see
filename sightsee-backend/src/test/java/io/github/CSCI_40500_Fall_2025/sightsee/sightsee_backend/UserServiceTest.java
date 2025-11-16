package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.S3Service;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest(classes = UserService.class)
@ContextConfiguration(classes = {UserService.class, UserRepository.class, S3Service.class})
public class UserServiceTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    S3Service s3Service;

    private UserService userService = new UserService(userRepository, s3Service);

//    public UserServiceTest(UserRepository userRepository, S3Service s3Service) {
//        this.userService = new UserService(userRepository, s3Service);
//    }

    @Test
    void testUploadProfilePhoto() {
        Integer userId = 12345;
        MultipartFile data = new MockMultipartFile("file", "Hello world".getBytes());

        userService.uploadProfilePhoto(userId, data);
    }

}


/**
 * TEMPLATES FOR MOCKED TEST TYPES:
 */

/**
 * //UNIT TEST:
 *
 * @ExtendWith(MockitoExtension.class)
 * public class UserServiceTest {
 *
 *     private UserService userService;
 *
 *     @Mock
 *     private UserRepository userRepository;
 *
 *     @Mock
 *     private S3Service s3Service;
 *
 *     @BeforeEach
 *     void setUp() {
 *         userService = new UserService(userRepository, s3Service);
 *     }
 *
 *     //tests
 * }
 */

/**
 * //PARTIAL INTEGRATION TEST:
 *
 * @SpringBootTest(classes = UserService.class)
 * public class UserServiceTest {
 *
 *     @Autowired
 *     private UserService userService;
 *
 *     @MockitoBean
 *     private UserRepository userRepository;
 *
 *     @MockitoBean
 *     private S3Service s3Service;
 *
 *     //tests
 *
 * }
 */