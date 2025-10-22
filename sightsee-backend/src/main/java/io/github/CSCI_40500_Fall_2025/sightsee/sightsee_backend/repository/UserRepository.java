package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

}
