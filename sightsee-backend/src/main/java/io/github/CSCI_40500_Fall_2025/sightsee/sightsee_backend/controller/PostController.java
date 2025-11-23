package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.PostService;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    private final PostService postService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> allPosts = null;
        try {
            allPosts = postService.getAllPosts();
        } catch (Exception e) {
            logger.error("Error retrieving all posts. Cause: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("All posts retrieved. Number of posts: {}", allPosts.size());
        return new ResponseEntity<>(allPosts, HttpStatus.OK);
    }

    @GetMapping("/posts/all-by-user")
    public ResponseEntity<List<Post>> getAllPostsByUser(@RequestParam(name = "id") Integer userId) {
        List<Post> allPostsByUser = null;
        try {
            allPostsByUser = postService.getAllPostsByUser(userId);
        } catch (Exception e) {
            logger.warn("Error retrieving posts by user {}. Cause: {}", userId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("Posts by user {} retrieved. Number of posts: {}", userId, allPostsByUser.size());
        return new ResponseEntity<>(allPostsByUser, HttpStatus.OK);
    }

    @PostMapping("/posts/create")
    public ResponseEntity<Post> createPost(@RequestBody Post newPost) {
        Post newlyCreatedPost = null;
        try {
            newlyCreatedPost = postService.createPost(newPost);
        } catch (Exception e) {
            logger.error("Error creating post by user {} with image URL {} and location {}. Cause: {}",
                         newPost.getUserId(), newPost.getImageUrl(), newPost.getLocationCoordinates(), e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("Post with ID {} created", newlyCreatedPost.getPostId());
        return new ResponseEntity<>(newlyCreatedPost, HttpStatus.CREATED);
    }

    @DeleteMapping("/posts")
    public ResponseEntity<String> deletePost(@RequestParam(name = "id") Integer postId) {
        try {
            postService.deletePost(postId);
        } catch (Exception e) {
            logger.error("Error deleting post with ID {}. Cause: {}", postId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("Post with ID {} deleted", postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
