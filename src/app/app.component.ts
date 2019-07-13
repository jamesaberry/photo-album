import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { AppConfigService } from './services/appConfig';

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
  photoName = this.photoNames[this.curPhotoNum];
  picture = '/assets/photos/' + this.photoName;
  photoDate = this.getPhotoDate(this.photoName);
 
  constructor(private appConfigService: AppConfigService) {
    this.imageStyle['background-image'] = 'url(' + this.picture + ')';
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

  getNextImageNum() {
    if(this.photoNumAr.length > 5) {
      this.photoNumAr.pop();
    }
    this.photoNumAr.splice(0, 0, this.getRandomInt(this.photoNames.length));
  }

  
  getImage() {
    /* Only get the next image if we are on the newest image. */
    if(this.curPhotoNum == 0) {
      this.getNextImageNum();
      this.photoName = this.photoNames[this.photoNumAr[this.curPhotoNum]];
      this.picture = '/assets/photos/' + this.photoName;
      this.photoDate = this.getPhotoDate(this.photoName);
      this.imageStyle['background-image'] = 'url(' + this.picture + ')' ;
    }
    console.log(this.curPhotoNum);
    console.log(this.photoNumAr);
  }
  
  ngOnInit() {
    this.counter.subscribe( x => 
      this.getImage()
      )
  }
}
