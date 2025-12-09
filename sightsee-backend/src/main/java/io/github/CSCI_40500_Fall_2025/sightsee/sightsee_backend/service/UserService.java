package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserCreationRequest;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserResponse;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final S3Service s3Service;
    private final PasswordEncoder passwordEncoder;

    @Value("${aws.buckets.profile-photos}")
    private String profilePhotosBucket;

    public UserService(UserRepository userRepository, S3Service s3Service, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse getUserById(Integer userId) throws Exception {
        User user = userRepository.getUserById(userId); //may throw
        if (user == null) {
            throw new NoSuchElementException();
        }

        return getUserResponse(user);
    }

    public UserResponse getUserByEmail(String email) throws Exception {
        User user = userRepository.getUserByEmail(email);   //may throw
        if (user == null) {
            throw new NoSuchElementException();
        }

        return getUserResponse(user);
    }

    //relevant?
    public List<UserResponse> getAllUsers() throws Exception {
        List<User> users = userRepository.findAll();    //may throw

        List<UserResponse> userResponses = new ArrayList<>();
        for (User user : users) {
            userResponses.add(getUserResponse(user));
        }
        return userResponses;
    }

    private UserResponse getUserResponse(User user) throws Exception {
        byte[] profilePhoto = getProfilePhoto(user.getUserId());    //may throw
        return new UserResponse(user.getUserId(),
                                user.getName(),
                                user.getUsername(),
                                user.getEmail(),
                                profilePhoto);
    }

    public UserResponse createUser(UserCreationRequest request) throws Exception {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already taken");
        }

        User user = new User(request.getUsername(),
                             passwordEncoder.encode(request.getPassword()),
                             request.getName(),
                             request.getEmail());
        userRepository.save(user);
        uploadProfilePhoto(user.getUserId(), new byte[100]); //TODO: find more elegant solution

        return getUserResponse(user);
    }

    public void deleteUser(Integer userId) throws Exception {
        throwIfUserNotFound(userId);

        try {
            deleteProfilePhoto(userId);
        } catch (Exception e) {
            throw new Exception("Error deleting profile photo: " + e.getMessage(), e);
        }

        try {
            userRepository.deleteById(userId);
        } catch (Exception e) {
            throw new Exception("Error deleting user in database: " + e.getMessage(), e);
        }

        //TODO: delete all posts by user
    }

    public byte[] getProfilePhoto(Integer userId) throws Exception {
        throwIfUserNotFound(userId);
        return s3Service.getObject(profilePhotosBucket,
                                   userId.toString());
    }

    //overwrites any preexisting object with matching key
    public void uploadProfilePhoto(Integer userId, byte[] image) throws Exception {
        throwIfUserNotFound(userId);
        s3Service.putObject(profilePhotosBucket,
                            userId.toString(),
                            image);
    }

    private void deleteProfilePhoto(Integer userId) throws Exception {
        throwIfUserNotFound(userId);
        s3Service.deleteObject(profilePhotosBucket,
                               userId.toString());
    }

    private void throwIfUserNotFound(Integer userId) throws NoSuchElementException {
        if (!userRepository.existsById(userId)) {
            throw new NoSuchElementException();
        }
    }

}
