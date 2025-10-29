package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.controller;

import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.utility.JsonConverter;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service.PostService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import java.util.Date;
import java.util.List;

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

    @Test
    public void postController_getAllPosts_returnsAllPosts() throws Exception {
        // Setup
        List<Post> postServiceResponse = List.of(
                new Post(1, 1, "https://aws.amazon.com/s3/noahpost", "noahs post", new Date(), "394820485485030,384003985830"),
                new Post(2, 1, "https://aws.amazon.com/s3/noahsecondpost", "noahs second post", new Date(), "394820755485030,384075985830"),
                new Post(3, 4, "https://aws.amazon.com/s3/lanaspost", "lanas post", new Date(), "5345334232,78695875958"),
                new Post(4, 4, "https://aws.amazon.com/s3/lanassecondpost", "lanas second post", new Date(), "574857498394,79287593984"),
                new Post(5, 3, "https://aws.amazon.com/s3/vesselpost", "vessels post", new Date(), "57381929128,1231231231231")
        );
        Mockito.when(postService.getAllPosts()).thenReturn(postServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/posts"));

        // Assert: correct status
        response.andExpect(status().isOk());
        // Assert: number of objects in API response == number of objects received by postService
        String responseContentAsJSON = response.andReturn().getResponse().getContentAsString();
        List<Post> responseContentAsObjectList = jsonConverter.convertJsonToPostList(responseContentAsJSON);
        Assertions.assertEquals(responseContentAsObjectList.size(), postServiceResponse.size());
    }

    @Test
    public void postController_getAllPostsByUser_returnsAllPostsByUser() throws Exception {
        // Setup
        Integer userId = 4;
        List<Post> postServiceResponse = List.of(
                new Post(3, 4, "https://aws.amazon.com/s3/lanaspost", "lanas post", new Date(), "5345334232,78695875958"),
                new Post(4, 4, "https://aws.amazon.com/s3/lanassecondpost", "lanas second post", new Date(), "574857498394,79287593984")
        );
        Mockito.when(postService.getAllPostsByUser(userId)).thenReturn(postServiceResponse);

        // Action
        ResultActions response = mockMvc.perform(get("/posts/all-by-user")
                .queryParam("id", Integer.toString(userId)));

        // Assert: correct status
        response.andExpect(status().isOk());
        // Assert: number of objects in API response == number of objects received by postService
        String responseContentAsJSON = response.andReturn().getResponse().getContentAsString();
        List<Post> responseContentAsObjectList = jsonConverter.convertJsonToPostList(responseContentAsJSON);
        Assertions.assertEquals(postServiceResponse.size(), responseContentAsObjectList.size());
        // Assert: all returned posts are of the requested userId
        for (Post post : responseContentAsObjectList) {
            Assertions.assertEquals(userId, post.getUserId());
        }
    }

    @Test
    public void postController_createPost_returnsCreatedPost() throws Exception {
        // Setup
        Post post = new Post(null, 1, "image.com", "this is a caption", new Date(), "location");
        String postAsJSON = jsonConverter.convertPostToJSON(post);
        Post postServiceResponse = new Post(26, 1, "image.com", "this is a caption", new Date(), "location");
        Mockito.when(postService.createPost(post)).thenReturn(postServiceResponse); // simulate postId being generated

        // Action
        ResultActions response = mockMvc.perform(post("/posts/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(postAsJSON));

//        response.andExpect(status().isCreated());

    }
}