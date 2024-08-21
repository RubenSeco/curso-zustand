import { create, StateCreator } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import { v4 as uuidv4 } from 'uuid';
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";



interface TaskState {

  tasks: Record<string, Task>; // El tipo Record equivale a:  {[key:string]: Task}

  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;


  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;

  totalTasks: () => number;
}


const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({

  draggingTaskId: undefined,

  tasks: {
    "ABC-1": { id: "ABC-1", title: "Task 1", status: "open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "in-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "open" },
    "ABC-4": { id: "ABC-4", title: "Task 4", status: "open" },
  },

  getTaskByStatus: (status: TaskStatus) => Object.values(get().tasks).filter((task) => task.status === status),

  addTask: (title: string, status: TaskStatus) => {

    const newTask = { id: uuidv4(), title, status };


    // ! LAS TRES FORMAS DE CREAR UN NUEVO ESTADO MUTANTE. 


    // ? Con el middleware immer de Zustand

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });



    // ? Requiere npm install immer
    // set(produce((state: TaskState) => {
    //   state.tasks[newTask.id] = newTask;

    // }));


    // ? Forma nativa de Zustand con el operador spread
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,

    //   }
    // }));


    // ! ***************************************

  },


  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },

  removeDraggingTaskId: () => { set({ draggingTaskId: undefined }); },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {

    // const task = {...get().tasks[taskId]};
    // task.status = status;

    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status,
      };
    });

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,

    //   }
    // }));
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();

  },

  totalTasks: () => { return Object.entries(get().tasks).length; },
});

export const useTaskStore = create<TaskState>()(

  devtools(persist(immer(storeApi), { name: "task-store" }))

)


