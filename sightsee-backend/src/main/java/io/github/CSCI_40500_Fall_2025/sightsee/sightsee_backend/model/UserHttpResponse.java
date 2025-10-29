package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model;

public class UserHttpResponse {

    private Integer userId;
    private String name;
    private String username;
    private String email;
    private String profilePhotoUrl;


    public UserHttpResponse() {

    }

    public UserHttpResponse(Integer userId, String name, String username, String email, String profilePhotoUrl) {
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.email = email;
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }
}
