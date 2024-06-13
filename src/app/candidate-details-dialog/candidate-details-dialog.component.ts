import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-details-dialog',
  templateUrl: './candidate-details-dialog.component.html',
  styleUrls: ['./candidate-details-dialog.component.scss']
})
export class CandidateDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
