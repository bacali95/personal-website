import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor(private dialogRef: NbDialogRef<ConfirmDialogComponent>) {
  }

  ngOnInit() {
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
