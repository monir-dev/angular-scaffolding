import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import Swal from 'sweetalert2';


import { IconSuccess, IconError, IconInfo, IconQuestion, IconWarning } from '../models/constantVariables';



@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  alert(config) {
    Swal.fire({
        position: config.position,
        icon: config.icon,
        title: config.title,
        showConfirmButton: false,
        timer: 1500
      });
  }

  toastAlert(config) {

    // let toastPosition = 'top-end';
    // if(config.position) toastPosition = config.position;

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: config.icon,
      title: config.title
    })
  }

}


export class AlertConfig {
    icon: string;
    title: string;
    position: string = "top-end";
}

// export enum MouseButton {
//   LEFT = 1,
//   MIDDLE = 2,
//   RIGHT = 4
// }

