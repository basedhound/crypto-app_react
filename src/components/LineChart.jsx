import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  // console.log(coinHistory);
  // console.log(coinPrice);
  // console.log(coinTimestamp);

  for (let i = 0; i < coinHistory?.coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(coinHistory?.coinHistory?.data?.history[i].timestamp)
    );
  }

  const formattedCoinTimestamp = coinTimestamp.map((timestamp) =>
    timestamp.toLocaleDateString()
  );
  

  const data = {
    labels: formattedCoinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart{" "}
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
