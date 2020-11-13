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
  public estaCarregando = false;

  constructor(public clientesService: ClienteService) {}

  ngOnInit(): void {
    this.estaCarregando = true;
    this.clientesService.getClientes();
    this.clientesSubscription = this.clientesService
      .getListaClientesAtualizadaOservable()
      .subscribe((clientes: Cliente[]) => {
          this.estaCarregando = false;
          this.clientes = clientes;
        });
  }

  ngOnDestroy(): void {
    this.clientesSubscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.clientesService.removerCliente(id);
  }
}
