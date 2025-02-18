let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 600;
let barWidth = 18;
let margin = 15;
let gap;
let scaler;
let axisThickness = 1;
let chartPosX = 50;
let chartPosY = 350;
let axisColour;
let barColour;
let axisTextColour;
let yValues = ["Male", "Female"];
let xValue = "Age_Group";
let yValueTotal = "Total";
let barColours = [];

function preload() {
	data = loadTable("data/Combined.csv", "csv", "header");
}

function setup() {
	createCanvas(1000, 500);
	angleMode(DEGREES);
	noLoop();
	cleanData();

	barColours.push(color(125, 34, 56));
	barColours.push(color(225, 34, 56));
	barColours.push(color(225, 34, 156));

	//prettier-ignore
	gap =
		(chartWidth - (cleanedData.length * barWidth * yValues.length) - (margin * 2)) /
		(cleanedData.length - 1);

	let maxValues = [];
	yValues.forEach((value) => {
		maxValues.push(cleanedData.map((row) => row[value]));
	});
	let maxValue = max(maxValues.flat(5));

	scaler = chartHeight / maxValue;

	axisColour = color(100);
	axisTextColour = color(125);
}

function draw() {
	background(200);

	push();
	translate(chartPosX, chartPosY);

	push();
	translate(margin, 0);

	for (let i = 0; i < cleanedData.length; i++) {
		push();
		translate((gap + barWidth * yValues.length) * i, 0);

		for (let j = 0; j < yValues.length; j++) {
			noStroke();
			fill(barColours[j % 3]);
			rect(barWidth * j, 0, barWidth, -cleanedData[i][yValues[j]] * scaler);

			fill(axisTextColour);
			noStroke();
			textAlign(LEFT, CENTER);
			textSize(12);
			push();
			translate(barWidth, 10);
			rotate(60);
			text(cleanedData[i][xValue], 0, 0);
			pop();
		}
		pop();
	}
	pop();

	noFill();
	stroke(axisColour);
	strokeWeight(axisThickness);
	line(0, 0, 0, -chartHeight);
	line(0, 0, chartWidth, 0);

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
