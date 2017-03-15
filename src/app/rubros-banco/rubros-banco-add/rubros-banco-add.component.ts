import { RubroBancoService } from './../../services/rubro-banco.service';
import { RubroBanco } from './../../model/rubro-banco';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
declare var $:any;

@Component({
  selector: 'app-rubros-banco-add',
  templateUrl: './rubros-banco-add.component.html',
  styleUrls: ['./rubros-banco-add.component.css'],
  providers:[RubroBancoService]
})
export class RubrosBancoAddComponent implements OnInit {

  item: RubroBanco = new RubroBanco(0, '');
  error;

  constructor(private service: RubroBancoService, private router: Router) { 
  }

  ngOnInit() {
    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 
    })
  }

  onSubmit(){
    debugger;
    this.service.add(this.item).subscribe(
      data => {
        this.item = data
        console.log(data)
      },
      error => {
        this.error = error
        console.log(error)
      }
    );
    
    this.closeModal();
  }

  closeModal(){
    setTimeout(()=>{
      $("#abmPopup .close").click()
      this.router.navigate(['/rubros-banco']);
    });
  }

}
