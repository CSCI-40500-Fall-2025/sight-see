package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostHttpResponse;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.User;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.repository.PostRepository;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final S3Service s3Service;

    @Value("${aws.buckets.post-images}") //TODO: is this appropriate? should s3Buckets.getPostImages be used instead?
    private String postImagesBucket;

    public PostService(PostRepository postRepository, S3Service s3Service) {
        this.postRepository = postRepository;
        this.s3Service = s3Service;
    }

    public List<Post> getAllPosts() throws Exception {
        return postRepository.findAll();    //may throw
    }

    public Post getPost(Integer postId) throws Exception {
        Post post = postRepository.getPostByPostId(postId); //may throw
        if (post != null) {
            return post;
        }
        throw new NoSuchElementException();
    }

    public List<Post> getAllPostsByUser(Integer userId) throws Exception {
        //TODO: Check if user exists
        return postRepository.getAllPostsByUserId(userId);  //may throw
        //TODO: get
    }

    //TODO: implement
    public List<Post> getAllNearbyPosts() {
        return null;
    }

    //TODO: return Post or PostHttpResponse?
    public Post createPost(PostHttpResponse postHttpResponse) throws Exception {
        Post post = new Post(postHttpResponse.getUserId(),
                             postHttpResponse.getCaption(),
                             postHttpResponse.getTimestamp(),
                             postHttpResponse.getLocationCoordinates());
        try {
            return postRepository.save(post);
        } catch (Exception e) {
            throw new Exception("Error creating post in database: " + e.getMessage(), e);
        }


        //TODO: try/catch with uploadPostImage(userID, postId, image)
        //TODO: if fails, undo post creation in database?
        //TODO: add
    }

    public void deletePost(Integer postId) throws Exception {
        if (!postRepository.existsById(postId)) {
            throw new NoSuchElementException();
        }
        postRepository.deleteById(postId);  //may throw
        //TODO: delete post image
    }

    //overwrites any preexisting object with matching key
    public void uploadPostImage(Integer userId, Integer postId, MultipartFile image) throws Exception {
        //TODO: throwIfPostNotFound(postId);
        String imageKey = userId + "/" + postId;
        s3Service.putObject(postImagesBucket,
                            imageKey,
                            image.getBytes());   //last argument may throw IOException
    }

    public byte[] getPostImage(Integer userId, Integer postId) throws Exception {
        //TODO: throwIfPostNotFound(postId);
        String imageKey = userId + "/" + postId;
        Post post = postRepository.getPostByPostId(postId);
        return s3Service.getObject(postImagesBucket,
                                   imageKey);
    }

}
