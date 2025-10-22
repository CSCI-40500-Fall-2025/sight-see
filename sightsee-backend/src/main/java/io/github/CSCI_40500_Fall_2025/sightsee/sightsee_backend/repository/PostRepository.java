package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query(value = "SELECT * FROM post WHERE user_id = :userId", nativeQuery = true)
    List<Post> getAllPostsByUserId(Integer userId);

}
