import { Todo } from './../todo';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = [];
  searchText!: any;
  taskForm!: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
      date: ["", Validators.required],
      status: ["", Validators.required]
    })
    this.todos = this.dataService.getAllTodos();
  }

  get f() {
    return this.taskForm.controls;
  }

  addTask() {
    if(this.taskForm.valid) {
      this.dataService.addTodo(this.taskForm.value);
      this.taskForm.reset();
    }
  }

  editItem(item: any, index: number) {

    const dialogConfing = new MatDialogConfig();

    dialogConfing.disableClose = true;
    dialogConfing.autoFocus = true;
    dialogConfing.width = '600px';
    dialogConfing.height = '300px';

    dialogConfing.data = {
      index: index,
      name: item.name,
      date: item.date,
      status: item.status
    }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfing);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          console.log(data);

          this.dataService.updateTodo(data.id, data.todo);
        }
      }
    )
  }

  deleteItem(index: number) {
    this.dataService.deleteTodo(index);
  }

  sortByColumn(sortOption: string) {
    sortOption === 'name' ? this.todos.sort((a: any, b: any) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1) :
    sortOption === 'status' ? this.todos.sort((a: any, b: any) => (a.status > b.status) ? 1 : -1) : this.todos.sort((a: any, b: any) => (a.date > b.date) ? 1 : -1)
  }
}
