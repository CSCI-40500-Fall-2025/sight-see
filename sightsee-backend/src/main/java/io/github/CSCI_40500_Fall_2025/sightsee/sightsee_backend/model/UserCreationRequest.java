package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model;

public class UserCreationRequest {

    private final String username;
    private final String password;
    private final String name;
    private final String email;

    public UserCreationRequest(String username, String password, String name, String email) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
