package com.dustin.youtube.service;


import com.dustin.youtube.dto.UploadVideoResponse;
import com.dustin.youtube.model.Video;
import com.dustin.youtube.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public UploadVideoResponse uploadVideo(MultipartFile multipartFile) {
        String url = s3Service.upload(multipartFile);
        var video = new Video();
        video.setUrl(url);
//        Objects.requireNonNull(userId);
//        video.setUserId(userId);
        videoRepository.save(video);
        return new UploadVideoResponse(video.getId(), url);
    }


}
