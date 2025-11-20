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
import java.util.NoSuchElementException;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        //TODO: Populate production database with a dummy user to prevent error on first launch?
        List<User> allUsers = null;
        try {
            allUsers = userService.getAllUsers();
        } catch (Exception e) {
            logger.error("Error retrieving all users. Cause: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("All users retrieved. Number of users: {}", allUsers.size());
        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    @GetMapping("/users/by-id")
    public ResponseEntity<UserHttpResponse> getUserById(@RequestParam(name = "id") Integer userId) {
        User user = null;
        try {
            user = userService.getUserById(userId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.info("Error retrieving user with ID {}. Cause: User not found", userId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.warn("Error retrieving user with ID {}. Cause: {}", userId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("User with ID {} retrieved", userId);
        return getUserHttpResponseResponseEntity(user);
    }

    @GetMapping("/users/by-email")
    public ResponseEntity<UserHttpResponse> getUserByEmail(@RequestParam(name = "email") String email) {
        User user = null;
        try {
            user = userService.getUserByEmail(email);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.info("Error retrieving user with email {}. Cause: User not found", email);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.warn("Error retrieving user with email {}. Cause: {}", email, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("User with email {} retrieved", email);
        return getUserHttpResponseResponseEntity(user);
    }

    @DeleteMapping("/users")
    public ResponseEntity<String> deleteUser(@RequestParam(name = "id") Integer userId) {
        try {
            userService.deleteUser(userId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.warn("Error deleting user with ID {}. Cause: User not found", userId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.error("Error deleting user with ID {}. Cause: {}", userId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("User with ID {} deleted", userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private ResponseEntity<UserHttpResponse> getUserHttpResponseResponseEntity(User user) {
        UserHttpResponse response = new UserHttpResponse();
        if (user.getUserId() != null) {
            response.setUserId(user.getUserId());
        } else {
            logger.warn("User retrieved but user ID is null");
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
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

}
