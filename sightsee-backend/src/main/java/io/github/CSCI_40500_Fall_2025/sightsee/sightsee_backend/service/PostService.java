package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.PostRepository;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() throws Exception {
        try {
            return postRepository.findAll();
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
    }

    public List<Post> getAllPostsByUser(Integer userId) throws Exception {
        //Check if user exists?
        try {
            return postRepository.getAllPostsByUserId(userId);
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
    }

    public Post createPost(Post post) throws Exception {
        try {
            return postRepository.save(post);
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
    }

    public void deletePost(Integer postId) throws Exception {
        if (!postRepository.existsById(postId)) {
            throw new NoSuchElementException("User with ID " + postId + " not found");
        }
        try {
            postRepository.deleteById(postId);
        } catch (Exception e) {
            throw new Exception(e.getMessage(), e);
        }
    }
}
