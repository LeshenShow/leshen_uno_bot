const resultGame = [
  { name: "sasha", point: 100 },
  { name: "arlen", point: 505 },
];

const unitBackColor = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 205, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(201, 203, 207, 0.2)",
];
const unitBorderDataColor = [
  "rgba(255, 99, 132)",
  "rgba(255, 159, 64)",
  "rgba(255, 205, 86)",
  "rgba(75, 192, 192)",
  "rgba(54, 162, 235)",
  "rgba(153, 102, 255)",
  "rgba(201, 203, 207)",
];

Chart.register(ChartDataLabels);
Chart.defaults.font.size = 30;
const chart = new Chart(document.getElementById("myChart"), {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: [12, 20, 3, 5, 2, 3],
        borderWidth: 5,
        backgroundColor: unitBackColor,
        borderColor: unitBorderDataColor,
      },
    ],
  },
  options: {
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        offset: true,
      },
      x: { ticks: { font: { size: 30 } } },
    },
    plugins: {
      legend: { display: true },
      datalabels: {
        labels: [
          {
            font: { size: 50 },
            color: unitBorderDataColor,
          },
        ],
      },
    },
  },
  plugins: [ChartDataLabels],
});

const download = () => {
  console.log("test");
  const imageLink = document.createElement("a");
  const canvas = document.getElementById("myChart");
  imageLink.download = "test.jpeg";
  imageLink.href = canvas.toDataURL("image/jpeg");
  console.log(imageLink.href);

  imageLink.click();
};
