package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.utility;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostCreationRequest;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostResponse;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JsonConverter {

    public JsonConverter() {}

    public PostResponse convertJsonToPostDto(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, new TypeReference<>() {
        });
    }

    public List<PostResponse> convertJsonToPostDtoList(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, new TypeReference<>() {
        });
    }

    public String convertPostDtoToJson(PostResponse postResponse) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(postResponse);
    }

        public String convertPostDtoToJson(PostCreationRequest postCreationRequest) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(postCreationRequest);
    }

    public UserResponse convertJsonToUserDto(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, new TypeReference<>() {
        });
    }

}
