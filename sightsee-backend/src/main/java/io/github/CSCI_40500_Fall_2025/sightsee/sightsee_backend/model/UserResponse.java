package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model;

public class UserResponse {

    private Integer userId;
    private String name;
    private String username;
    private String email;
    private byte[] profilePhoto;

    public UserResponse() {}

    public UserResponse(Integer userId, String name, String username, String email, byte[] profilePhoto) {
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.email = email;
        this.profilePhoto = profilePhoto;
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

    public byte[] getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(byte[] profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

}
