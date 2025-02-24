let data;
let dataNic;
let cleanedData = [];
let cleanedDataNic = [];
let charts = [];
 
function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
    dataNic = loadTable('data/foodWaste.csv', 'csv', 'header')
}
 
function setup(){
    createCanvas(500, 500);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    cleanDataNic();
    charts.push(new BarChart({
        data:cleanedData,
        yValue:"Female",
        xValue:"Age_Group",
        chartHeight:400,
        chartWidth:400,
        barWidth:10,
        margin:20,
        axisThickness:2,
        chartPosX:50,
        chartPosY:450
    }

));

}
 
function draw(){
    background(226,109,92);
    charts.forEach(chart => {
        chart.renderChartBars();
        chart.renderDataBars();
        chart.renderLabels();
        chart.renderTicks();

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

function cleanDataNic(){
    for (let i=0; i<dataNic.rows.length; i++){
    cleanedDataNic.push(dataNic.rows[i].obj)
    }
 
    for (let i=0; i<cleanedDataNic.length; i++){
        cleanedDataNic[i]["combined figures (kg/capita/year)"] = parseInt(cleanedDataNic[i]["combined figures (kg/capita/year)"]);
        cleanedDataNic[i]["Household estimate (kg/capita/year)"] = parseInt(cleanedDataNic[i]["Household estimate (kg/capita/year)"]);
        cleanedDataNic[i]["Household estimate (tonnes/year)"] = parseInt(cleanedDataNic[i]["Household estimate (tonnes/year)"]);
        cleanedDataNic[i]["Retail estimate (kg/capita/year)"] = parseInt(cleanedDataNic[i]["Retail estimate (kg/capita/year)"]);
        cleanedDataNic[i]["Retail estimate (tonnes/year)"] = parseInt(cleanedDataNic[i]["Retail estimate (tonnes/year)"]);
        cleanedDataNic[i]["Food service estimate (kg/capita/year)"] = parseInt(cleanedDataNic[i]["Food service estimate (kg/capita/year)"]);
        cleanedDataNic[i]["Food service estimate (tonnes/year)"] = parseInt(cleanedDataNic[i]["Food service estimate (tonnes/year)"]);

    }
 
}

console.log(cleanedData);
console.log(cleanedDataNic);

// create window system