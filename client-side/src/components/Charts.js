import React, { Component, useEffect, useState } from 'react'
import Chart from "chart.js"


export function DeathStatsLineGraph(){
    const chartRef = React.createRef()
    const [data, setData] = useState(null)
   
    const fetchData = async () => {
        const deathData = await fetch('/api/melanoma-death-data').then(res => res.json())
        setData(deathData)
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if(data){
            const ctx = chartRef.current.getContext("2d")
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: data.data.map((column) => column.Year.replace(/['"]+/g, '')),
                    datasets: [
                        {
                            label: "Melanoma Deaths",
                            data: data.data.map((column) => parseInt(column.DeathCount.replace(/['"]+/g, ''))),
                            backgroundColor: 'rgba(250, 85, 85, 0.3)',
                            pointRadius: 5,
                            pointHitRadius: 5,

                        }
                    ]
                },
                options: {
                    animation: {
                        duration: 2000,
                        easing: 'linear'
                    },
                    title: {
                        display: true,
                        text: 'Melanoma Deaths 1999-2017'
                    },
                    legend: {
                        display: true
                    },
                    scales: {
                        yAxes:{
                            display: true,
                            labelString: 'Death Count'
                        },
                        xAxes: {
                            display: true,
                            labelString: 'Year'
                        }
                    }
                }
            })
        }
    }, [data])
    
   
    return (
        <div style={{width: '40%'}}>
            <canvas
                id="myChart"
                ref={chartRef}
            />
        </div>
    )
}

export function SurvivalStatsLineGraph(){
    const survivalChartRef = React.createRef()
    const [data, setData] = useState(null)
   
    const fetchData = async () => {
        const survivalData = await fetch('/api/melanoma-survival-data').then(res => res.json())
        setData(survivalData)
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if(data){
            const ctx = survivalChartRef.current.getContext("2d")
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data.data.map((column) => column.Race.replace(/['"]+/g, '')),
                    datasets: [
                        {
                            label: "Melanoma 5 Year Survival Percentage",
                            data: data.data.map((column) => parseInt(column['5-yearRelativeSurvival%'].replace(/['"]+/g, ''))),
                            backgroundColor: 'rgba(255, 165, 0, 0.3)'
                        }
                    ]
                },
                options: {
                    animation: {
                        duration: 2000,
                        easing: 'linear'
                    },
                    title: {
                        display: true,
                        text: 'Melanoma 5 Year Survival Rate Per Race'
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMin: 50
                            }
                        }]
                    }
                }
            })
        }
    }, [data])
    
   
    return (
        <div style={{width: '40%'}}>
            <canvas
                id="survivalChart"
                ref={survivalChartRef}
            />
        </div>
    )
}