import
    { Component, OnInit }
  from
    '@angular/core';

import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

   clientes: Cliente[] = [];

  constructor(public clientesService: ClienteService) {

  }

  ngOnInit(): void {
    this.clientes = this.clientesService.getClientes();
  }
}
