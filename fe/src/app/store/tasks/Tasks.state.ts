import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {TasksStateModel} from './TasksState.interface';
import {Task} from '../../shared/task/task.interface';
import {AddTask, GetTasks} from '../../actions/tasks.actions';
import {TasksService} from '../../shared/task/task.service';
import {tap} from 'rxjs/operators';

@State<TasksStateModel>({
  name: 'tasks',
  defaults: {
    tasks: []
  }
})
@Injectable()
export class TasksState {

  @Selector()
  static getTasks(state: TasksStateModel): Task[] | null {
    return state.tasks;
  }

  constructor(private tasksService: TasksService) {}

  @Action(GetTasks)
  getTasks(ctx: StateContext<TasksStateModel>) {
    return this.tasksService.getTasks().pipe(
      tap((tasks: Task[]) => {
        ctx.patchState({ tasks });
      })
    );
  }

  @Action(AddTask)
  addTask(ctx: StateContext<TasksStateModel>, { task }: { task: Task }) {
    // TODO: check if res should be used
    return this.tasksService.createTask(task).subscribe((res) => {
      const state = ctx.getState();
      ctx.patchState({
        tasks: [
          ...state.tasks,
          task,
        ]
      });
    }, (error) => {
      // TODO: add error handling
      console.log('Error', error);
    });
  }
}
