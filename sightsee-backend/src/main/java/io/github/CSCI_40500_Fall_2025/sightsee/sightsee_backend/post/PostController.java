package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.post;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("posts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }
}
