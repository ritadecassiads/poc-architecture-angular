import { Tarefa } from "src/app/models/tarefa.model";
import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TarefaService {
  constructor(private client: HttpClient) {}

  private apiUrl = "http://localhost:3000/tarefas";
  public tarefas: Tarefa[] = [];

  salvarTarefa(tarefa: Tarefa) {
    this.setaDataDaquiASeteDias(tarefa);

    this.client.post(`${this.apiUrl}/salvar`, tarefa).subscribe({
      next: (response) => {
        console.log("Serviço: Tarefa cadastrada!", tarefa);
      },
      error: (error) => {
        console.error("Erro ao cadastrar tarefa:", error);
      },
    });
  }

  listarTarefas(): Tarefa[] {
    this.client.get<Tarefa[]>(`${this.apiUrl}/listar`).subscribe({
      next: (tarefas) => {
        console.table(tarefas);
        this.tarefas = tarefas;
      },
      error: (error) => {
        console.error("Ocorreu um erro ao listar as tarefas:", error);
        return error;
      },
    });
    return this.tarefas;
  }

  editarTarefa(tarefa: Tarefa) {
    this.client
      .put(`${this.apiUrl}/atualizar/${tarefa.tarefaId}`, tarefa)
      .subscribe({
        next: (response) => {
          console.log("Serviço: Tarefa editada!", tarefa);
        },
        error: (error) => {
          console.error("Erro ao editar tarefa:", error);
        },
      });
  }

  excluirTarefa(id: number) {
    this.client.delete(`${this.apiUrl}/excluir/${id}`).subscribe(
      (response) => {
        console.log("Serviço: Item excluído!");
      },
      (error) => {
        console.error("Erro ao excluir o item", error);
      }
    );
  }

  getTarefaPorId(id: number) {
    return this.client.get<Tarefa>(`${this.apiUrl}/listar/${id}`);
  }

  setaDataDaquiASeteDias(tarefa: Tarefa) {
    // se o campo "concluirEm" estiver vazio, defino a data daqui a 7 dias
    if (!tarefa.concluirEm) {
      const dataDaquiA7Dias = new Date();
      dataDaquiA7Dias.setDate(dataDaquiA7Dias.getDate() + 7);
      tarefa.concluirEm = dataDaquiA7Dias;
      return tarefa.concluirEm;
    }
    return;
  }
}
