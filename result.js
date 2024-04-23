import { resultGame, unitBackColor, unitBorderDataColor } from "./config.js";
import ChartJsImage from "chartjs-to-image";

export const changeResult = (text, nameList = []) => {
  // text = "qqq 50";
  const textArray = text.toLowerCase().split(" "); // [kolya, 235]
  if (checkMessage(textArray)) {
    // console.log(resultGame);
    resultGame.map((elem) => nameList.push(elem.name));
    nameList.includes(textArray[0])
      ? resultGame
          .filter((elem) => elem.name === textArray[0])
          .map((elem) => (elem.point += Number(textArray[1])))
      : resultGame.push({ name: textArray[0], point: Number(textArray[1]) });
  }
  return resultGame;
};
const checkMessage = (textArray) =>
  isNaN(Number(textArray[1])) ? false : true;
export const getResult = (text = "") => {
  resultGame.map(
    (elem) => (text += `<b>${elem.name}</b>:<code>${elem.point}</code>,\n`)
  );
  return text;
};
export const restartGame = () => {
  resultGame.length = 0;
};
export const updateChart = (names = [], points = []) => {
  resultGame.map((elem) => {
    names.push(elem.name);
    points.push(elem.point);
  });
  const chartConfig = {
    type: "bar",
    data: {
      labels: names,
      datasets: [
        {
          label: {
            display: false,
          },
          data: points,
          borderWidth: 5,
          borderRadius: 200,
          backgroundColor: unitBackColor,
          borderColor: unitBorderDataColor,
          categoryPercentage: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          display: false,
          // beginAtZero: true,
          // min: 0,
          // ticks: { font: { size: 20 } },
          // offset: true,
        },
        x: {
          // beginAtZero: true,
          // min: 0,
          ticks: { font: { size: 40 }, color: unitBorderDataColor },
          // offset: true,
        },
      },
      plugins: {
        legend: { display: false },
        datalabels: {
          anchor: "center",
          align: "center",
          padding: 10,
          color: unitBorderDataColor,
          font: {
            weight: "bold",
            size: names.length > 3 ? 60 : 120,
          },
        },
      },
    },
  };
  const myChart = new ChartJsImage();
  myChart
    .setConfig(chartConfig)
    .setWidth(800)
    .setHeight(600)
    .setBackgroundColor("#000000")
    .setChartJsVersion("4.1.1")
    .toFile("../leshen_uno_bot/chart/mychart.png");
};
