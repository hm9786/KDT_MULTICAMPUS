// ChartComponent.js
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js';
import 'chart.js/auto';

const ChartComponent = ({ completedCount, totalRoutines }) => {
  const data = {
    labels: ['완료된 루틴', '미완료된 루틴'],
    datasets: [
      {
        data: [completedCount, totalRoutines - completedCount],
        backgroundColor: ['#F4CFC7', '#C6C09C'],
        hoverBackgroundColor: ['#F4CFC7', '#C6C09C'],
        borderColor: ['#C57D75', '#5E6122'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        onClick: (e) => {
          e.native.stopPropagation();
          e.native.preventDefault();
        },
        labels: {
          color: '#89892B',
          font: {
            family:'nanumsquarel',
            size: 13,
            weight: 'bold',
          },
        },
      },
      centerText: true,
    },
  };

  const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      const completed = chart.data.datasets[0].data[0];
      const total = chart.data.datasets[0].data.reduce((acc, value) => acc + value, 0);
      const percentage = total ? Math.round((completed / total) * 100) : 0;

      ctx.save();
      ctx.font = 'bold 20px montserrat';
      ctx.fillStyle = '#89892B';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${percentage}%`, width / 2, height / 2);
      ctx.restore();
    },
  };

  ChartJS.register(centerTextPlugin);

  return (
    <div className='chart-container'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartComponent;