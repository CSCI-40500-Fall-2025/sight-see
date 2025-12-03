package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserHttpResponse;
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

//TODO: change "info" logs to "warn" logs (if applicable) after logging assignment grading
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    //TODO: remove; not relevant
    @GetMapping("/get/all")
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

    @GetMapping("/get/id={userId}")
    public ResponseEntity<UserHttpResponse> getUserById(@PathVariable("userId") Integer userId) {
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
        return getUserHttpResponseResponseEntity(user, getProfilePhoto(userId));
    }

    @GetMapping("/get/email={email}")
    public ResponseEntity<UserHttpResponse> getUserByEmail(@PathVariable("email") String email) {
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
        return getUserHttpResponseResponseEntity(user, getProfilePhoto(user.getUserId()));
    }

    @DeleteMapping("/{userId}/delete")
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

    private ResponseEntity<UserHttpResponse> getUserHttpResponseResponseEntity(User user, byte[] profilePhoto) {
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
        response.setProfilePhoto(profilePhoto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "/{userId}/profile-photo/upload",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadProfilePhoto(@PathVariable("userId") Integer userId,
                                   @RequestParam("file") MultipartFile file) {
        try {
            userService.uploadProfilePhoto(userId, file);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

	//TODO: add try/catch in S3Service? What would S3Client do if failed?
        //TODO: check UserController, UserService, PostController, PostService
    @GetMapping("/{userId}/profile-photo/get")
    public byte[] getProfilePhoto(@PathVariable("userId") Integer userId) {
        byte[] profilePhoto = null;
        try {
            profilePhoto = userService.getProfilePhoto(userId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.info("Error retrieving profile photo for user with ID {}. Cause: User not found", userId);
                return new byte[]{};
            }
            logger.warn("Error retrieving profile photo for user with ID {}. Cause: {}", userId, e.getMessage());
            return new byte[]{};
        }
        logger.debug("Profile photo for user with ID {} retrieved", userId);
        return profilePhoto;
    }

}
