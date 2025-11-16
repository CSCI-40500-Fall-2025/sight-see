package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
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
    public void userController_getUserById_returnsUser() throws Exception {
        // Setup
        Integer userId = 3;
        User userServiceResponse = new User(userId, "Vessel", "vessel17", "vessel@gmail.com", "takemebacktoeden"/*, "profilephoto.com"*/);
        Mockito.when(userService.getUserById(userId)).thenReturn(userServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/users/by-id")
                .queryParam("id", Integer.toString(userId)));

        // Assert: correct status
        response.andExpect(status().isOk());
        // Assert: response userId == queried userId
        String responseContentAsJSON = response.andReturn().getResponse().getContentAsString();
        User responseContentAsObject = jsonConverter.convertJsonToUserObject(responseContentAsJSON);
        Assertions.assertEquals(userId, responseContentAsObject.getUserId());
    }
}