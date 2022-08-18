import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'safeWebContent'
  })
  export class SafeWebContentPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }
    transform(value: string) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
  }
  @Pipe({
    name: 'safeRessourceContent'
  })
  export class SafeRessourceContentPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }
    transform(value: string) {
        let  data = 'data:application/pdf;base64,'+value
        return this.sanitized.bypassSecurityTrustResourceUrl(data);
        
    }
  }

  @Pipe({
    name: 'blobToDataURL'
  })
  export class blobToDataURL implements PipeTransform {
    constructor() {
    }
    transform(blob: any) {
      return new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            resolve(e?.target?.result);
        }
        reader.readAsDataURL(blob);
    });
    }
  }