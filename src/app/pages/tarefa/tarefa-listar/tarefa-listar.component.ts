import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";
import { TarefaService } from "src/app/services/tarefa.service";

@Component({
  selector: "app-tarefa-listar",
  templateUrl: "./tarefa-listar.component.html",
  styleUrls: ["./tarefa-listar.component.css"],
})
export class TarefaListarComponent implements OnInit {
  constructor(
    private tarefaService: TarefaService,
    private client: HttpClient
  ) {}

  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this.client
    .get<Tarefa[]>("http://localhost:3000/tarefas/listar")
    .subscribe({
      //
      next: (tarefas) => {
        this.tarefas = tarefas;
        //console.table(tarefas);
      },
      error: (error: HttpErrorResponse) => {
        console.error("Ocorreu um erro:", error);
      },
    });
   
  }

  excluirTarefa(id?: number) {
    try {
      if (id != null) {
        this.tarefaService.excluirTarefa(id);
        alert("Tarefa excluida com sucesso!")
        window.location.reload();
      }
    } catch (error) {
      alert("Ocorreu um erro ao excluir a tarefa")
    }
  }
}
