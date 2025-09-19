package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.post;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postId;
    private Long userId; // FK
    private String imageUrl;
    private String caption;
    private Date timestamp;
    private String locationCoordinates; // might want to split this into latitude and longitude

    public Post() {
    }

    public Post(Long postId, Long userId, String imageUrl, String caption, Date timestamp, String locationCoordinates) {
        this.postId = postId;
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.caption = caption;
        this.timestamp = timestamp;
        this.locationCoordinates = locationCoordinates;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
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

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public String getLocationCoordinates() {
        return locationCoordinates;
    }

    public void setLocationCoordinates(String locationCoordinates) {
        this.locationCoordinates = locationCoordinates;
    }

}
