import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';



export interface UsersData {
  name: string;
  id: number;
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  constructor(private dialogRef: MatDialogRef<HomeComponent>) {}

  ngOnInit() {

  }

  save() {
      this.dialogRef.close(true);
  }

  close() {
      this.dialogRef.close();
  }
}

