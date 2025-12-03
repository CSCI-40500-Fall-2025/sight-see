package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

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

    //irrelevant
    public List<User> getAllUsers() throws Exception {
        return userRepository.findAll();    //may throw
    }

    //TODO: either use this method for all methods or don't use at all
    //TODO: call on this level or controller level?
    private void throwIfUserNotFound(Integer userId) throws Exception {
        //TODO:
//        if (!userRepository.existsById(userId)) {
//            throw new NoSuchElementException();
//        }
        getUserById(userId);
    }

    //TODO: User or UserHttpResponse?
    public User getUserById(Integer userId) throws Exception {
        User user = userRepository.getUserById(userId); //may throw
        if (user != null) {
            return user;
        }
        throw new NoSuchElementException();
    }

    //TODO: User or UserHttpResponse?
    public User getUserByEmail(String email) throws Exception {
        User user = userRepository.getUserByEmail(email);   //may throw
        if (user != null) {
            return user;
        }
        throw new NoSuchElementException();
    }

    public void deleteUser(Integer userId) throws Exception {
        if (!userRepository.existsById(userId)) {
            throw new NoSuchElementException();
        }
        userRepository.deleteById(userId);  //may throw
        //TODO: delete all posts by user
        //TODO: delete user profile photo
    }

    //overwrites any preexisting object with matching key
    public void uploadProfilePhoto(Integer userId, MultipartFile image) throws Exception {
        throwIfUserNotFound(userId);
        s3Service.putObject(profilePhotosBucket,
                            String.valueOf(userId),
                            image.getBytes());   //last argument may throw IOException
        //since profile image ID is same as user ID, no need to store in database
    }

    public byte[] getProfilePhoto(Integer userId) throws Exception {
        throwIfUserNotFound(userId);
        User user = userRepository.getUserById(userId);
        return s3Service.getObject(profilePhotosBucket,
                                   userId.toString());
    }

}
