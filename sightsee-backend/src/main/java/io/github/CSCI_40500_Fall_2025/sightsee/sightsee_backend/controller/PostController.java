package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostHttpResponse;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.PostService;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;

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

    @GetMapping("/get/all")
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

    //TODO: should "get" be in mapping? if so, should it be at end?
    @GetMapping("/get/userId={userId}")
    public ResponseEntity<List<Post>> getAllPostsByUser(@PathVariable("userId") Integer userId) {
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

    //TODO: Is Post the correct RequestBody type?
        //no
    //how do post IDs get assigned?
    //TODO: carry user identification to backend to authorize create operation
    //TODO: Should Post entry hold User username so that when post is retrieved, user does not have to be retrieved to get username?
    @PostMapping("/create")
    public ResponseEntity<PostHttpResponse> createPost(@RequestBody PostHttpResponse newPost) {
        Post newlyCreatedPost = null;
        try {
            newlyCreatedPost = postService.createPost(newPost);
        } catch (Exception e) {
            logger.error("Error creating post by user {} with image {} and location {}. Cause: {}",
                         newPost.getUserId(), newPost.getPostImage(), newPost.getLocationCoordinates(), e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        logger.info("Post with ID {} created", newlyCreatedPost.getPostId());
        return
            new ResponseEntity<>(newlyCreatedPost, HttpStatus.CREATED);
    }

    //TODO: carry user identification to backend to authorize delete operation
    @DeleteMapping("/{postId}/delete")
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

    //TODO: almost-duplicate code; can this be extracted?
    //TODO: is PostHttpResponse a DTO?
	@GetMapping("/{postId}/get")
	public ResponseEntity<PostHttpResponse> getPost(@PathVariable("postId") Integer postId) {
        //get post entry from database
        Post post = null;
        try {
            post = postService.getPost(postId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.info("Error retrieving post with ID {}. Cause: Post not found", postId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.warn("Error retrieving post with ID {}. Cause: {}", postId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("Post with ID {} retrieved", postId);

        //get post image from S3
        byte[] postImage = null;
        try {
            postImage = postService.getPostImage(post.getUserId(), postId);
        } catch (Exception e) {
            if (e instanceof NoSuchElementException) {
                logger.info("Error retrieving post image with ID {}. Cause: Image not found", postId);
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            logger.warn("Error retrieving post image with ID {}. Cause: {}", postId, e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        logger.debug("Post image with ID {} retrieved", postId);

        return getPostHttpResponseEntity(post, postImage);
	}

    private ResponseEntity<PostHttpResponse> getPostHttpResponseEntity(Post post, byte[] postImage) {

    }

}
