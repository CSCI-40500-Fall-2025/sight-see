package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model;

import java.util.Date;

public class PostResponse {

    private Integer postId;
    private byte[] postImage;
    private Integer userId;
    private String caption;
    private Date timestamp;
    private String locationCoordinates;

    public PostResponse() {}

    public PostResponse(Integer postId, byte[] postImage, Integer userId, String caption, Date timestamp, String locationCoordinates) {
        this.postId = postId;
        this.postImage = postImage;
        this.userId = userId;
        this.caption = caption;
        this.timestamp = timestamp;
        this.locationCoordinates = locationCoordinates;
    }

    public Integer getPostId() {
        return postId;
    }

    public void setPostId(Integer postId) {
        this.postId = postId;
    }

    public byte[] getPostImage() {
        return postImage;
    }

    public void setPostImage(byte[] postImage) {
        this.postImage = postImage;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
