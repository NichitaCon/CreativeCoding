let data;
let cleanedData = [];
let charts = [];
 
function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
}
 
function setup(){
    createCanvas(500, 500);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    charts.push(new BarChart(cleanedData,"Female","Age_Group", 400,400,10,105,2,50,450))

}
 
function draw(){
    background(95,0,145);
    charts.forEach(chart => {
        chart.renderChartBars()
        chart.renderDataBars()
        chart.renderLabels()
        // chart.renderTicks()

    });

}
 
function cleanData(){
    for (let index=0; index<data.rows.length; index++){
        cleanedData.push(data.rows[index].obj)
    }
 
    for (let index=0; index<cleanedData.length; index++){
        cleanedData[index].Female = parseInt(cleanedData[index].Female)
        cleanedData[index].Male = parseInt(cleanedData[index].Male)
        cleanedData[index].Total = parseInt(cleanedData[index].Total)
    }
 
}

// create window system