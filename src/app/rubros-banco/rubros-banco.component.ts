import { EventBrokerService } from './../event-broker/event-broker.service';
import {TranslateService} from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import { RubroBancoService } from './../services/rubro-banco.service';
import { RubroBanco } from './../model/rubro-banco';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { IEventListener } from "../event-broker/event-broker.service"
import * as _ from "lodash";
declare var  $: any;

@Component({
  selector: 'app-rubros-banco',
  templateUrl: './rubros-banco.component.html',
  styleUrls: ['./rubros-banco.component.css'],
  providers: [RubroBancoService]
})
export class RubrosBancoComponent implements OnInit, OnDestroy {

  columns:Array<any> = [
    {title: 'Id', name: 'Id'},
    {title: 'Rubro', name: 'Rubro', filtering: {filterString: '', placeholder: 'Filters by rubro'}},
    {title: '', name: 'EditButton'},
    {title: '', name: 'DeleteButton'}
  ];

  rubrosBanco: Array<any>;
  rubrosBancoGrilla: Array<any>;
  rubrosBanco$: Observable<Array<RubroBanco>>;
  dataSubscrip: Subscription;
  editTextSubscrip: Subscription;
  deleteTextSubscrip: Subscription;
  private _myEventListener: IEventListener;

  //signalR connection reference
  //private connection: SignalR;

  //signalR proxy reference
  //private proxy: SignalR.Hub.Proxy;

  constructor(
        private translate: TranslateService, 
        private rubroBancoService: RubroBancoService,
        private _eventBroker: EventBrokerService) {

      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
      this.getAll();

      this.loadData();

      this._myEventListener = _eventBroker.listen<string>("loadData",(value:string)=>{
          this.loadData();
      });
  }

  loadData(){

     this.rubrosBancoGrilla = null;
     this.rubrosBanco = null;

     this.editTextSubscrip = this.translate.get('GENERAL.EDIT').subscribe((editText: string) => {
        this.deleteTextSubscrip = this.translate.get('GENERAL.DELETE').subscribe((deleteText: string) => {
          this.dataSubscrip = this.rubrosBanco$.subscribe(
            data => {
              this.rubrosBanco = _.cloneDeep(data);

              var tmp: Array<any> = data;
              tmp.forEach(e => {
                e.Id2 = e.Id
                e.Id = "<span class='id-column'>" + e.Id + "</span>";
                e.EditButton = "<button class='btn btn-warning btn-xs edit-button'>" + editText + "</button>";
                e.DeleteButton = "<button class='btn btn-danger btn-xs delete-button'>" + deleteText + "</button>";
              });
              this.rubrosBancoGrilla = tmp;
            }
          );
        });
      });
  }

  ngOnInit() {
    
    //this.listenToHub();
  }

  getAll(){
    this.rubrosBanco$ = this.rubroBancoService.getAll();
  }

  /*listenToHub(){

    //initialize connection
    this.connection = $.connection;

    //to create proxy give your hub class name as parameter. IMPORTANT: notice that I followed camel casing in giving class name
    this.proxy = $.connection.hub.createHubProxy('rubrosBancoHub');

    //define a callback method for proxy
    this.proxy.on('rubrosBancoListChanged', () => this.rubrosBancoListChanged());

    this.connection.hub.start();
  }*/

  private rubrosBancoListChanged(){
    this.getAll();
  }

  ngOnDestroy(){
    //this.connection.hub.stop;
    this.dataSubscrip.unsubscribe();
    this.editTextSubscrip.unsubscribe();
    this.deleteTextSubscrip.unsubscribe();
  }

}
