package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostDTO;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.utility.JsonConverter;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.PostService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = PostController.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)
public class PostControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PostService postService;

    private final JsonConverter jsonConverter = new JsonConverter();

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Test
    public void test_postController_getAllPosts_returnsAllPosts() throws Exception {
        // Setup
        List<PostDTO> postServiceResponse = List.of(
                new PostDTO(1, 1, "https://aws.amazon.com/s3/noahpost".getBytes(), "noahs post", new Date(), "394820485485030,384003985830"),
                new PostDTO(2, 1, "https://aws.amazon.com/s3/noahsecondpost".getBytes(), "noahs second post", new Date(), "394820755485030,384075985830"),
                new PostDTO(3, 4, "https://aws.amazon.com/s3/lanaspost".getBytes(), "lanas post", new Date(), "5345334232,78695875958"),
                new PostDTO(4, 4, "https://aws.amazon.com/s3/lanassecondpost".getBytes(), "lanas second post", new Date(), "574857498394,79287593984"),
                new PostDTO(5, 3, "https://aws.amazon.com/s3/vesselpost".getBytes(), "vessels post", new Date(), "57381929128,1231231231231")
        );
        Mockito.when(postService.getAllPosts()).thenReturn(postServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/posts"));

        try {
            // Assert: correct status
            response.andExpect(status().isOk());
            // Assert: number of objects in API response == number of objects received by postService
            String responseContentAsJson = response.andReturn().getResponse().getContentAsString();
            List<PostDTO> responseContentAsObjectList = jsonConverter.convertJsonToPostDtoList(responseContentAsJson);
            Assertions.assertEquals(responseContentAsObjectList.size(), postServiceResponse.size());
        } catch (Exception e) {
            logger.error("Test to get all posts failed");
            throw e;
        }
        logger.info("Test to get all posts succeeded");
    }

    @Test
    public void test_postController_getAllPostsByUser_returnsAllPostsByUser() throws Exception {
        // Setup
        Integer userId = 4;
        List<PostDTO> postServiceResponse = List.of(
                new PostDTO(3, userId, "https://aws.amazon.com/s3/lanaspost".getBytes(), "lanas post", new Date(), "5345334232,78695875958"),
                new PostDTO(4, userId, "https://aws.amazon.com/s3/lanassecondpost".getBytes(), "lanas second post", new Date(), "574857498394,79287593984")
        );
        Mockito.when(postService.getAllPostsByUser(userId)).thenReturn(postServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/posts/userId=" + userId));

        try {
            // Assert: correct status
            response.andExpect(status().isOk());
            // Assert: number of objects in API response == number of objects received by postService
            String responseContentAsJson = response.andReturn().getResponse().getContentAsString();
            List<PostDTO> responseContentAsObjectList = jsonConverter.convertJsonToPostDtoList(responseContentAsJson);
            Assertions.assertEquals(postServiceResponse.size(), responseContentAsObjectList.size());
            // Assert: all returned posts are of the requested userId
            for (PostDTO post : responseContentAsObjectList) {
                Assertions.assertEquals(userId, post.getUserId());
            }
        } catch (Exception e) {
            logger.error("Test to get all posts by user failed");
            throw e;
        }
        logger.info("Test to get all posts by user succeeded");
    }

    @Test
    public void test_postController_createPost_returnsCreatedPost() throws Exception {
        // Setup
        Integer postId = 26;
        Integer userId = 1;
        byte[] postImage = "image.com".getBytes();
        String caption = "this is a caption";
        Date timestamp = new Date();
        String locationCoordinates = "location";
        PostDTO post = new PostDTO(postId, userId, postImage, caption, timestamp, locationCoordinates);
        String postAsJson = jsonConverter.convertPostDtoToJson(post);
        PostDTO postServiceResponse = new PostDTO(postId, userId, postImage, caption, timestamp, locationCoordinates);
        Mockito.when(postService.createPost(any(PostDTO.class))).thenReturn(postServiceResponse); // simulate postId being generated

        // Action
        ResultActions response = mockMvc.perform(post("/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(postAsJson));

        try {
            // Assert: correct status
            response.andExpect(status().isCreated());
            // Assert: returned post matches the post passed into controller
            String responseContentAsJson = response.andReturn().getResponse().getContentAsString();
            PostDTO responseContentAsPostObject = jsonConverter.convertJsonToPostDto(responseContentAsJson);
            Assertions.assertEquals(post.getPostId(), responseContentAsPostObject.getPostId());
            Assertions.assertEquals(post.getUserId(), responseContentAsPostObject.getUserId());
            Assertions.assertArrayEquals(post.getPostImage(), responseContentAsPostObject.getPostImage());
            Assertions.assertEquals(post.getCaption(), responseContentAsPostObject.getCaption());
            Assertions.assertEquals(post.getTimestamp(), responseContentAsPostObject.getTimestamp());
            Assertions.assertEquals(post.getLocationCoordinates(), responseContentAsPostObject.getLocationCoordinates());
        } catch (Exception e) {
            logger.error("Test to create post failed");
            throw e;
        }
        logger.info("Test to create post succeeded");
    }

    @Test
    public void test_postController_deletePost_returnsStatus204() throws Exception {
        // Setup
        Integer postId = 5;
        Mockito.doNothing().when(postService).deletePost(postId);

        // Action
        ResultActions response = mockMvc.perform(delete("/posts/" + postId));

        try {
            // Assert: successful deletion returns 204 status
            response.andExpect(status().isNoContent());
        } catch (Exception e) {
            logger.error("Test to successfully delete post failed");
            throw new RuntimeException(e);
        }
        logger.info("Test to successfully delete post succeeded");
    }

    @Test
    public void test_postController_deletePost_returnsStatus500() throws Exception {
        // Setup
        Integer postId = 6;
        Mockito.doThrow(new NoSuchElementException()).when(postService).deletePost(postId);

        // Action
        ResultActions response = mockMvc.perform(delete("/posts/" + postId));

        try {
            // Assert: failed deletion returns 500 status
            response.andExpect(status().isInternalServerError());
        } catch (Exception e) {
            logger.error("Test to fail to delete post failed");
            throw e;
        }
        logger.info("Test to fail to delete post succeeded");
    }
}