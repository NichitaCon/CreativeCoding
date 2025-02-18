let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth = 30;
let margin = 15;
let axisThickness = 1;
let chartPosX = 200;
let chartPosY = 200;
let yValue = "Female";
let xValue = "Age_Group";
let gap;
let scaler;
let axisColour;
let barColour;
let axisTextColour;

let myNewArray;
let total;
let font;

function preload() {
	data = loadTable("data/Combined.csv", "csv", "header");
	font = loadFont("static/Montserrat-Medium.ttf")
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

	myNewArray = cleanedData.map(row => row.Female);
	total = 0;
	myNewArray.forEach(item => total = total + item);
	console.log(total);

}

function draw() {
	background(200);

	push();
	translate(chartPosX, chartPosY);

	

	for(let i = 0; i<myNewArray.length; i++){
		fill(random(255), 200, random(0))
		stroke(255);
		let start = 0;
		let end = ((myNewArray[i]/total)*360);
		arc (0,0, 200, 200, start, end,PIE)
		rotate(end);
	}
	textSize(30)
	fill(0)
	noStroke()
	textFont(font)
	text("NICHITAAA",0,0)
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
