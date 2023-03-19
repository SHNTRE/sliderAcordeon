
import { Component, OnInit, Inject } from '@angular/core';
import { PylService } from '../planyourlife.service';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Key } from '../Key';

export interface DialogData {
  key: string
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './app-sign-in.component.html',
  styleUrls: ['./app-sign-in.component.css']
})
export class AppSignInComponent implements OnInit {
  ngOnInit() {
  }

  
  
  constructor(private pylService: PylService, private http: HttpClient, public dialog: MatDialog) { }

  openAuthKeyPopup(): void {
    
    var key = new Key();
    const dialogRef = this.dialog.open(AuthKeyPopup, {
      width: '500px',
      data: {key: key.text}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      key.text = result;
      console.log(key.text);
      this.pylService.sendAuthKey(key);
    });
  }
}

@Component({
  selector: 'auth-key-popup',
  templateUrl: 'AuthKeyPopup.html',
  styleUrls: ['./app-sign-in.component.css']
})
export class AuthKeyPopup {
  key: string;
  constructor(
    public dialogRef: MatDialogRef<AuthKeyPopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(this.key);
  }

}