let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth=30;
let margin = 15;
let gap;
let scaler;
let axisThickness=5;
let chartPosX = 50;
let chartPosY = 400;
let axisColour;
let barColour;
let axisTextColour;
let yValues = ["Female", "Male"];
let xValue = "Age_Group";
let yValueTotal = "Total";

function preload(){
    data = loadTable('data/Combined.csv', 'csv', 'header')
}

function setup(){
    createCanvas(500,500);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    gap = (chartWidth - (cleanedData.length * barWidth) - (margin*2))/(cleanedData.length-1)
    scaler = chartHeight/(max(cleanedData.map(row => row[yValueTotal])));

   axisColour = color(255, 204, 0);
   barColour = color(0,200,50)
   axisTextColour = color(125)
}

function draw(){
   background(200);

   push()
   translate(chartPosX,chartPosY)
   noFill()
   stroke(axisColour);
   strokeWeight(axisThickness)
   line (0,0,0,-chartHeight)
   line (0,0,chartWidth,0)
   
   push()
   translate(margin,0)
   //HORIZONTAL LOOP
    for(let i=0; i<cleanedData.length; i++){
        let xPos = (barWidth + gap)*i;

        // VERTICAL LOOP
        push();
            for(let j=0; j<2; j++){
                fill(barColour);
                noStroke();
                fill(255, random(255), 0);

                rect (xPos,0,barWidth, -cleanedData[i][yValues[j]]*scaler);
                translate(0, -cleanedData[i][yValues[j]]*scaler);
                }
        pop();

        // fill(barColour);
        // noStroke();
        // rect (xPos,0,barWidth, -cleanedData[i][yValue]*scaler)

        fill(axisTextColour);
        noStroke();
        textAlign(LEFT,CENTER);
        textSize(8);
        push()
        translate(xPos + (barWidth/2),10)
        rotate(60)
        text (cleanedData[i][xValue], 0, 0);
        pop()
    }
    pop()

    pop()
   

}

function cleanData(){
    for(let i=0; i<data.rows.length; i++ ){
        cleanedData.push(data.rows[i].obj)
   }

   for(let i=0; i<cleanedData.length; i++ ){
        cleanedData[i].Female = parseInt(cleanedData[i].Female)
        cleanedData[i].Male = parseInt(cleanedData[i].Male)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)
    }

}


