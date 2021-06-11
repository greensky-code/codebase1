import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Source {
  value: string;
  viewValue: string;
}

interface Destination {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  selectedSource: any = []
  selectedDest: any = []
  selectedFiles!: FileList | undefined;
  currentFile!: File | undefined | null;
  progress = 0;
  message = '';

  fileInfos!: Observable<any>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles!.item(0);
    this.uploadService.upload(this.currentFile!).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total!);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined;
      });

      this.selectedFiles = undefined;
  }

  source: Source[] = [
    { value: 'value-0', viewValue: 'Value 0' },
    { value: 'value-1', viewValue: 'Value 1' },
    { value: 'value-2', viewValue: 'Value 2' },
    { value: 'value-3', viewValue: 'Value 3' },
    { value: 'value-4', viewValue: 'Value 4' }

  ];

  destination: Destination[] = [
    { value: 'value-0', viewValue: 'Value 0' },
    { value: 'value-1', viewValue: 'Value 1' },
    { value: 'value-2', viewValue: 'Value 2' },
    { value: 'value-3', viewValue: 'Value 3' },
    { value: 'value-4', viewValue: 'Value 4' }

  ];

  finalFileObj = {
    fileName: '',
    dropdownSrc: '',
    dropdownDest: ''
  }

  finalArray = [
    {
      fileName: '',
      dropdownSrc: '',
      dropdownDest: ''
    }
  ]

  fileDetails(file: any) {
    let fileTosend = {
      fileName: '',
      dropdownSrc: '',
      dropdownDest: ''
    }
    this.finalArray.filter(obj => {
      if (obj.fileName == file.name) {
        fileTosend = obj
      }
      if (obj.fileName == "") {
        fileTosend.fileName = file.name
      }
    });
    this.uploadService.postFile(fileTosend).subscribe(response => {
      console.log(response);
      this.finalFileObj = {
        fileName: '',
        dropdownSrc: '',
        dropdownDest: ''
      }
      this.finalArray = [
        {
          fileName: '',
          dropdownSrc: '',
          dropdownDest: ''
        }
      ]
    }, error => {
      console.log(error);

    })
  }

  setSelectedSource(file: any, source: any, index: any) {
    this.finalArray[index] = {
      fileName: file.name,
      dropdownSrc: source[index],
      dropdownDest: this.finalArray[index]?.dropdownDest
    }
  }
  setSelectedDest(file: any, dest: any, index: any) {
    this.finalArray[index] = {
      fileName: file.name,
      dropdownSrc: this.finalArray[index]?.dropdownSrc,
      dropdownDest: dest[index]
    }
  }

}
