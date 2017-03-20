import { EventBrokerService } from './../../event-broker/event-broker.service';
import { RubroBancoService } from './../../services/rubro-banco.service';
import { RubroBanco } from './../../model/rubro-banco';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs/Rx';

declare var $:any;

@Component({
  selector: 'app-rubro-banco-delete',
  templateUrl: './rubros-banco-delete.component.html',
  styleUrls: ['./rubros-banco-delete.component.css'],
  providers: [RubroBancoService]
})
export class RubrosBancoDeleteComponent implements OnInit, OnDestroy {

  paramsSubscrip : Subscription;
  getByKeySubscript : Subscription;
  deleteSubscription: Subscription;
  Id;
  item : RubroBanco;

  constructor(
    private service: RubroBancoService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private _eventBroker: EventBrokerService) {
    
  }

  ngOnInit() {
    this.paramsSubscrip = this.activatedRoute.params.subscribe(
      params => {
        this.Id = params['Id'];
        this.getByKeySubscript = this.service.getById(this.Id).subscribe(
          item => this.item = item
        );
      }
    );

    setTimeout(()=>{
      $('#abmPopup').modal('toggle'); 
    });
  }

  ngOnDestroy(){
    if (this.paramsSubscrip != null) this.paramsSubscrip.unsubscribe();
    if (this.getByKeySubscript != null) this.getByKeySubscript.unsubscribe();
    if (this.deleteSubscription != null) this.deleteSubscription.unsubscribe();
  }

  onSubmit(){
    
    this.deleteSubscription = this.service.delete(this.item.Id).subscribe(x => {
      console.log(x);
      this.closeModal();
      this._eventBroker.emit<string>("loadData", ""); 
    });

  }

  closeModal(){
    setTimeout(()=>{
      $("#abmPopup .close").click()
      this.router.navigate(['/rubros-banco']);
    });
  }

}
