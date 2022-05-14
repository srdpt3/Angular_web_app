package com.dustin.youtube.service;


import com.dustin.youtube.dto.UploadVideoResponse;
import com.dustin.youtube.dto.VideoDto;
import com.dustin.youtube.exception.YoutubeCloneException;
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

    public String uploadThumbnail(MultipartFile multipartFile, String videoId) {
        var video = getVideoById(videoId);
        String url = s3Service.upload(multipartFile);
        video.setThumbnailUrl(url);
        videoRepository.save(video);
        return url;
    }


    public VideoDto editVideoMetadata(VideoDto videoMetaDataDto) {
        var video = getVideoById(videoMetaDataDto.getVideoId());
        video.setTitle(videoMetaDataDto.getVideoName());
        video.setDescription(videoMetaDataDto.getDescription());
        video.setUrl(videoMetaDataDto.getUrl());
        // Ignore Channel ID as it should not be possible to change the Channel of a Video
        video.setTags(videoMetaDataDto.getTags());
        video.setVideoStatus(videoMetaDataDto.getVideoStatus());
        // View Count is also ignored as its calculated independently
        videoRepository.save(video);
        return videoMetaDataDto;
//        return videoMapper.map ToDto(video);
    }

    private Video getVideoById(String id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new YoutubeCloneException("Cannot find Video with ID - " + id));
    }


    public VideoDto getVideoDetails(String videoId) {
        Video savedVideo = getVideoById(videoId);
        VideoDto videoDto = new VideoDto();
        videoDto.setThumbnailUrl(savedVideo.getThumbnailUrl());
//        videoDto.setId(savedVideo.getId());
        videoDto.setUrl(savedVideo.getUrl());
        videoDto.setVideoId(savedVideo.getId());
        videoDto.setDescription(savedVideo.getDescription());
        videoDto.setVideoStatus(savedVideo.getVideoStatus());
        videoDto.setTags(savedVideo.getTags());
        videoDto.setVideoName(savedVideo.getTitle());
        return videoDto;
    }


    public VideoDto likeVideo(String videoId){
        Video videoById = getVideoById(videoId);

        return null;
    }

}
