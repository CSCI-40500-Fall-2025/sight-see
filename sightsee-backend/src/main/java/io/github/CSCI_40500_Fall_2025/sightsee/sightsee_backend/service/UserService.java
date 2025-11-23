package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.NoSuchElementException;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final S3Service s3Service;

    @Value("${aws.buckets.profile-photos}") //TODO: is this appropriate? should s3Buckets.getProfilePhotos be used instead?
    private String profilePhotosBucket;

    public UserService(UserRepository userRepository, S3Service s3Service) {
        this.userRepository = userRepository;
    }

    //irrelevant
//    public List<User> getAllUsers() throws Exception {
//        try {
//            return userRepository.findAll();
//        } catch (Exception e) {
//            throw new Exception(e.getMessage(), e);
//        }
//    }

    private void throwIfUserNotFound(Integer userId) {
        //if user ID not in database
        //throw new ?NotFoundException("User not found");
    }

    public User getUserById(Integer userId) throws Exception {
        try {
            User user = userRepository.getUserById(userId);
            if (user != null) {
                return user;
            }
            throw new NoSuchElementException();
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
    }

    public User getUserByEmail(String email) throws Exception {
        try {
            User user = userRepository.getUserByEmail(email);
            if (user != null) {
                return user;
            }
            throw new NoSuchElementException();
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
    }

    public void deleteUser(Integer userId) throws Exception {
        if (!userRepository.existsById(userId)) {
            throw new NoSuchElementException();
        }
        try {
            userRepository.deleteById(userId);
            // delete all posts by user as well
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
    }

    //overwrites any preexisting object with matching key
    public void uploadProfilePhoto(Integer userId, MultipartFile file) {
        throwIfUserNotFound(userId);
        try {
            s3Service.putObject(profilePhotosBucket,
                                String.valueOf(userId),
                                file.getBytes());   //last argument may throw IOException
        } catch (IOException e) {
            throw new RuntimeException(e); //TODO: narrow exception type
        }
        //since profile image ID is same as user ID, no need to store in database
    }

    public byte[] getProfilePhoto(Integer userId) {
        throwIfUserNotFound(userId);
        User user = userRepository.getUserByUserId(userId);
        return s3Service.getObject(profilePhotosBucket,
                                   userId.toString());
    }

//    public byte[] getProfilePhoto(Long userId) {
////        User user = userRepository.findById(userId).orElseThrow(
////            () -> new ObjectNotFoundException(userId, "User"));
////        checkIfUserExists(userId);
//
//        User user = userRepository.findById(userId).get();
//        if (user.getProfilePhotoUrl().isEmpty()) {
//            throw new ObjectNotFoundException(userId, "User profile photo");
//        }
//        return s3Service.getObject(profilePhotosBucket,
//                                   String.valueOf(userId));
//
//    }

}
