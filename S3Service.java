package com.unillanos.main.services;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.unillanos.main.config.AwsConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class S3Service {

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private AwsConfig awsConfig;

    public String uploadImage(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

        InputStream inputStream = file.getInputStream();

        // Crear metadata
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        // Subir el archivo al bucket
        amazonS3.putObject(new PutObjectRequest(awsConfig.getBucketName(), fileName, inputStream, metadata));

        // Obtener y retornar la URL pública de la imagen
        return "https://s3." + awsConfig.getRegion() + ".amazonaws.com/" +
                awsConfig.getBucketName() + "/" + fileName;

    }

    public void deleteImage(String imageUrl) {
        try {
            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            amazonS3.deleteObject(awsConfig.getBucketName(), fileName);
            System.out.println("Imagen eliminada correctamente de S3: " + fileName);
        } catch (Exception e) {
            System.out.println("Error al eliminar la imagen de S3: " + e.getMessage());
            throw new RuntimeException("Error al eliminar la imagen de S3", e);
        }
    }

}
