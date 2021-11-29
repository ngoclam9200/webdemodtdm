import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import{FormGroup} from'@angular/forms';
import {Observable} from 'rxjs';

import {Router} from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
 data:any;
  formGroup!: FormGroup;
 
  constructor(private http:HttpClient,
    private router:Router) { }
  
  ngOnInit() {
    
    this.initForm();
    
  }
  login(data: any):Observable<any>{
    
    return this.http.post(`https://carshop985.herokuapp.com/api/user/login`, data);
  }
  initForm(){
    
    this.formGroup= new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("",[ Validators.required])
    }); 

  }
    loginProces(){
      
    if (this.formGroup.valid){
      
      
      this.login(this.formGroup.value).subscribe((result) =>{
         this.data=result

        
          
         
            
   
          
           if(result.message=="Login Success!" )
           {
            localStorage.setItem('userName',this.formGroup.controls['userName'].value)
            localStorage.setItem('currentUser',JSON.stringify( {token:this.data.data.token}) );
             this.router.navigate(['/welcome']);
           }

            
          

      }, error=>{
        
        if( error.error.data == null)
        {
       
        alert("Sai tài khoản hoặc mật khẩu");
        }
        
      });
     
     
    }
    else alert("Bạn chưa nhập thông tin");
   
  
     
    
  }
  
 
Resetpassword(){

}
  

 
 
 

  

}
