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

    // Good to go ^
    // ///////////////
    // Work to do v

    @PostMapping("/posts/create")
    public ResponseEntity<Post> createPost(@RequestBody Post newPost) {
        Post newlyCreatedPost = postService.createPost(newPost);
        if (newlyCreatedPost != null) {
            return new ResponseEntity<>(newlyCreatedPost, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/posts/{id}")
    public void deletePost(@PathVariable("id") Integer id) {
        try {
            System.out.println("hi");
            postService.deletePost(id);
        }
        catch (Error e) {
            System.out.println("Error deleting post"); // STUB
        }
    }
}
