import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cliente } from './cliente.model';
import { HttpClient } from '@angular/common/http'
import { identifierModuleUrl } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  constructor(private httpClient: HttpClient) { }

  private clientes : Cliente [] = [];


  getClientes(): void {
    this.httpClient.get<{ mensagem : string, clientes: any}>(
      'http://localhost:3000/api/clientes'
    )
    .pipe(map((dados)=> {
      return dados.clientes.map(cli => {
        return {
          id: cli.id,
          nome: cli.nome,
          fone: cli.fone,
          email: cli.email
        }
      })
    }))
    .subscribe((clientes) => {
      this.clientes = clientes;
      this.listaClientesAtualizada.next([...this.clientes])
    })
    //return [...this.clientes];
  }

  private listaClientesAtualizada = new Subject<Cliente[]>();

  adicionarCliente(nome: string, fone: string, email: string): void {
    const cliente: Cliente = {
      id: null,
      nome: nome,
      fone: fone,
      email: email
    };
    this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/clientes', cliente).subscribe(
      (dados) => {
        cliente.id = dados.id;
        this.clientes.push(cliente);
        this.listaClientesAtualizada.next([...this.clientes]);
      }
    )

    //this.clientes.push(cliente);

    // Enviando a mensagem de que aconteceu modificação
    // no objeto a ser observado a lista de clientes
    //this.listaClientesAtualizada.next([...this.clientes]);
  }

  removerCliente(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`).subscribe(() => {
      this.clientes = this.clientes.filter((cli) => {
        return cli.id !== id
      });
      this.listaClientesAtualizada.next([...this.clientes]);
    })
  }

  atualizarCliente(id: string, nome: string, fone: string, email: string) {
    const cliente: Cliente = {id, nome, fone, email};
    this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, cliente)
    .subscribe((res => {
      const copia = [...this.clientes];
      const indice = copia.findIndex(cli => cli.id === cliente.id);
      copia[indice] = cliente;
      this.clientes = copia;
      this.listaClientesAtualizada.next([...this.clientes]);
    }))
  };


  /**
   * Devolve um objeto "Observable"
   * para que os componentes se registrem
   * como observadores.
   */

  getListaClientesAtualizadaOservable() {
    return this.listaClientesAtualizada.asObservable();
  }

  getCliente(idCliente: string) {
    //return {...this.clientes.find((cli) => cli.id === idCliente)};
    return this.httpClient.get<{_id: string, nome: string, fone: string, email: string}>
    (`http://localhost:3000/api/clientes/${idCliente}`);
  }
}
