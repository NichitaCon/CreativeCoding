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
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    noLoop();
    cleanData();
    cleanDataNic();
    cleanDataNicRegion();

    // Debugging: Log the cleanedDataNicRegion array
    // console.log("cleanedDatan in setup:", cleanedData);
    // console.log("cleanedDataNicRegion in setup:", cleanedDataNicRegion);

    charts.push(new StackedBarChart({
        data:cleanedDataNicRegion,
        yValues:["Household estimate (tonnes/year)", "Food service estimate (tonnes/year)"],
        xValue:"Region",
        chartHeight:200,
        chartWidth:400,
        barWidth:10,
        margin:20,
        axisThickness:2,
        chartPosX:300,
        chartPosY:700,
        ticks:10,
        barColours: [color(0,200,0), color(100,0,0)]
    }));
    

    
    charts.push(new BarChart({
        data:cleanedData,
        yValue:"Female",
        xValue:"Age_Group",
        chartHeight:200,
        chartWidth:200,
        barWidth:10,
        margin:20,
        axisThickness:2,
        chartPosX:250,
        chartPosY:200,
        ticks:3
    }));
    
};
 
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

function cleanDataNicRegion() {
    let regionData = {};

    // Aggregate data by region
    for (let i = 0; i < cleanedDataNic.length; i++) {
        // Get the region of the current data entry
        let region = cleanedDataNic[i]["Region"];
        // Get the combined figures (kg/capita/year) of the current data entry
        let combinedFiguresKgCapita = cleanedDataNic[i]["combined figures (kg/capita/year)"];
        let houseHoldEstimateTonnes = cleanedDataNic[i]["Household estimate (tonnes/year)"];
        let retailEstimateTonnes = cleanedDataNic[i]["Retail estimate (tonnes/year)"];
        let foodServiceEstimateTonnes = cleanedDataNic[i]["Food service estimate (tonnes/year)"];

        // Check if the region already exists in the regionData object
        if (regionData[region]) {
            // If the region exists, add the combined figures to the existing value
            regionData[region].combinedFiguresKgCapita += combinedFiguresKgCapita;
            regionData[region].houseHoldEstimateTonnes += houseHoldEstimateTonnes;
            regionData[region].retailEstimateTonnes += retailEstimateTonnes;
            regionData[region].foodServiceEstimateTonnes += foodServiceEstimateTonnes;
        } else {
            // If the region does not exist, create a new entry with the combined figures
            regionData[region] = {
                combinedFiguresKgCapita: combinedFiguresKgCapita,
                houseHoldEstimateTonnes: houseHoldEstimateTonnes,
                retailEstimateTonnes: retailEstimateTonnes,
                foodServiceEstimateTonnes: foodServiceEstimateTonnes
            }

        }
    }

    // Cleanup
    for (let region in regionData) {
        cleanedDataNicRegion.push({
            Region: region,
            "combined figures (kg/capita/year)": regionData[region].combinedFiguresKgCapita,
            "Household estimate (tonnes/year)": regionData[region].houseHoldEstimateTonnes,
            "Retail estimate (tonnes/year)": regionData[region].retailEstimateTonnes,
            "Food service estimate (tonnes/year)": regionData[region].foodServiceEstimateTonnes
        });
    }
}

console.log("Cleaned data :", cleanedData);
console.log("Cleaned data Nichita :", cleanedDataNic);
console.log("Cleaned data NicRegion :",cleanedDataNicRegion);


// create window system