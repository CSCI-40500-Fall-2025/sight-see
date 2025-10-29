package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@SpringBootTest
public class UserServiceTest {

    private final UserService userService;

    public UserServiceTest(UserService userService) {
        this.userService = userService;
    }

    @Test
    void testPutObject() {
        Integer userId = 12345;
        MultipartFile data = new MockMultipartFile("file", "Hello world".getBytes());

        userService.uploadProfilePhoto(userId, data);
    }

}
