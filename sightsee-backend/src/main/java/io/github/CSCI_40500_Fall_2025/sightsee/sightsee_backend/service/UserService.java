package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserDTO;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final S3Service s3Service;

    @Value("${aws.buckets.profile-photos}")
    private String profilePhotosBucket;

    public UserService(UserRepository userRepository, S3Service s3Service) {
        this.userRepository = userRepository;
        this.s3Service = s3Service;
    }

    public UserDTO getUserById(Integer userId) throws Exception {
        User user = userRepository.getUserById(userId); //may throw
        if (user == null) {
            throw new NoSuchElementException();
        }

        return getUserDto(user);
    }

    public UserDTO getUserByEmail(String email) throws Exception {
        User user = userRepository.getUserByEmail(email);   //may throw
        if (user == null) {
            throw new NoSuchElementException();
        }

        return getUserDto(user);
    }

    //irrelevant
    public List<UserDTO> getAllUsers() throws Exception {
        List<User> users = userRepository.findAll();    //may throw

        List<UserDTO> userDtos = new ArrayList<>();
        for (User user : users) {
            userDtos.add(getUserDto(user));
        }
        return userDtos;
    }

    private UserDTO getUserDto(User user) throws Exception {
        byte[] profilePhoto = getProfilePhoto(user.getUserId());    //may throw
        return new UserDTO(user.getUserId(),
                           user.getName(),
                           user.getUsername(),
                           user.getEmail(),
                           profilePhoto);
    }

    //TODO: implement
    public UserDTO createUser(UserDTO userDTO) throws Exception {
        return null;
    }

    public void deleteUser(Integer userId) throws Exception {
        throwIfUserNotFound(userId);
        userRepository.deleteById(userId);      //may throw

        //TODO: delete all posts by user
        //TODO: delete user profile photo
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
                            String.valueOf(userId),
                            image);
        //since profile image ID is same as user ID, no need to store an image ID in database
    }

    //TODO: implement
    public void deleteProfilePhoto(Integer userId) throws Exception {
        ;
    }

    private void throwIfUserNotFound(Integer userId) throws NoSuchElementException {
        if (!userRepository.existsById(userId)) {
            throw new NoSuchElementException();
        }
    }

}
