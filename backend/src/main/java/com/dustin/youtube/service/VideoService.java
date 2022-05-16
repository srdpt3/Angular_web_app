package com.dustin.youtube.service;


import com.dustin.youtube.dto.CommentDto;
import com.dustin.youtube.dto.UploadVideoResponse;
import com.dustin.youtube.dto.VideoDto;
import com.dustin.youtube.exception.YoutubeCloneException;
import com.dustin.youtube.model.Comment;
import com.dustin.youtube.model.Video;
import com.dustin.youtube.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    private final UserService userService;

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


    public VideoDto editVideoMetadata(VideoDto videoDto) {
        var savedVideo = getVideoById(videoDto.getId());
        // Map the videoDto fields to video
        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        savedVideo.setVideoStatus(videoDto.getVideoStatus());

        // save the video  to the database
        videoRepository.save(savedVideo);
        return videoDto;
//        return videoMapper.map ToDto(video);
    }

    private Video getVideoById(String id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new YoutubeCloneException("Cannot find Video with ID - " + id));
    }


    public VideoDto getVideoDetails(String videoId) {
        Video savedVideo = getVideoById(videoId);

        increaseVideoCount(savedVideo);
        userService.addVideoToHistory(videoId);
        VideoDto videoDto = mapToVideoDto(savedVideo);
        return videoDto;
    }

    private void increaseVideoCount(Video savedVideo) {
        savedVideo.increaseViewCount();
        videoRepository.save(savedVideo);
    }


    public VideoDto likeVideo(String videoId) {
        Video videoById = getVideoById(videoId);

        if (userService.ifLikedVideo(videoId)) {
            videoById.decreaseLikeCount();
            userService.removedFromLikedVidoes(videoId);
        } else if (userService.ifDisLikedVideo(videoId)) {

            videoById.decreaseDisLikeCount();
            userService.removedFromDisLikedVidoes(videoId);
            videoById.increaseLikeCount();
            userService.addToLikedVideos(videoId);
        } else {
            videoById.increaseLikeCount();
            userService.addToLikedVideos(videoId);

        }

        videoRepository.save(videoById);
        VideoDto videoDto = mapToVideoDto(videoById);

        return videoDto;
    }


    public VideoDto disLikeVideo(String videoId) {
        Video videoById = getVideoById(videoId);
        userService.removedFromDisLikedVidoes(videoId);

        if (userService.ifDisLikedVideo(videoId)) {
            videoById.decreaseDisLikeCount();
            userService.removedFromDisLikedVidoes(videoId);
        } else if (userService.ifLikedVideo(videoId)) {
            videoById.decreaseLikeCount();
            userService.removedFromLikedVidoes(videoId);
            videoById.increaseDisLikeCount();
            userService.addToDisLikedVideos(videoId);
        } else {
            videoById.increaseDisLikeCount();
            userService.addToDisLikedVideos(videoId);
        }

        videoRepository.save(videoById);
        VideoDto videoDto = mapToVideoDto(videoById);

        return videoDto;



    }
    public void addComment(String videoId, CommentDto commentDto) {
        Video video = getVideoById(videoId);
        Comment comment = new Comment();
        comment.setText(commentDto.getCommentText());
        comment.setAuthor(commentDto.getAuthorId());
        video.addComment(comment);

        videoRepository.save(video);
    }

    public List<CommentDto> getAllComments(String videoId) {
        Video video = getVideoById(videoId);
        List<Comment> commentList = video.getCommentList();

        return commentList.stream().map(this::mapToCommentDto).toList();
    }

    private CommentDto mapToCommentDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        commentDto.setCommentText(comment.getText());
        commentDto.setAuthorId(comment.getAuthor());
        return commentDto;
    }
    private VideoDto mapToVideoDto(Video videoById) {
        VideoDto videoDto = new VideoDto();
        videoDto.setVideoUrl(videoById.getUrl());
        videoDto.setThumbnailUrl(videoById.getThumbnailUrl());
        videoDto.setId(videoById.getId());
        videoDto.setDescription(videoById.getTitle());
        videoDto.setDescription(videoById.getDescription());
        videoDto.setTags(videoById.getTags());
        videoDto.setVideoStatus(videoById.getVideoStatus());
        videoDto.setLikeCount(videoById.getLikes().get());
        videoDto.setDislikeCount(videoById.getDisLikes().get());
        videoDto.setViewCount(videoById.getViewCount().get());
        return videoDto;
    }

    public List<VideoDto> getAllVideos() {
        return videoRepository.findAll().stream().map(this::mapToVideoDto).toList();
    }
}
