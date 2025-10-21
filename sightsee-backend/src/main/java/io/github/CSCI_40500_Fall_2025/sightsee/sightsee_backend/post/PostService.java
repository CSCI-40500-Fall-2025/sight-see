package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.post;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        try {
            return postRepository.findAll();
        } catch (Exception e) {
            System.out.println("Error retrieving all posts: " + e.getMessage());
            return null;
        }
    }

    public List<Post> getAllPostsByUser(Integer userId) {
        try {
            return postRepository.getAllPostsByUserId(userId);
        } catch (Exception e) {
            System.out.println("Error retrieving all posts by user " + userId + ": " + e.getMessage());
            return null;
        }
    }

    public void createPost(Post post) {
        postRepository.save(post);
    }

    public void deletePost(Integer postId) {
        postRepository.deleteById(postId);
    }
}
