export interface TaskType {
  taskText: string;
  isDone?: boolean;
}

export default class User {
  name?: string;
  imageDataURL?: string;
  tasks?: TaskType[];

  constructor() {
    const userJSON = localStorage.getItem("currentUser");
    if (!!userJSON) {
      const user = JSON.parse(userJSON);
      this.name = user.name;
      this.imageDataURL = user.imageDataURL;
      this.tasks = user.tasks;
    }
  }

  public createUser(name: string, imageDataURL: string): void {
    this.name = name;
    this.imageDataURL = imageDataURL;
    this.tasks = [];

    this.setUser();
  }

  public signOut(): void {
    localStorage.removeItem("currentUser");
    location.reload();
  }

  public addTask(task: string): void {
    this.tasks!.push({ taskText: task });
    this.setUser();
  }

  public deleteTask(taskIndex: number): void {
    this.tasks!.splice(taskIndex, 1);
    this.setUser();
  }

  public doneTask(taskIndex: number) {
    this.tasks![taskIndex].isDone = true;
    console.log(this.tasks![taskIndex].isDone);
    this.setUser();
  }

  private setUser(): void {
    const userJSON = JSON.stringify(this);
    localStorage.setItem("currentUser", userJSON);
  }
}
