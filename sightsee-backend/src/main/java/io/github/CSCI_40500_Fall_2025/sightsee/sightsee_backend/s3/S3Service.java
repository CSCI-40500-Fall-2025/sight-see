package io.github.CSCI_40500_Fall_2025.sightsee.sightsee_backend.s3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Service
public class S3Service {

    private final S3Client s3Client;

//    @Value("${aws.bucket-name}")
//    private String bucketName;

    @Autowired
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
        GetObjectRequest getRequest = GetObjectRequest.builder()
            .bucket(bucketName)
            .key(imageKey)
            .build();
        ResponseInputStream<GetObjectResponse> getResponse = s3Client.getObject(getRequest);
        try {
            return getResponse.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
