package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final S3Service s3Service;

    @Value("${aws.buckets.profile-photos}") //TODO: is this appropriate? should s3Buckets.getProfilePhotos be used instead?
    private String profilePhotosBucket;

    public UserService(UserRepository userRepository, S3Service s3Service) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
    }

    //not relevant
//    public List<User> getAllUsers() {
//        try {
//            return userRepository.findAll();
//        } catch (Exception e) {
//            System.out.println("Error retrieving all users: " + e.getMessage());
//            return null;
//        }
//    }

    private void throwIfUserNotFound(Integer userId) {
        //if user ID not in database
            //throw new ?NotFoundException("User not found");
    }

    public void uploadProfilePhoto(Integer userId, MultipartFile file) {
        throwIfUserNotFound(userId);
        try {
            s3Service.putObject(profilePhotosBucket,
                                userId.toString(),
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

    public User getUserById(Integer userId) {
        try {
            return userRepository.getUserById(userId);
        } catch (Exception e) {
            System.out.println("Error retrieving user with userId: " + userId + " " + e.getMessage());
            return null;
        }
    }

}
