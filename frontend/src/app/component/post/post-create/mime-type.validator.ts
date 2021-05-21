import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const mimeType = (control: AbstractControl):Promise<{[key: string]:any}> | Observable<{[key: string]:any}>=> {
  const file = control.value as File;
  const fileReader : any = new FileReader();
  const frObs = new Observable((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener("loadend", () => {
      const arr = new Uint8Array(fileReader.result).subarray(0, 4);
      let header = "";
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          isValid = true;
        case "ffd8ffde0":
        case "ffd8ffde1":
        case "ffd8ffde2":
        case "ffd8ffde3":
        case "ffd8ffde8":
          isValid = true;
        default:
          isValid = false;
          break;
      }
      if (isValid) {
        observer.next(null);
      }
      else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;

}
