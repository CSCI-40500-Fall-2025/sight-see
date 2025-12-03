package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model;

import java.util.Date;

public class PostHttpResponse {

    private Integer postId;
    private Integer userId;
    //private String username; //String name?? was added to User model at some point
    private byte[] postImage;
    private String caption;
    private Date timestamp;
    private String locationCoordinates;

    public PostHttpResponse(Integer postId, Integer userId, byte[] postImage, String caption, Date timestamp, String locationCoordinates) {
        this.postId = postId;
        this.userId = userId;
        this.postImage = postImage;
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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public byte[] getPostImage() {
        return postImage;
    }

    public void setPostImage(byte[] postImage) {
        this.postImage = postImage;
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
