package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.post;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/posts/all-by-user")
    public List<Post> getAllPostsByUser(@RequestParam(name = "id") Integer userId) {
        try {
            return postService.getAllPostsByUser(userId);
        }
        catch(Error e) {
            System.out.println("Error retrieving user's posts"); // STUB
        }
        return null;
    }

    @PostMapping("/posts/create")
    public void createPost(@RequestBody Post newPost) {
        try {
            postService.createPost(newPost);
        }
        catch (Error e) {
            System.out.println("Error creating post"); // STUB
        }
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
