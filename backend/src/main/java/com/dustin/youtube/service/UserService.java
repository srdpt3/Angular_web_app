package com.dustin.youtube.service;

import com.dustin.youtube.dto.UserInfoDto;
import com.dustin.youtube.model.User;
import com.dustin.youtube.model.Video;
import com.dustin.youtube.repository.UserRepository;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@RequiredArgsConstructor
public class UserService {
    @Value("${auth0.userinfoEndpoint}")
    private String userInfoEndpoint;

    private final UserRepository userRepository;

    public void registerUser(String tokenValue) {
        // Make a call to the userInfo EndPoint
        HttpRequest httpRequest = HttpRequest.newBuilder()
                .GET().uri(URI.create(userInfoEndpoint))
                .setHeader("Authorization", String.format("Bearer %s", tokenValue))
                .build();
        HttpClient httpClient =
                HttpClient.newBuilder().version(HttpClient.Version.HTTP_2).build();

        try {
            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            String body = response.body();
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            UserInfoDto userInfoDto = objectMapper.readValue(body, UserInfoDto.class);

            User user = new User();
            user.setFirstName(userInfoDto.getGivenName());
            user.setLastName(userInfoDto.getFamilyName());
            user.setFullName(userInfoDto.getName());
            user.setEmailAddress(userInfoDto.getEmail());
            user.setSub(userInfoDto.getSub());

            userRepository.save(user);

        } catch (Exception e) {
            throw new RuntimeException("Exception occurred while registering user");
        }
        //


    }

    public User getCurrentUser() {

        String sub =
                ((Jwt) (SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getClaim("sub");
        return userRepository.findBySub(sub)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find an user for sub " + sub));

    }

    public void addToLikedVideos(String videoById) {

        User currentUser = getCurrentUser();
        currentUser.addToLikedVideos(videoById);
        userRepository.save(currentUser);
    }

    public boolean ifLikedVideo(String videoId) {
        return getCurrentUser().getLikedVideos().stream().anyMatch(likedVideo -> likedVideo.equals(videoId));
    }
    public boolean ifDisLikedVideo(String videoId) {
        return getCurrentUser().getLikedVideos().stream().anyMatch(disLikedVideo -> disLikedVideo.equals(videoId));
    }

    public void removedFromLikedVidoes(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromLikedVideos(videoId);
        userRepository.save(currentUser);

    }

    public void removedFromDisLikedVidoes(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.removeFromDisLikedVideo(videoId);
        userRepository.save(currentUser);
    }

    public void addToDisLikedVideos(String videoId) {

        User currentUser = getCurrentUser();
        currentUser.addToDisLikedVideo(videoId);
        userRepository.save(currentUser);
    }

    public void addVideoToHistory(String videoId) {
        User currentUser = getCurrentUser();
        currentUser.addToVideoHistory(videoId);
        userRepository.save(currentUser);
    }
}
