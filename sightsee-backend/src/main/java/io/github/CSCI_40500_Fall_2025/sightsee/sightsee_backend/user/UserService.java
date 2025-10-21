package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.user;

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
}
