import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import {Router} from "@angular/router";
import {VideoService} from "../video.service";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {

  public files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  constructor(private videoService: VideoService, private router: Router) {
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileUploaded = true;
      }
    }
  }


  uploadVideo() {
    if (this.fileEntry !== undefined) {
      this.videoService.uploadVideo(this.fileEntry).subscribe(data => {
        console.log("uploadVideo : " + data);
        this.router.navigateByUrl("/save-video-details/" + data.videoId);
      })
    }
  }
}
