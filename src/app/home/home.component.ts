import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PoDialogService, PoModalAction, PoModalComponent, PoNotificationService, PoTableColumn, PoTableColumnSpacing } from '@po-ui/ng-components';
import { PainelNotasService } from '../service/painelnotas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('seuModal', { static: true }) modal!: PoModalComponent;

  acaoPrimaria: PoModalAction = {
    action: () => {
      this.modal.close();
      // Outras ações para o botão primário
    },
    label: 'Confirmar'
  };
  dataEvent: any; 
  form!: UntypedFormGroup;
  filtro: any = {};
  NFList: Array<any> = new Array();
  startDate: string = <any>new Date();
  endDate: string = <any>new Date();
  colunasTabelaPrincipal: Array<any> = new Array();
  itensTabelaPrincipal: any[] = [];
  itensTabelaPrincipalResposta: any[] = [];
  itensTabelaDetalhes: any[] = [];
  colunasTabelaDetalhes: Array<any> = new Array();
  itemSelecionado: any;
  bTrue = true;
  totalExpanded = 0;
  loadingTable: boolean = false
  jsonConsulta: any;
  formAtualizado: any;
  alturaTabela = 600
  tamanhoTable = PoTableColumnSpacing.Small
  //Paginação das notas
  pageSize = 10;
  page = 1;
  bHasNext = !false

  constructor(
    private painelNotasService: PainelNotasService,
    private formBuilder: UntypedFormBuilder,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      pedidoStart: [1, [Validators.required, Validators.maxLength(7)]],
      pedidoEnd: [9999999, [Validators.required, Validators.maxLength(7)]],
      solicitacaoFluigStart: [1, [Validators.required, Validators.maxLength(7)]],
      solicitacaoFluigEnd: [9999999, [Validators.required, Validators.maxLength(7)]],
      openingDateStart: [this.parseDate('01/01/2001'), Validators.required],
      openingDateEnd: [this.parseDate('31/12/2099'), Validators.required],
      issueDateStart: [this.parseDate('01/01/2001'), Validators.required],
      issueDateEnd: [this.parseDate('31/12/2099'), Validators.required],
      transactionDateStart: [this.parseDate('01/01/2001'), Validators.required],
      transactionDateEnd: [this.parseDate('31/12/2099'), Validators.required],
    });
    this.colunasTabelaPrincipal = this.painelNotasService.getColumns()
  }

  submitForm() {

    this.jsonConsulta = this.form.value
    if (this.form.value != this.formAtualizado) {
      this.itensTabelaPrincipal = []
      this.page = 1
    }
    this.formAtualizado = this.form.value
    this.jsonConsulta.pageSize = this.pageSize; // Supondo que você quer adicionar um tamanho de página de 10
    this.jsonConsulta.pageNumber = this.page;
      if (this.form.valid) {
      this.loadingTable = true
      this.painelNotasService.getAllItems(this.jsonConsulta).subscribe((response: any) => {
        this.bHasNext = !response.hasNext
        this.itensTabelaPrincipalResposta = response.items
        this.itensTabelaPrincipalResposta.forEach( (data: any) => {
        this.itensTabelaPrincipal.push(data)
       })
        this.loadingTable = false
      });
    } else {
      this.poNotification.error('Please fill out the form correctly.');
    }
  }

  loadNextPage() {
    this.page++;
    this.submitForm();
  }

  parseDate(dateString: string): Date {
    const parts = dateString.split('/');
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }

}
