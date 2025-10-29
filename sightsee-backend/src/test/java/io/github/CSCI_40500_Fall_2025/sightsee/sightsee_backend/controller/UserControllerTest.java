package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserHttpResponse;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.UserService;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.utility.JsonConverter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    @MockitoBean
    private UserService userService;

    private final JsonConverter jsonConverter = new JsonConverter();

    @Test
    public void test_userController_getUserById_returnsUser() throws Exception {
        // Setup
        Integer userId = 3;
        User userServiceResponse = new User(userId, "Vessel", "vessel17", "vessel@gmail.com", "takemebacktoeden", "profilephoto.com");
        Mockito.when(userService.getUserById(userId)).thenReturn(userServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/users/by-id")
                .queryParam("id", Integer.toString(userId)));

        // Assert: correct status
        response.andExpect(status().isOk());
        // Assert: response userId == queried userId
        String responseContentAsJSON = response.andReturn().getResponse().getContentAsString();
        UserHttpResponse responseContentAsObject = jsonConverter.convertJsonToUserHttpResponseObject(responseContentAsJSON);
        Assertions.assertEquals(userId, responseContentAsObject.getUserId());
    }

    @Test
    public void test_userController_getUserByEmail_returnsUser() throws Exception {
        // Setup
        String email = "vessel@gmail.com";
        User userServiceResponse = new User(3, "Vessel", email, "vessel@gmail.com", "takemebacktoeden", "profilephoto.com");
        Mockito.when(userService.getUserByEmail(email)).thenReturn(userServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/users/by-email")
                .queryParam("email", email));

        // Assert: correct status
        response.andExpect(status().isOk());
        // Assert: response email == queried email
        String responseContentAsJSON = response.andReturn().getResponse().getContentAsString();
        UserHttpResponse responseContentAsObject = jsonConverter.convertJsonToUserHttpResponseObject(responseContentAsJSON);
        Assertions.assertEquals(email, responseContentAsObject.getEmail());
    }

    @Test
    public void test_userController_getUserByEmail_returnsStatus404() throws Exception {
        // Setup
        String email = "johnfrusciante@gmail.com";
        User userServiceResponse = new User();
        userServiceResponse.setUserId(-1);;
        Mockito.when(userService.getUserByEmail(email)).thenReturn(userServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/users/by-email")
                .queryParam("email", email));

        // Assert: correct status
        response.andExpect(status().isNotFound());
    }

    @Test
    public void test_userController_deleteUser_returnsStatus204() throws Exception {
        // Setup
        Integer userId = 5;
        Mockito.when(userService.deleteUser(userId)).thenReturn(true);

        // Action
        ResultActions response = mockMvc.perform(delete("/users")
                .queryParam("id", Integer.toString(userId)));

        // Assert: successful deletion returns 204 status
        response.andExpect(status().isNoContent());
    }

    @Test
    public void test_userController_deleteUser_returnsStatus500() throws Exception {
        // Setup
        Integer userId = 6;
        Mockito.when(userService.deleteUser(userId)).thenReturn(false);

        // Action
        ResultActions response = mockMvc.perform(delete("/users")
                .queryParam("id", Integer.toString(userId)));

        // Assert: failed deletion returns 500 status
        response.andExpect(status().isInternalServerError());
    }
}