package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserHttpResponse;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.UserService;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> allUsers = userService.getAllUsers();
        if (allUsers != null) {
            return new ResponseEntity<>(allUsers, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/users/by-id")
    public ResponseEntity<UserHttpResponse> getUserById(@RequestParam(name = "id") Integer userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            UserHttpResponse response = new UserHttpResponse();
            if (user.getUserId() != null) {
                response.setUserId(user.getUserId());
            }
            if (user.getName() != null) {
                response.setName(user.getName());
            }
            if (user.getUsername() != null) {
                response.setUsername(user.getUsername());
            }
            if (user.getEmail() != null) {
                response.setEmail(user.getEmail());
            }
            if (user.getProfilePhotoUrl() != null) {
                response.setProfilePhotoUrl(user.getProfilePhotoUrl());
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/users/by-email")
    public ResponseEntity<UserHttpResponse> getUserByEmail(@RequestParam(name = "email") String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            // User not found
            if (user.getUserId() == -1) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            // Success
            UserHttpResponse response = new UserHttpResponse();
            if (user.getUserId() != null) {
                response.setUserId(user.getUserId());
            }
            if (user.getName() != null) {
                response.setName(user.getName());
            }
            if (user.getUsername() != null) {
                response.setUsername(user.getUsername());
            }
            if (user.getEmail() != null) {
                response.setEmail(user.getEmail());
            }
            if (user.getProfilePhotoUrl() != null) {
                response.setProfilePhotoUrl(user.getProfilePhotoUrl());
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        // Error while retrieving
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/users")
    public ResponseEntity<String> deleteUser(@RequestParam(name = "id") Integer userId) {
        Boolean isDeleted = userService.deleteUser(userId);
        if (isDeleted) {
            logger.info("User with id {} has been deleted", userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        logger.error("User with id {} has not been successfully deleted", userId);
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
