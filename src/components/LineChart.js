import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, 
  Filler
);

const LineChart = ({ dates, weights, title, titleEng, language, color }) => {

  const data = {
    labels: dates,
    datasets: [
      {
        label: language ? 'Weight' : 'Peso',
        data: weights,
        borderColor: color,
        tension: 0,
        pointRadius: 3,
        fill: false,
        borderWidth: 3,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: language ? titleEng : title,
        font: {
          size: 20
        }
      }
    },
  };

  const text = language ? 'There is no records' : 'No hay registros';

  return (
    <div className='chart-box'>
      <div id='chart'>
        <Line data={data} options={options}/>
      </div>
      <p className={dates.length > 0 ? 'warning-active' : 'warning'}>{dates.length > 0 ? null : text}</p>
    </div>
  )
};

export default LineChart;