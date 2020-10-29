import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {


  constructor() { }

  private clientes : Cliente [] = [];

  private listaClientesAtualizada = new Subject<Cliente[]>();

  getClientes(): Cliente[]  {
    return [...this.clientes];
  }

  adicionarCliente(nome: string, fone: string, email: string): void {
    const cliente: Cliente = {
      nome: nome,
      fone: fone,
      email: email
    };
    this.clientes.push(cliente);

    // Enviando a mensagem de que aconteceu modificação
    // no objeto a ser observado a lista de clientes
    this.listaClientesAtualizada.next([...this.clientes]);
  }

  /**
   * Devolve um objeto "Observable"
   * para que os componentes se registrem
   * como observadores.
   */

  getListaClientesAtualizadaOservable() {
    return this.listaClientesAtualizada.asObservable();
  }
}
