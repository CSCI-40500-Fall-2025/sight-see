package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error retrieving all users: " + e.getMessage());
            return null;
        }
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
