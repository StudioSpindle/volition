import {Task} from '@shared';

export class GetTasks {
  static readonly type = '[Task] GetTasks';
}

export class AddTask {
  static readonly type = '[Task] AddTask';
  constructor(public task: Task) {}
}
