import {Component, OnInit} from '@angular/core';
import {VideoService} from "../video.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  videoId!: string
  videoUrl!: string
  videoTitle!: string
  videoDescription!: string
  videoAvailable: boolean = false;
  tags: Array<string> = []

  constructor(private videoService: VideoService, private route: ActivatedRoute) {
    this.videoId = this.route.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      console.log("data.url  "+  data.url)
      this.videoUrl = data.url;
      this.videoAvailable = true
      this.videoTitle = data.videoName;
      this.videoDescription = data.description;
      this.tags = data.tags;
    })
  }

  ngOnInit(): void {


  }

}

