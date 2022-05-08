import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {VideoService} from "../video.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoDto} from "../video-dto";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent {

  saveVideoForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('')
  selectable = true;
  removable = true;
  addOnBlur = true;
  tags: string[] = [];
  showVideoUrl = false;
  videoUrlAvailable = false;
  videoUrl!: string;
  thumbnailUrl!: string;
  videoId!: string;
  selectedFile!: File;
  selectedFileName = '';
  uploadThumbnailSubscription!: Subscription;
  fileUploaded!: boolean;
  fileSelected!: boolean;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  constructor(private videoService: VideoService, private route: ActivatedRoute,
              private matSnackBar: MatSnackBar) {
    this.videoId = this.route.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      console.log("data.url"+  data.url)
      this.videoUrl = data.url;
      this.thumbnailUrl = data.thumbnailUrl;
    })
    this.saveVideoForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected  = true
  }

  onUpload() {
    this.uploadThumbnailSubscription = this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
      .subscribe(data => {
        console.log(data);
        // this.thumbnailUploaded.subscribe(() => {
        this.matSnackBar.open("Thumbnail Uploaded Successfully", "OK");
        //   this.fileUploaded = true;
        // });
      });
  }

  saveVideo() {
    // const userId = this.authService.getUserId();
    const videoMetData: VideoDto = {
      "videoId": this.videoId,
      "userId": 'Test', //FIXME: check why userId is blank
      "videoName": this.saveVideoForm.get('title')?.value,
      "description": this.saveVideoForm.get('description')?.value,
      "tags": this.tags,
      "videoStatus": this.saveVideoForm.get('videoStatus')?.value,
      "url": this.videoUrl,
      "thumbnailUrl": this.thumbnailUrl,
      "likeCount": 0,
      "dislikeCount": 0
    }

    this.videoService.saveVideo(videoMetData).subscribe(data => {
      this.showVideoUrl = true;
      this.matSnackBar.open("Video Metadata Updated Successfully", "OK");
    });
  }
}
