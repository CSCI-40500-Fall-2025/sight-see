package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.PostRepository;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import org.hibernate.ObjectNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() throws Exception {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
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
}
