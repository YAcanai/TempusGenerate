import { useState } from "react";
import NoHaveTasks from "../../../components/buttons/nohavetasks";
import AddButton from "../../../components/buttons/AddButton";
import AddTaskPlace from "../../modal-windows/add_modal/AddtaskPlace";
import { nextDate } from "../../../utils/time";
import { useSelector } from "react-redux";
import { sortedTasksNextDay } from "../../../utils/sorting";
import { useCustomHook } from "../../../App";
import businessIcon from "../../../assets/light/info-circle.svg";
import businessIconD from "../../../assets/dark/info-circle.svg";
import { useTheme } from "../../../hooks/UseTheme";
import TaskRender from "../../../components/render/TaskRender";
import BusinessMode from "../../busines-mode.jsx";
import AddPlanButton from "../../../components/buttons/addPlanButton";
import PlanPlace from "../../modal-windows/plan_modal/PlanPlace";
import { searchSelect } from "../../../utils/seachSelectTask";

function TommorowPlace() {
  const UserTasks = useSelector((state) => state.user.userTasks);
  const { OpenAdd, setOpenAdd } = useCustomHook();
  const [BusinesModeOpen, setBusinesModeOpen] = useState(false);
  const { theme } = useTheme();
  const [openPlan, setOpenPlan] = useState(false);

  function OpenBussinesMode() {
    setBusinesModeOpen(true);
  }

  const ArrayPlans = [];
  UserTasks.map((task) =>
    searchSelect(task, nextDate()) ? ArrayPlans.push(task) : ""
  );

  return (
    <section className="Tomorrow-place place" id="modetomorrow">
      <div className="scroll">
        {sortedTasksNextDay(UserTasks, nextDate).length > 0 ||
        UserTasks.some((task) => task.TaskSatus === "Plan") ? (
          <div className="groups">
            {UserTasks.some((task) => task.TaskSatus === "Plan") &&
            ArrayPlans.length > 0 ? (
              <div className="group">
                <div className="title">Планы</div>
                <div className="tasks">
                  {ArrayPlans.map((task) => (
                    <TaskRender
                      itsPlan={true}
                      task={task}
                      Day={"План"}
                      date={nextDate()}
                      key={task.planId}
                    ></TaskRender>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}

            {sortedTasksNextDay(UserTasks, nextDate).some(
              (task) => task.TaskSatus === "Make"
            ) ? (
              <div className="group">
                <div className="title">
                  Задачи
                  {theme == "LTempus" ? (
                    <img src={businessIcon} alt="" onClick={OpenBussinesMode} />
                  ) : (
                    <img
                      src={businessIconD}
                      alt=""
                      onClick={OpenBussinesMode}
                    />
                  )}
                </div>
                <div className="tasks">
                  {sortedTasksNextDay(UserTasks, nextDate).map((task) => {
                    if (task.TaskSatus == "Make") {
                      return (
                        <TaskRender
                          task={task}
                          Day={"Завтра"}
                          key={task.id}
                        ></TaskRender>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              ""
            )}

            {sortedTasksNextDay(UserTasks, nextDate).some(
              (task) => task.TaskSatus === "Done"
            ) ? (
              <div className="group">
                <div className="title">Выполнено</div>
                <div className="tasks">
                  {sortedTasksNextDay(UserTasks, nextDate).map((task) => {
                    if (task.TaskSatus == "Done") {
                      return (
                        <TaskRender
                          task={task}
                          Day={"Завтра"}
                          key={task.id}
                        ></TaskRender>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <NoHaveTasks
            setOpenAdd={setOpenAdd}
            page="TommorowPlace"
          ></NoHaveTasks>
        )}
      </div>
      <AddPlanButton setOpenPlan={setOpenPlan}></AddPlanButton>
      {sortedTasksNextDay(UserTasks, nextDate).length > 0 ||
      UserTasks.some((task) => task.TaskSatus === "Plan") ? (
        <AddButton setOpenAdd={setOpenAdd}></AddButton>
      ) : (
        ""
      )}
      {OpenAdd ? (
        <AddTaskPlace
          openPlan={openPlan}
          dayOpen={nextDate()}
          setOpenAdd={setOpenAdd}
        ></AddTaskPlace>
      ) : (
        ""
      )}
      {BusinesModeOpen ? (
        <BusinessMode
          filtredTasks={sortedTasksNextDay(UserTasks, nextDate)}
          setBusinesMode={setBusinesModeOpen}
        ></BusinessMode>
      ) : (
        ""
      )}
      {openPlan ? (
        <PlanPlace
          setOpenAdd={setOpenAdd}
          setOpenPlan={setOpenPlan}
        ></PlanPlace>
      ) : (
        ""
      )}
    </section>
  );
}
export default TommorowPlace;
