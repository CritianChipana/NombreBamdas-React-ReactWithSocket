

import { Bar } from 'react-chartjs-2';
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';
export const BandChart = () => {


    const {socket} = useContext(SocketContext);

    const [dataOption, setDataOption] = useState([])

    useEffect(() => {
        socket.on("current-bands", (bands) => {

            setDataOption( bands );
        });

        return () => socket.off('current-bands');

    }, [socket])



    const data = {
        labels: dataOption.map( band=> band.name ),
        datasets: [
          {
            label: '# of Votes',
            data:  dataOption.map( band=> band.votos ),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };
      

    return (
        <div>
             <div className='header'>
            <h1 className='title'>Horizontal Bar Chart</h1>
            <div className='links'>
                <a
                className='btn btn-gh'
                href='https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/HorizontalBar.js'
                >
                Github Source
                </a>
            </div>
            </div>
            <Bar data={data} options={options} />
        </div>
    )
}










/* import Chart from 'chart.js/auto';
import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on("current-bands", (bands) => {
            console.log(bands);
            crearGrafica( bands );
        });

        return () => socket.off('current-bands');

    }, [socket])


    

    const crearGrafica = ( bands=[] ) =>{

        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map( band => band.name )  ,
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                // animation: false,
                indexAxis:'y',
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    // x: {
                    //     beginAtZero: true
                    // },
                    // xAxes:[{
                    //     stacked :true
                    // }]
                }
            }
        });
        

    }


    return (
        <>
            <canvas id="myChart" ></canvas>
        </>
    )
}
 */