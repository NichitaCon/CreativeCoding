class StackedBarChart {
    constructor(obj){
        this.data = obj.data;
        this.yValues = obj.yValues;
        this.xValue = obj.xValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 450;
        this.ticks = obj.ticks || 5;
        this.barColours = obj.barColours || [color(255, 255, 255), color(0, 255, 255)];

        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartHeight/(max(this.data.map(row => row[this.yValue])));
        this.axisColour = color(255, 255, 255);

        this.axisTextColour = color(255, 255, 255);
    }

    renderChartBars(){
        push();
        console.log(this.barColours)
            //Chart Bars
            translate(this.chartPosX,this.chartPosY)
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            line (0,0,0, -this.chartHeight)
            line (0,0, this.chartWidth,0)
        pop();
    }

    renderDataBars(){
        push()
            push()
            console.log(this.yValues)
            for (let i = 0; i<this.data.length; i++){
                let xPos = (this.barWidth + this.gap)*i;
                translate(xPos,0)
                console.log(i)
                for(let j=0; j<this.yValues.length; j++){
                    fill(255);
                    noStroke();
                
                    rect (0,0,this.barWidth, -this.data[i][this.yValues[j]]);
                    translate(0,-this.data[i][this.yValues[j]])
                }
            }
            pop()
        pop()
    }

    renderLabels(){
        push();
            translate(this.chartPosX, this.chartPosY);
            push();
                translate(this.margin, 0)
                for(let i = 0; i<this.data.length; i++) {
                    let xPos = i*(this.barWidth + this.gap);
                    textSize(7);
                    fill(255);
                    noStroke()
                    textAlign(LEFT,CENTER)
                    push()
                        translate(xPos + (this.barWidth/2),10)
                        rotate(45)
                        text(this.data[i][this.xValue], 0, 0);
                    pop()
                }
            pop();
        pop();
    };

    renderTicks(){
        push();
            translate(this.chartPosX, this.chartPosY)
            noFill()
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            let tickIncriment = this.chartHeight / this.ticks;
            console.log("yvalues1", this.yValues[0], "yValues2", this.yValues[1])
            let multiplier = max(this.data.map(row => row[this.yValues[0]])) + max(this.data.map(row => row[this.yValues[1]])) / this.ticks
            for(let i=0; i<=this.ticks; i++){
                // Can be improved, -10 can be made into a variable
                line (0, -tickIncriment*i, -10, -tickIncriment*i)

                push();
                    noStroke();
                    fill(255)
                    textAlign(RIGHT,CENTER)
                    text(Math.floor(i*multiplier), -15, -tickIncriment*i);
                pop();
            }
        pop();
    };
        
}

