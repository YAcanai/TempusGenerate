import Chart from "chart.js/auto";
import { useSelector } from "react-redux";

function All(props) {
  const UserTasks = useSelector((state) => state.user.userTasks);
  const { showDaysOnMounth } = props;
  createDistAll();
  setTimeout(() => {
    createDistAll();
  }, 1);

  function createDistAll() {
    var existingChart = Chart.getChart("distogram-body-all");

    if (existingChart == undefined) {
      const dateCountMap = new Map();
      UserTasks.forEach((task) => {
        const { date } = task;
        if (dateCountMap.has(date)) {
          dateCountMap.set(date, dateCountMap.get(date) + 1);
        } else {
          dateCountMap.set(date, 1);
        }
      });

      const formattedTasks = [];
      const currentDate = new Date(UserTasks[0].date);
      currentDate.setDate(1);

      for (let i = 0; i < showDaysOnMounth().length; i++) {
        const formattedDate = currentDate.getDate().toString().padStart(2, "0");
        const count =
          dateCountMap.get(currentDate.toISOString().slice(0, 10)) || 0;
        formattedTasks.push({ date: formattedDate, count });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      (async function () {
        const data = formattedTasks;

        if (data !== null) {
          new Chart(document.getElementById("distogram-body-all"), {
            type: "bar",
            data: {
              labels: data.map((row) => row.date),
              datasets: [
                {
                  label: "",
                  borderColor: "#e9d3c6",
                  data: data.map((row) => row.count),
                },
              ],
            },
            options: {
              animation: false,
              scales: { y: { display: false } },
              hover: { mode: null },
            },
            plugins: {},
          });
          Chart.defaults.elements.point = "false";
          Chart.defaults.elements.bar.backgroundColor = "#e9d3c6";
          Chart.defaults.plugins.tooltip.enabled = false;
          Chart.defaults.plugins.legend.display = false;
          Chart.defaults.font.size = "13";
        }
      })();
    }
  }

  return <canvas id="distogram-body-all"></canvas>;
}
export default All;
