package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostDTO;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.PostService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDTO> getPost(@PathVariable("postId") Integer postId) {
        PostDTO post;
        try {
            post = postService.getPost(postId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.warn("Error retrieving post with ID {}. Cause: Post not found", postId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.error("Error retrieving post with ID {}. Cause: {}", postId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("Post with ID {} retrieved", postId);

        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<PostDTO>> getAllPosts() {
        //TODO: Populate production database with a dummy post to prevent error on first launch?
        List<PostDTO> allPosts;
        try {
            allPosts = postService.getAllPosts();
        } catch (Exception e) {
            logger.error("Error retrieving all posts. Cause: {}", e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("All posts retrieved. Number of posts: {}", allPosts.size());

        return new ResponseEntity<>(allPosts, HttpStatus.OK);
    }

    @GetMapping("/userId={userId}")
    public ResponseEntity<List<PostDTO>> getAllPostsByUser(@PathVariable("userId") Integer userId) {
        List<PostDTO> allPostsByUser;
        try {
            allPostsByUser = postService.getAllPostsByUser(userId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.warn("Error retrieving posts by user {}. Cause: User not found", userId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.error("Error retrieving posts by user {}. Cause: {}", userId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("Posts by user {} retrieved. Number of posts: {}", userId, allPostsByUser.size());
        return new ResponseEntity<>(allPostsByUser, HttpStatus.OK);
    }

    //TODO: carry user identification to backend to authorize create operation
    @PostMapping("")
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO incomingPost) {
        PostDTO createdPost;
        try {
            createdPost = postService.createPost(incomingPost);
        } catch (Exception e) {
            logger.error("Error creating post by user {} with image {} and location {}. Cause: {}",
                         incomingPost.getUserId(), incomingPost.getPostImage(), incomingPost.getLocationCoordinates(), e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.info("Post with ID {} created", createdPost.getPostId());

        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    //TODO: carry user identification to backend to authorize delete operation
    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable("postId") Integer postId) {
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
