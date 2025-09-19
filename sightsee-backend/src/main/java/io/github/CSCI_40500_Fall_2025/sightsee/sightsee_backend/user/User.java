package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String name;
    private String username;
    private String email;
    private String password;
    private String profilePhotoUrl;


    public User() {
    }

    public User(Long userId, String name, String username, String email, String password, String profilePhotoUrl) {
        this.userId = userId;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.profilePhotoUrl = profilePhotoUrl;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePhotoUrl() {
        return profilePhotoUrl;
    }

    public void setProfilePhotoUrl(String profilePhotoUrl) {
        this.profilePhotoUrl = profilePhotoUrl;
    }

}