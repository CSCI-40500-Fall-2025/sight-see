package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //not relevant
//    @GetMapping("/users")
//    public ResponseEntity<List<User>> getAllUsers() {
//        List<User> allUsers = userService.getAllUsers();
//        if (allUsers != null) {
//            return new ResponseEntity<>(allUsers, HttpStatus.OK);
//        }
//        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//    }

    @PostMapping(path = "/users/{userId}/profile-photo",
                 consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadProfilePhoto(@PathVariable("userId") Integer userId,
                                   @RequestParam("file") MultipartFile file) {
        userService.uploadProfilePhoto(userId, file);
    }

    @GetMapping("/users/{userId}/profile-photo")
    public byte[] getProfilePhoto(@PathVariable("userId") Integer userId) {
        return userService.getProfilePhoto(userId);
    }

}
