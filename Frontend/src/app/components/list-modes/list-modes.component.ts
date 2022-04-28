import { Component, OnInit } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Mode } from 'src/app/models/mode';
import { User } from 'src/app/models/user';
import { ModeService } from 'src/app/service/mode.service';
import { Toast, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-list-modes',
  templateUrl: './list-modes.component.html',
  styleUrls: ['./list-modes.component.css']
})
export class ListModesComponent implements OnInit {

  listModes: Mode[] = [];

  constructor(private _modeService: ModeService, private toastr: ToastrService, private _userService: UserService) { 

  }

  ngOnInit(): void {   
    this.getModes();
  }

  getModes(){
    this._modeService.getModes().subscribe(data => {
      console.log("getModes() successful");
      console.log(data);
      this.listModes = data;
    }, error => {
      console.log(error);
    })
  }

  deleteMode(nameUser: string){
    const confirmDelete = confirm("The Mode of "+nameUser+" will be deleted, do you want to continue?");
    if(confirmDelete===true){
      this._modeService.deleteMode(nameUser).subscribe(data => {
        this.toastr.success('Mode successfully deleted', 'Mode deleted');
        this.getModes();
      }, error => {
        this.toastr.error("Mode can not be deleted, please try again","Error deleting mode");
        console.log(error);
      })
    }    
  }

}
