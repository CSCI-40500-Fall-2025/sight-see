package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.PostService;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> allPosts = postService.getAllPosts();
        if (allPosts != null) {
            return new ResponseEntity<>(allPosts, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/posts/all-by-user")
    public ResponseEntity<List<Post>> getAllPostsByUser(@RequestParam(name = "id") Integer userId) {
        List<Post> allPostsByUser = postService.getAllPostsByUser(userId);
        if (allPostsByUser != null) {
            return new ResponseEntity<>(allPostsByUser, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/posts/create")
    public ResponseEntity<Post> createPost(@RequestBody Post newPost) {
        Post newlyCreatedPost = postService.createPost(newPost);
        if (newlyCreatedPost != null) {
            return new ResponseEntity<>(newlyCreatedPost, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/posts")
    public ResponseEntity<String> deletePost(@RequestParam(name = "id") Integer postId) {
        Boolean isDeleted = postService.deletePost(postId);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
