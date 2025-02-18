let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth = 30;
let margin = 15;
let axisThickness = 1;
let chartPosX = 50;
let chartPosY = 350;
let yValue = "Female";
let xValue = "Age_Group";
let gap;
let scaler;
let axisColour;
let barColour;
let axisTextColour;

function preload() {
	data = loadTable("data/Combined.csv", "csv", "header");
}

function setup() {
	createCanvas(500, 500);
	angleMode(DEGREES);
	noLoop();
	cleanData();

	gap =
		(chartWidth - cleanedData.length * barWidth - margin * 2) /
		(cleanedData.length - 1);
	scaler = chartHeight / max(cleanedData.map((row) => row.Female));

	axisColour = color(100);
	barColour = color(0, 200, 50);
	axisTextColour = color(125);
}

function draw() {
	background(200);

	push();
	translate(chartPosX, chartPosY);



	pop();
}

function cleanData() {
	for (let i = 0; i < data.rows.length; i++) {
		cleanedData.push(data.rows[i].obj);
	}

	for (let i = 0; i < cleanedData.length; i++) {
		cleanedData[i].Female = parseInt(cleanedData[i].Female);
		cleanedData[i].Male = parseInt(cleanedData[i].Male);
		cleanedData[i].Total = parseInt(cleanedData[i].Total);
	}
}
