package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserDTO;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.UserService;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.utility.JsonConverter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.NoSuchElementException;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

//    @Autowired
    @MockitoBean
    private UserService userService;

    private final JsonConverter jsonConverter = new JsonConverter();

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Test
    public void test_userController_getUserById_returnsUser() throws Exception {
        // Setup
        int userId = 3;
        UserDTO userServiceResponse = new UserDTO(userId, "Vessel", "vessel17", "vessel@gmail.com",
                                                  "https://aws.amazon.com/s3/vessel".getBytes());
        Mockito.when(userService.getUserById(userId)).thenReturn(userServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/users/id=" + userId));

        try {
            // Assert: correct status
            response.andExpect(status().isOk());
            // Assert: response userId == queried userId
            String responseContentAsJson = response.andReturn().getResponse().getContentAsString();
            UserDTO responseContentAsObject = jsonConverter.convertJsonToUserDto(responseContentAsJson);
            Assertions.assertEquals(userId, responseContentAsObject.getUserId());
        } catch (Exception e) {
            logger.error("Test to get user by ID failed");
            throw e;
        }
        logger.info("Test to get user by ID succeeded");
    }

    @Test
    public void test_userController_getUserByEmail_returnsUser() throws Exception {
        // Setup
        String email = "vessel@gmail.com";
        UserDTO userServiceResponse = new UserDTO(3, "Vessel", "vessel17", email,
                                                  "https://aws.amazon.com/s3/vessel".getBytes());
        Mockito.when(userService.getUserByEmail(email)).thenReturn(userServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/users/email=" + email));

        try {
            // Assert: correct status
            response.andExpect(status().isOk());
            // Assert: response email == queried email
            String responseContentAsJson = response.andReturn().getResponse().getContentAsString();
            UserDTO responseContentAsObject = jsonConverter.convertJsonToUserDto(responseContentAsJson);
            Assertions.assertEquals(email, responseContentAsObject.getEmail());
        } catch (Exception e) {
            logger.error("Test to get user by email failed");
            throw e;
        }
        logger.info("Test to get user by email succeeded");
    }

    @Test
    public void test_userController_getUserByEmail_returnsStatus404() throws Exception {
        // Setup
        String email = "johnfrusciante@gmail.com";
        Mockito.when(userService.getUserByEmail(email))
               .thenThrow(new NoSuchElementException());

        // Action
        ResultActions response = mockMvc.perform(get("/users/email=" + email));

        try {
            // Assert: correct status
            response.andExpect(status().isNotFound());
        } catch (Exception e) {
            logger.error("Test for getUserByEmail() returns 'not found' failed");
            throw e;
        }
        logger.info("Test for getUserByEmail() returns 'not found' succeeded");
    }

    @Test
    public void test_userController_deleteUser_returnsStatus204() throws Exception {
        // Setup
        Integer userId = 5;
        Mockito.doNothing().when(userService).deleteUser(userId);

        // Action
        ResultActions response = mockMvc.perform(delete("/users/" + userId));

        try {
            // Assert: successful deletion returns 204 status
            response.andExpect(status().isNoContent());
        } catch (Exception e) {
            logger.error("Test to successfully delete user failed");
            throw e;
        }
        logger.info("Test to successfully delete user succeeded");
    }

    @Test
    public void test_userController_deleteUser_returnsStatus500() throws Exception {
        // Setup
        Integer userId = 6;
        Mockito.doThrow(new Exception()).when(userService).deleteUser(userId);

        // Action
        ResultActions response = mockMvc.perform(delete("/users/" + userId));

        try {
            // Assert: failed deletion returns 500 status
            response.andExpect(status().isInternalServerError());
        } catch (Exception e) {
            logger.error("Test to fail to delete user failed");
            throw e;
        }
        logger.info("Test to fail to delete user succeeded");
    }
}