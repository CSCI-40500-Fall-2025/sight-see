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
        return postRepository.findAll();
    }

    public List<Post> getAllPostsByUser(Integer userId) { return postRepository.getAllPostsByUserId(userId); }

    public void deletePost(Integer postId) {
        postRepository.deleteById(postId);
    }
}
