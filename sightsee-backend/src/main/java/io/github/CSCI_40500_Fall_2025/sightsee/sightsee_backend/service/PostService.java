package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostDTO;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.PostRepository;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final S3Service s3Service;

    @Value("${aws.buckets.post-images}")
    private String postImagesBucket;

    public PostService(PostRepository postRepository, S3Service s3Service) {
        this.postRepository = postRepository;
        this.s3Service = s3Service;
    }

    public PostDTO getPost(Integer postId) throws Exception {
        Post post = postRepository.getPostByPostId(postId); //may throw
        if (post == null) {
            throw new NoSuchElementException();
        }

        List<Post> postList = List.of(post);
        return getPostDtos(postList).getFirst();
    }

    public List<PostDTO> getAllPosts() throws Exception {
        List<Post> posts = postRepository.findAll();    //may throw

        return getPostDtos(posts);
    }

    //TODO: Check if user exists?
    public List<PostDTO> getAllPostsByUser(Integer userId) throws Exception {
        List<Post> posts = postRepository.getAllPostsByUserId(userId);      //may throw

        return getPostDtos(posts);
    }

    private List<PostDTO> getPostDtos(List<Post> posts) throws Exception {
        List<PostDTO> postDtos = new ArrayList<>();

        for (Post post : posts) {
            byte[] postImage = getPostImage(post.getUserId(), post.getPostId());    //may throw
            postDtos.add(new PostDTO(post.getPostId(),
                                     post.getUserId(),
                                     postImage,
                                     post.getCaption(),
                                     post.getTimestamp(),
                                     post.getLocationCoordinates()));
        }
        return postDtos;
    }

    //TODO: implement
    public List<PostDTO> getAllNearbyPosts() {
        return null;
    }

    public PostDTO createPost(PostDTO postDTO) throws Exception {
        Post post = new Post(postDTO.getUserId(),
                             postDTO.getCaption(),
                             postDTO.getTimestamp(),
                             postDTO.getLocationCoordinates());
        try {
            post = postRepository.save(post);
        } catch (Exception e) {
            throw new Exception("Error creating post in database: " + e.getMessage(), e);
        }

        try {
            uploadPostImage(post.getUserId(), post.getPostId(), postDTO.getPostImage());
        } catch (Exception e) {
            postRepository.deleteById(post.getPostId());
            throw new Exception("Error storing post image: " + e.getMessage(), e);
        }

        return new PostDTO(post.getPostId(),
                           post.getUserId(),
                           postDTO.getPostImage(),
                           post.getCaption(),
                           post.getTimestamp(),
                           post.getLocationCoordinates());
    }

    public void deletePost(Integer postId) throws Exception {
        throwIfPostNotFound(postId);

        try {
            postRepository.deleteById(postId);
        } catch (Exception e) {
            throw new Exception("Error deleting post in database: " + e.getMessage(), e);
        }

        try {
            Integer userId = postRepository.getPostByPostId(postId).getUserId();
            deletePostImage(userId, postId);
        } catch (Exception e) {
            throw new Exception("Error deleting post image: " + e.getMessage(), e);
        }
    }

    private byte[] getPostImage(Integer userId, Integer postId) throws Exception {
        throwIfPostNotFound(postId);
        String imageKey = userId + "/" + postId;
        return s3Service.getObject(postImagesBucket,    //may throw
                                   imageKey);
    }

    //overwrites any preexisting object with matching key
    private void uploadPostImage(Integer userId, Integer postId, byte[] image) throws Exception {
        throwIfPostNotFound(postId);
        String imageKey = userId + "/" + postId;
        s3Service.putObject(postImagesBucket,   //may throw
                            imageKey,
                            image);
    }

    private void deletePostImage(Integer userId, Integer postId) throws Exception {
        throwIfPostNotFound(postId);
        String imageKey = userId + "/" + postId;
        s3Service.deleteObject(postImagesBucket,    //may throw
                               imageKey);
    }

    private void throwIfPostNotFound(Integer postId) throws NoSuchElementException {
        if (!postRepository.existsById(postId)) {
            throw new NoSuchElementException();
        }
    }

}
