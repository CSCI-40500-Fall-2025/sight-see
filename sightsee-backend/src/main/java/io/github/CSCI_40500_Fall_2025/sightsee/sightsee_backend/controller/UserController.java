package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserCreationRequest;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserResponse;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/id={userId}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("userId") Integer userId) {
        UserResponse user;
        try {
            user = userService.getUserById(userId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.warn("Error retrieving user with ID {}. Cause: User not found", userId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.error("Error retrieving user with ID {}. Cause: {}", userId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("User with ID {} retrieved", userId);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/email={email}")
    public ResponseEntity<UserResponse> getUserByEmail(@PathVariable("email") String email) {
        UserResponse user;
        try {
            user = userService.getUserByEmail(email);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.warn("Error retrieving user with email {}. Cause: User not found", email);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.error("Error retrieving user with email {}. Cause: {}", email, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("User with email {} retrieved", email);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //relevant?
    @GetMapping("")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        //TODO: Populate production database with a dummy user to prevent error on first launch?
        List<UserResponse> allUsers;
        try {
            allUsers = userService.getAllUsers();
        } catch (Exception e) {
            logger.error("Error retrieving all users. Cause: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("All users retrieved. Number of users: {}", allUsers.size());

        return new ResponseEntity<>(allUsers, HttpStatus.OK);
    }

    //is any further security necessary?
    @PostMapping("")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserCreationRequest request) {
        UserResponse createdUser;
        try {
            createdUser = userService.createUser(request);
        } catch (Exception e) {
            logger.error("Error creating user with username {} and email {}. Cause: {}",
                         request.getUsername(), request.getEmail(), e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("User with ID {} created", createdUser.getUserId());

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    //TODO: carry user identification to backend to authorize delete operation
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable("userId") Integer userId) {
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

    //TODO: add try/catch in S3Service? What would S3Client do if failed?
        //check UserController, UserService, PostController, PostService
    @PostMapping(path = "/{userId}/profile-photo",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfilePhoto(@PathVariable("userId") Integer userId,
                                   @RequestParam("file") MultipartFile file) {
        try {
            userService.uploadProfilePhoto(userId, file.getBytes());
        } catch (Exception e) {
            logger.warn("Error uploading profile photo for user with ID {}. Cause: {}", userId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("Profile photo for user with ID {} uploaded", userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //keep or remove?
    @GetMapping("/{userId}/profile-photo")
    public byte[] getProfilePhoto(@PathVariable("userId") Integer userId) {
        byte[] profilePhoto;
        try {
            profilePhoto = userService.getProfilePhoto(userId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.warn("Error retrieving profile photo for user with ID {}. Cause: User not found", userId);
                return new byte[]{};
            }
            logger.warn("Error retrieving profile photo for user with ID {}. Cause: {}", userId, e.getMessage());
            return new byte[]{};
        }
        logger.debug("Profile photo for user with ID {} retrieved", userId);
        return profilePhoto;
    }

}
