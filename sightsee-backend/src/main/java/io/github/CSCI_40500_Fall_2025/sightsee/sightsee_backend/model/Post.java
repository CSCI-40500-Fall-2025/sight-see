package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer postId = null;

    private Integer userId; // FK
    private String caption;
    private Date timestamp;
    private String locationCoordinates; // might want to split this into latitude and longitude

    public Post() {
    }

    public Post(Integer userId, String caption, Date timestamp, String locationCoordinates) {
        this.userId = userId;
        this.caption = caption;
        this.timestamp = timestamp;
        this.locationCoordinates = locationCoordinates;
    }

    public Integer getPostId() {
        return postId;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getLocationCoordinates() {
        return locationCoordinates;
    }

}
