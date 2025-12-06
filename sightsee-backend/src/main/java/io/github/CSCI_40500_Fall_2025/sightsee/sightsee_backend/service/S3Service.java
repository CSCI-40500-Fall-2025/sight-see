package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

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

    public byte[] getObject(String bucketName, String imageKey) throws Exception {
        throwIfKeyNotFound(bucketName, imageKey);

        GetObjectRequest getRequest = GetObjectRequest.builder()
                                                      .bucket(bucketName)
                                                      .key(imageKey)
                                                      .build();
        ResponseInputStream<GetObjectResponse> getResponse = s3Client.getObject(getRequest);

        return getResponse.readAllBytes(); //may throw IOException
    }

    //TODO: removeObject()

    private void throwIfKeyNotFound(String bucketName, String imageKey) throws NoSuchKeyException {
        HeadObjectRequest headRequest = HeadObjectRequest.builder()
                                                         .bucket(bucketName)
                                                         .key(imageKey)
                                                         .build();
        HeadObjectResponse headResponse = s3Client.headObject(headRequest); //throws NoSuchKeyException;
                // "Amazon S3 returns an HTTP status code 404 Not Found error" (AWS documentation)
    }

}
