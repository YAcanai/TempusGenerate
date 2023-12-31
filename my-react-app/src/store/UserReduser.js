const UserData = {
  id: 0,
  userProperties: {
    login: "Nikita",
    Email: "nikita@mail.com",
    Password: "lol",
    TeamCode: 22,
    Role: "admin",
    InviteCode: "22",
  },
  userTasks: [],
};

export const userReduser = (state = UserData, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, userTasks: [...state.userTasks, action.payload] };
    case "REMOVE_TASK":
      return {
        ...state,
        userTasks: state.userTasks.filter(
          (task) => task.id !== action.payload + 1
        ),
      };
    case "CHANGE_PRIOR":
      return {
        ...state.userTasks,
        userTasks: state.userTasks.map((task) => {
          if (task.id == action.taskId) {
            return {
              ...task,
              TaskPriority: action.newPriority,
            };
          }
          return task;
        }),
      };
    case "CHANGE_TASK":
      return {
        ...state.userTasks,
        userTasks: state.userTasks.map((task) => {
          if (task.id == action.taskId) {
            return {
              ...task,
              TaskSatus: action.newStatus,
            };
          }
          return task;
        }),
      };
    case "CHANGE_TASK_NAME":
      return {
        ...state.userTasks,
        userTasks: state.userTasks.map((task) => {
          if (task.id == action.taskId) {
            return {
              ...task,
              TaskName: action.newTaskName,
            };
          }
          return task;
        }),
      };
    case "ADD_TO_SELECTON":
      return {
        ...state,
        userTasks: state.userTasks.map((task) => {
          if (task.id == action.taskId) {
            return {
              ...task,
              selectOn: [...task.selectOn, action.newValue],
            };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};
