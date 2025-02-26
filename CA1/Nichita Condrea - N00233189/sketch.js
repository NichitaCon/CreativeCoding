let data;
let dataNic;
let cleanedData = [];
let cleanedDataNic = [];
let cleanedDataNicRegion = [];
let charts = [];
 
function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
    dataNic = loadTable('data/foodWaste.csv', 'csv', 'header')
}
 
function setup(){
    createCanvas(1000, 3000);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    cleanDataNic();
    cleanDataNicRegion();

    // Debugging: Log the cleanedDataNicRegion array
    // console.log("cleanedDatan in setup:", cleanedData);
    // console.log("cleanedDataNicRegion in setup:", cleanedDataNicRegion);
    charts.push(new BarChart({
        data:cleanedData,
        yValue:"Female",
        xValue:"Age_Group",
        chartHeight:200,
        chartWidth:200,
        barWidth:10,
        margin:20,
        axisThickness:2,
        chartPosX:200,
        chartPosY:250,
        ticks:4,
        axisColour: color(0),
        barColour: color(255),
        axisTextColour: color(0),
        fullTickLength: false
    }));

    charts.push(new BarChart({
        data:cleanedDataNicRegion,
        yValue:"Retail estimate (tonnes/year)",
        xValue:"Region",
        chartHeight:200,
        chartWidth:200,
        barWidth:10,
        margin:20,
        axisThickness:2,
        chartPosX:500,
        chartPosY:250,
        ticks:4,
        axisColour: color(0),
        barColour: color(255),
        axisTextColour: color(0),
        fullTickLength: false
    }));
    

    charts.push(new StackedBarChart({
        data:cleanedDataNicRegion,
        yValues:["Retail estimate (tonnes/year)", "Food service estimate (tonnes/year)"],
        xValue:"Region",
        chartHeight:200,
        chartWidth:500,
        barWidth:10,
        margin:20,
        axisThickness:1,
        chartPosX:250,
        chartPosY:700,
        ticks:10,
        fullTickLength: true,
        barColours: [color(23, 103, 184), color(255, 205, 10)],
        axisTextColour: color(0),
        axisColour: color(0),
        hundredPercent: false
    }));

    charts.push(new StackedBarChart({
        data:cleanedDataNicRegion,
        yValues:["Retail estimate (tonnes/year)", "Food service estimate (tonnes/year)"],
        xValue:"Region",
        chartHeight:200,
        chartWidth:500,
        barWidth:10,
        margin:20,
        axisThickness:1,
        chartPosX:250,
        chartPosY:1100,
        ticks:10,
        fullTickLength: true,
        barColours: [color(23, 103, 184), color(255, 205, 10)],
        axisTextColour: color(0),
        axisColour: color(0),
        hundredPercent: true
    }));

    charts.push(new BarChartHorizontal({
        data:cleanedDataNicRegion,
        yValue:"Region",
        xValue:"Retail estimate (tonnes/year)",
        chartHeight:400,
        chartWidth:200,
        barWidth:10,
        margin:20,
        axisThickness:1,
        chartPosX:200,
        chartPosY:1650,
        ticks:4,
        axisColour: color(0),
        barColour: color(255),
        axisTextColour: color(0),
        fullTickLength: true
    }));

    charts.push(new RadialBarChart({
        data:cleanedDataNicRegion,
        yValue:"Food service estimate (kg/capita/year)",
        xValue:"Region",
        scale:300,
        barWidth:40,
        chartPosX:700,
        chartPosY:1450,
        barColour: color(23, 103, 184),
        textColour: color(0),
    }));
    

    
};

function draw(){
    background(200);
    charts.forEach(chart => {
        //Error avoiding, checking if function exists in the class, if it does, run it, if it doesnt, ignore it
        if (typeof chart.renderLegend === "function") {
            chart.renderLegend();
        }
        if (typeof chart.renderChartBars === "function") {
            chart.renderChartBars();
        }
        if (typeof chart.renderChartBars === "function") {
            chart.renderTicks();
        }
        chart.renderDataBars();
        chart.renderLabels();

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

function cleanDataNicRegion() {
    let regionData = {};

    for (let i = 0; i < cleanedDataNic.length; i++) {
        // Get the region of the current data entry
        let region = cleanedDataNic[i]["Region"];

        // Get each of the figures for each data entry
        let combinedFiguresKgCapita = cleanedDataNic[i]["combined figures (kg/capita/year)"];
        let houseHoldEstimateKgCapita = cleanedDataNic[i]["Household estimate (kg/capita/year)"];
        let retailEstimateKgCapita = cleanedDataNic[i]["Retail estimate (kg/capita/year)"];
        let foodServiceEstimateKgCapita = cleanedDataNic[i]["Food service estimate (kg/capita/year)"];
        let houseHoldEstimateTonnes = cleanedDataNic[i]["Household estimate (tonnes/year)"];
        let retailEstimateTonnes = cleanedDataNic[i]["Retail estimate (tonnes/year)"];
        let foodServiceEstimateTonnes = cleanedDataNic[i]["Food service estimate (tonnes/year)"];

        // Check if the region already exists in the regionData object
        if (regionData[region]) {
            // If the region exists, add the combined figures to the existing value
            regionData[region].combinedFiguresKgCapita += combinedFiguresKgCapita;
            regionData[region].houseHoldEstimateKgCapita += houseHoldEstimateKgCapita;
            regionData[region].retailEstimateKgCapita += retailEstimateKgCapita;
            regionData[region].foodServiceEstimateKgCapita += foodServiceEstimateKgCapita;
            regionData[region].houseHoldEstimateTonnes += houseHoldEstimateTonnes;
            regionData[region].retailEstimateTonnes += retailEstimateTonnes;
            regionData[region].foodServiceEstimateTonnes += foodServiceEstimateTonnes;
        } else {
            // If the region does not exist, create a new entry with the combined figures
            regionData[region] = {
                combinedFiguresKgCapita: combinedFiguresKgCapita,
                houseHoldEstimateKgCapita: houseHoldEstimateKgCapita,
                retailEstimateKgCapita: retailEstimateKgCapita,
                foodServiceEstimateKgCapita: foodServiceEstimateKgCapita,
                houseHoldEstimateTonnes: houseHoldEstimateTonnes,
                retailEstimateTonnes: retailEstimateTonnes,
                foodServiceEstimateTonnes: foodServiceEstimateTonnes
            };
        }
    }

    // Cleanup
    for (let region in regionData) {
        cleanedDataNicRegion.push({
            Region: region,
            "combined figures (kg/capita/year)": regionData[region].combinedFiguresKgCapita,
            "Household estimate (kg/capita/year)": regionData[region].houseHoldEstimateKgCapita,
            "Retail estimate (kg/capita/year)": regionData[region].retailEstimateKgCapita,
            "Food service estimate (kg/capita/year)": regionData[region].foodServiceEstimateKgCapita,
            "Household estimate (tonnes/year)": regionData[region].houseHoldEstimateTonnes,
            "Retail estimate (tonnes/year)": regionData[region].retailEstimateTonnes,
            "Food service estimate (tonnes/year)": regionData[region].foodServiceEstimateTonnes
        });
    }
}

console.log("Cleaned data :", cleanedData);
console.log("Cleaned data Nichita :", cleanedDataNic);
console.log("Cleaned data NicRegion :",cleanedDataNicRegion);
