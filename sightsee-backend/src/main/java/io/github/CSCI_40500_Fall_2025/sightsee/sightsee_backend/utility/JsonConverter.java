package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.utility;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.PostDTO;
import io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model.UserDTO;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JsonConverter {

    public JsonConverter() {}

    public PostDTO convertJsonToPostDto(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, new TypeReference<>() {
        });
    }

    public List<PostDTO> convertJsonToPostDtoList(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, new TypeReference<>() {
        });
    }

    public String convertPostDtoToJson(PostDTO postDto) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(postDto);
    }

    public UserDTO convertJsonToUserDto(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(jsonString, new TypeReference<>() {
        });
    }

}
