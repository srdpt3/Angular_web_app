package com.dustin.youtube.dto;


import com.dustin.youtube.model.VideoStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VideoDto {
//    private String videoId;
//    @NotBlank
//    private String userId;
//    @NotBlank
//    private String videoName;
//    @NotBlank
//    private String description;
//    @Size(min = 1)
//    private List<String> tags;
//    private VideoStatus videoStatus;
//    @NotBlank
//    private String url;
//    @NotBlank
//    private String thumbnailUrl;
//    @Min(value = 0)
//    private int likeCount;
//    @Min(value = 0)
//    private int dislikeCount;
//
//    private Integer viewCount;

    private String id;
    private String title;
    private String description;
    private List<String>  tags;
    private String videoUrl;
    private VideoStatus videoStatus;
    private String thumbnailUrl;
    private Integer likeCount;
    private Integer dislikeCount;
    private Integer viewCount;

}
