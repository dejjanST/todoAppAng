import { DataService } from './../service/data.service';
import { Todo } from './../todo';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  id!: number;
  task: any;
  taskForm!: FormGroup;
  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: Todo) {
      this.task = data;
    }

  ngOnInit(): void {
    this.id = this.task.index;

      this.taskForm = this.fb.group({
        name: [this.task.name, [Validators.required, Validators.minLength(2)]],
        date: [this.task.date, Validators.required],
        status: [this.task.status, Validators.required]
      });
  }

  get f() {
    return this.taskForm.controls;
  }

  update() {
    const data = {
      id: this.id,
      todo: this.taskForm.value
    }
    this.dialogRef.close(data);
    //console.log(this.taskForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
