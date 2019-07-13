import { Component, HostListener  } from '@angular/core';
import { interval } from 'rxjs';
import { AppConfigService } from './services/appConfig';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = this.appConfigService.appConfig.photoAlbumTitle;
  textStyle = this.appConfigService.appConfig.css.textStyle;
  imageStyle = this.appConfigService.appConfig.css.imageStyle;
  counter = interval(this.appConfigService.appConfig.photoDelayMs);
  photoNames = this.appConfigService.appConfig.imageNames;
  photoNumAr = [this.getRandomInt(this.photoNames.length)];
  curPhotoNum = 0;
  maxHistoryLen = 500;
  photoName = this.photoNames[this.curPhotoNum];
  picture = '/assets/photos/' + this.photoName;
  photoDate = this.getPhotoDate(this.photoName);
 
  constructor(private appConfigService: AppConfigService) {
    this.imageStyle['background-image'] = 'url(' + this.picture + ')';
  }
    
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {    
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.increment();
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.decrement();
    }
  }

  decrement() {
    if (this.curPhotoNum < this.photoNumAr.length - 1) {
      this.curPhotoNum++;
      this.updatePhoto();
    }
  }

  increment() {
    if (this.curPhotoNum > 0) {
      this.curPhotoNum--;
      this.updatePhoto();
    } else if (this.curPhotoNum == 0) {
      this.getNextImage();
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getMonthString(month) {
    switch (month) {
      case '01':
        return 'January';
      case '02':
        return 'February';
      case '03':
        return 'March';
      case '04':
        return 'April';
      case '05':
        return 'May';
      case '06':
        return 'June';
      case '07':
        return 'July';
      case '08':
        return 'August';
      case '09':
        return 'September';
      case '10':
        return 'October';
      case '11':
        return 'November';
      case '12':
        return 'December';
    }

    return ''
  }

  getPhotoDate(photoName) {
    var year = photoName.substring(4, 8);
    var month = photoName.substring(8, 10);
    var day = photoName.substring(10, 12);
    return this.getMonthString(month) + ' ' + day + ' ' + year ;
  }

  updatePhoto() {
    this.photoName = this.photoNames[this.photoNumAr[this.curPhotoNum]];
    this.picture = '/assets/photos/' + this.photoName;
    this.photoDate = this.getPhotoDate(this.photoName);
    this.imageStyle['background-image'] = 'url(' + this.picture + ')' ;
  }

  getNextImageNum() {
    if(this.photoNumAr.length > this.maxHistoryLen) {
      this.photoNumAr.pop();
    }
    this.photoNumAr.splice(0, 0, this.getRandomInt(this.photoNames.length));
  }
  
  getNextImage() {
    /* Only get the next image if we are on the newest image. */
    if(this.curPhotoNum == 0) {
      this.getNextImageNum();
      this.updatePhoto();
    }
  }
  
  ngOnInit() {
    this.counter.subscribe( x => 
      this.getNextImage()
      )
  }
}
