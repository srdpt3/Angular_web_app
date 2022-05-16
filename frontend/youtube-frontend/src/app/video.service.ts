import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UploadVideoResponse} from "./UploadVideoResponse";
import {VideoDto} from "./video-dto";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpClient: HttpClient) {
  }

  // @ts-ignore
  public uploadVideo(fileEntry: FileSystemFileEntry): Observable<UploadVideoResponse> {

    const formData = new FormData();
    // @ts-ignore
    formData.append('file', fileEntry, fileEntry.name)
    return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/video/upload', formData);
    // return fileEntry.file((file => {
    //
    //   return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/video/upload', fd,
    //     {
    //       headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    //     });
    // }))
  }

  public uploadThumbnail(fileEntry: File, videoId: string): Observable<string> {

    const formData = new FormData();
    // @ts-ignore
    formData.append('file', fileEntry, fileEntry.name)
    formData.append('videoId', videoId);
    return this.httpClient.post('http://localhost:8080/api/video/thumbnail', formData, {
      responseType: 'text'
    });
    // return fileEntry.file((file => {
    //
    //   return this.httpClient.post<UploadVideoResponse>('http://localhost:8080/api/video/upload', fd,
    //     {
    //       headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    //     });
    // }))
  }


  getVideo(videoId: string): Observable<VideoDto> {
    return this.httpClient.get<VideoDto>('http://localhost:8080/api/video/' + videoId);
  }

  saveVideo(videoMetData: VideoDto): Observable<VideoDto> {
    return this.httpClient.put<VideoDto>("http://localhost:8080/api/video/", videoMetData,
      {
      })
  }

  getAllVideos(): Observable<Array<VideoDto>> {
    return this.httpClient.get<Array<VideoDto>>("http://localhost:8080/api/video/");
  }

}
