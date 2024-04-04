import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PainelNotasService {
  
  constructor(private http: HttpClient) {}
  private apiUrl = '/dts/datasul-rest/resources/prg/esp/combio/v1/api_painelnotasemergenciais'
  private apiDetalheUrl = '/dts/datasul-rest/resources/prg/esp/combio/v1/api_painelnotasemergenciais/detalhesnf/'
  private data: any;
  
  getAllItems(formJson: any): Observable<any> {

    const integerFields = ['pedidoStart', 'pedidoEnd', 'solicitacaoFluigStart', 'solicitacaoFluigEnd'];
  // Itera sobre os campos e converte para inteiros
  integerFields.forEach(field => {
    if (formJson[field]) {
      formJson[field] = parseInt(formJson[field], 10);
    }
  });
    return this.http.post(this.apiUrl, formJson);
  }

  getDetalheNf(formJson: any):  Observable<any> {
    return this.http.post(this.apiDetalheUrl, formJson);
  }



  getColumnsDetalhe() : Array<PoTableColumn> {
    return [
      { property: 'data', label: 'Data'},
      { property: 'hora', label: 'Hora' },
      { property: 'usuario', label: 'Usuário' },
      { property: 'descricao', label: 'Descrição' },
      { property: 'pedido', label: 'Pedido' }
    ];
  }

  getColumns(): Array<PoTableColumn> {
    const airfareDetail: PoTableDetail = {
      columns: [
        { property: 'data', label: 'Data'},
        { property: 'hora',label: 'Hora'},
        { property: 'usuario', label: 'Usuário' },
        { property: 'pedido', label: 'Pedido' },
        { property: 'descricao', label: 'Descrição' },
      
      ],
      typeHeader: 'top'
    };


    return [
      { property: 'data_abertura', label: 'Abertura', type: 'date', format: 'MM/dd/yyyy', width: '9%'},
      { property: 'data_entrada', label: 'Entrada', type: 'date', format: 'MM/dd/yyyy', width: '9%' },
      { property: 'data_emissao', label: 'Emissão' , width: '9%'},
      { property: 'cod_estabelecimento', label: 'Filial', width: '9%' },
      { property: 'cod_emitente', label: 'Codigo', width: '9%' },
      { property: 'emitente_nome', label: 'Emitente', width: '15%' },
      { property: 'num_nf', label: 'NF', width: '9%' },
      { property: 'serie_nf', label: 'Série', width: '5%' },
      { property: 'tipo_recebimento', label: 'Tipo', width: '5%' },
      { property: 'processo', label: 'Processo', width: '5%' },
      { property: 'status_aprovacao', label: 'Aprovação', width: '5%' },
      { property: 'status_recebimento', label: 'Receb.' , width: '5%'},
      { property: 'numero_solicitacao', label: 'Fluig', width: '5%' },
      { property: 'pedido', label: 'Pedido' , width: '5%'},
      
      { property: 'logs', label: 'Details', type: 'detail', detail: airfareDetail },
    ];
  }

  

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}
