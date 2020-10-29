import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from '../cliente.model';
import { ClienteService } from '../cliente.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
})
export class ClienteListaComponent implements OnInit, OnDestroy {

  clientes: Cliente[] = [];
  private clientesSubscription: Subscription;

  constructor(public clientesService: ClienteService) {}

  ngOnInit(): void {
    this.clientes = this.clientesService.getClientes();

    this.clientesSubscription = this.clientesService
      .getListaClientesAtualizadaOservable()
      .subscribe(
        (clientes: Cliente[]) => {
          this.clientes = clientes;
        });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }
}
