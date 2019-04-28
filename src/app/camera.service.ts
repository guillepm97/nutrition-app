import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera) { }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const picture = await this.camera.getPicture(options);
    return `data:image/jpeg;base64,${picture}`;
  }
}
