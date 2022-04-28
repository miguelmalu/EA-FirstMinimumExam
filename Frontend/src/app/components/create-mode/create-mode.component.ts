import { Component, OnInit } from '@angular/core';
import { identifierName } from '@angular/compiler';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { empty, isEmpty } from 'rxjs';
import { ModeService } from 'src/app/service/mode.service';
import { Mode } from 'src/app/models/mode';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-create-mode',
  templateUrl: './create-mode.component.html',
  styleUrls: ['./create-mode.component.css']
})
export class CreateModeComponent implements OnInit {
  modeForm: FormGroup;
  title = "Create Mode";
  username: string | null;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private toastr: ToastrService,
              private _userService: UserService,
              private _modeService: ModeService,
              private aRouter: ActivatedRoute) { 
    this.modeForm = this.fb.group({
      username: ['', Validators.required],
      mode: ['', Validators.required],
    });
    
    this.username = this.aRouter.snapshot.paramMap.get('username');
    console.log(this.username);
  }

  ngOnInit(): void {
    this.editMode();
  }

  addMode() {

    const newusername: string = this.modeForm.get('username')?.value;
    this._userService.getUser(newusername).subscribe(data =>{
      const user = data;

      const mode: Mode = {
        username: user,
        mode: this.modeForm.get('mode')?.value,
      }

      console.log(mode);

      if(this.username !== null){
        // Edit mode
        this._userService.getUser(this.username).subscribe(data =>{
          const olduser = data;
          this._modeService.editMode(mode, olduser._id!).subscribe(data => {
            this.toastr.info('Mode successfully edited!', 'Mode edited');
            this.router.navigate(['/list-modes']);
          }, error => {
            console.log(error);
            this.modeForm.reset();
          })
        })
      }
      else {
        // Add mode
        console.log(mode);
        this._modeService.addMode(mode).subscribe(data => {
          this.toastr.success('Mode successfully created!', 'Mode created');
          this.router.navigate(['/list-modes']);
        }, error => {
          console.log(error);
          this.modeForm.reset();
        })
      }
    }, error => {
      this.toastr.error("Please try again with another user that exists","Username not found")
      console.log(error)
    });
  }

  editMode() {
    if(this.username !== null) {
      this.title = 'Edit mode';
      this._userService.getUser(this.username).subscribe(data =>{
        const user = data;
        this._modeService.getMode(user._id!).subscribe(data => {
          this.modeForm.setValue({
            username: data.username.name,
            mode: data.mode,
          })
        })
      })
    }
  }
}