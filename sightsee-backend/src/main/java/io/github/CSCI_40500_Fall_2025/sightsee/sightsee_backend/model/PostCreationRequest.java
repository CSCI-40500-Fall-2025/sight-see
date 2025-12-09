package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.model;

import java.util.Date;

public class PostCreationRequest {

    private final Integer userId;
    private final String caption;
    private final Date timestamp;
    private final String locationCoordinates;

    public PostCreationRequest(Integer userId, String caption, Date timestamp, String locationCoordinates) {
        this.userId = userId;
        this.caption = caption;
        this.timestamp = timestamp;
        this.locationCoordinates = locationCoordinates;
    }

    public Integer getUserId() {
        return userId;
    }

    public String getCaption() {
        return caption;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public String getLocationCoordinates() {
        return locationCoordinates;
    }

}
