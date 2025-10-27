package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.utility;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.Post;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JsonConverter {

    public JsonConverter() {

    }

    public List<Post> convertJsonToPostList(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Post> posts = objectMapper.readValue(jsonString, new TypeReference<List<Post>>() {});
        return posts;
    }

}
