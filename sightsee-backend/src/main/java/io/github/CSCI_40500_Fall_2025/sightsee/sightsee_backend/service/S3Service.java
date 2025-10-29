package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import java.io.IOException;

@Service
public class S3Service {

    private final S3Client s3Client;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public void putObject(String bucketName, String imageKey, byte[] image) {
        PutObjectRequest putRequest = PutObjectRequest.builder()
                                                      .bucket(bucketName)
                                                      .key(imageKey)
                                                      .build();
        s3Client.putObject(putRequest, RequestBody.fromBytes(image));
    }

    public byte[] getObject(String bucketName, String imageKey) {
        throwIfKeyNotFound(bucketName, imageKey);

        GetObjectRequest getRequest = GetObjectRequest.builder()
                                                      .bucket(bucketName)
                                                      .key(imageKey)
                                                      .build();
        ResponseInputStream<GetObjectResponse> getResponse = s3Client.getObject(getRequest);
        try {
            return getResponse.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e); //TODO: narrow exception type
        }
    }

    //TODO: removeObject()

    private void throwIfKeyNotFound(String bucketName, String imageKey) {
        HeadObjectRequest headRequest = HeadObjectRequest.builder()
                                                         .bucket(bucketName)
                                                         .key(imageKey)
                                                         .build();
        try {
            HeadObjectResponse headResponse = s3Client.headObject(headRequest);
        } catch (NoSuchKeyException e) { //"Amazon S3 returns an HTTP status code 404 Not Found error" (AWS documentation)
            throw new RuntimeException(e); //TODO: narrow exception type
        }
    }

}
