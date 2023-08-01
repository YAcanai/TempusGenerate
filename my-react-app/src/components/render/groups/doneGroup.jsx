import TaskRender from "../TaskRender";

export default function DoneGroup(props) {
  const { sorting } = props;
  return (
    <>
      {sorting.some((task) => task.TaskSatus === "Done") ? (
        <div className="group">
          <div className="title">Выполнено</div>
          <div className="tasks">
            {sorting.map((task) => {
              if (task.TaskSatus == "Done") {
                return <TaskRender task={task} key={task.id}></TaskRender>;
              }
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
