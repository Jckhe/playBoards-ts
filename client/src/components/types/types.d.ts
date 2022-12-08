
//REDUX / STATE TYPES
export interface stateType {
    username: string,
    boards: [boardsType];
}

export interface boardsType {
    projectName: string,
    toDo: newTask[],
    inProgress: newTask[],
    toDelete: newTask[],
    uuid: string,
    backgroundColor: string,
}


export interface newTask {
    content: string,
    boardID: string,
    uid: string,
    status: string
}



//REACT PROP TYPES
// TASK COMPONENT TYPES
export interface createTaskProps {
    addTask: (arg: any) => void,
    uid: string | number
}

export interface taskComponentProps {
    content: string,
    uid: string,
    key: string | number,
    boardID: string,
    status: string,
    updateTask: (arg: any) => void,
    index?: number,
    boardIndex: number
}

//Container Props Types

export interface ContainerProps {
    boardID: string,
    boardIndex: number
}


export interface taskProps {
  content: string,
  boardID: string,
  uid: string,
  status: string
}

//Board Props Types

export type BoardProps = {
    name: string,
    id: string,
    key?: number
  }


  

//App Props Types



