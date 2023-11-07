import { Component, OnInit } from "@angular/core";
import { Tarefa } from "src/app/models/tarefa.model";
import { ActivatedRoute } from "@angular/router";
import { TarefaService } from "src/app/services/tarefa.service";
import { ToastrService } from "ngx-toastr";
import { DatePipe } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-tarefa-cadastrar",
  templateUrl: "./tarefa-cadastrar.component.html",
  styleUrls: ["./tarefa-cadastrar.component.css"],
})
export class TarefaCadastrarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private tarefaService: TarefaService,
    public dialog: MatDialog
  ) {}

  tarefa: Tarefa = {
    titulo: "",
    descricao: "",
    concluirEm: undefined,
  };

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // pego o id que vem na url para edição
      const tarefaId = +params["id"];
      if (tarefaId) {
        console.log("ID da tarefa:", tarefaId);

        // busco a tarefa para preencher os campos
        this.buscarTarefaPorId(tarefaId);
      }
    });
  }

  buscarTarefaPorId(tarefaId: number) {
    this.tarefaService.getTarefaPorId(tarefaId).subscribe((tarefa) => {
      this.tarefa = tarefa;
    });
  }

  salvarTarefa() {
    if (this.tarefa.titulo === "") {
      alert("Não foi possivel cadastrar tarefa!");
    } else {
      if (this.tarefa.tarefaId == null) {
        try {
          if (this.tarefa.concluirEm != null) {
            this.formataData(this.tarefa.concluirEm);
          }
          this.tarefaService.salvarTarefa(this.tarefa);
          alert("Tarefa salva com sucesso!");
        } catch (error) {
          console.log("Erro ao salvar tarefa: ", error);
          alert("Ocorreu um erro ao salvar tarefa!");
        }
      } else {
        this.editarTarefa();
      }
    }
  }

  editarTarefa() {
    try {
      this.tarefaService.editarTarefa(this.tarefa);
      alert("Tarefa editada com sucesso!");
    } catch (error) {
      console.log("Erro ao editar tarefa: ", error);
      alert("Ocorreu um erro ao editar tarefa!");
    }
  }

  formataData(date: Date) {
    const data = new Date(date);
    const timezoneOffset = data.getTimezoneOffset();
    const dataUTC = new Date(data.getTime() + timezoneOffset * 60 * 1000);
    const dataFormatada = dataUTC.toISOString();
    this.tarefa.concluirEm = new Date(dataFormatada);

    console.log("converteu a data", this.tarefa.concluirEm);
  }
}
