package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT * FROM users WHERE user_id = :userId", nativeQuery = true)
    User getUserById(Integer userId);

    @Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
    User getUserByEmail(String email);

}
