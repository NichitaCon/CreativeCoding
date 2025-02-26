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
        this.ticks = obj.ticks || 0;
        this.fullTickLength = obj.fullTickLength || false;
        this.barColours = obj.barColours || [color(255, 255, 255), color(0, 255, 255)];
        this.axisTextColour = obj.axisTextColour || color(0);
        this.axisColour = obj.axisColour || color(0);

        this.maxNum = max(this.data.map(row => 
        row["Household estimate (tonnes/year)"] + row["Food service estimate (tonnes/year)"]));
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartHeight/this.maxNum





        
    }

    renderChartBars(){
        push();
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
        translate(this.chartPosX,this.chartPosY)
            push()
            translate(this.margin, 0)
            for (let i = 0; i<this.data.length; i++){
                let xPos = (this.barWidth + this.gap)*i;
                push();
                    translate(xPos,0)

                    for(let j=0; j<this.yValues.length; j++){
                        fill(this.barColours[j]);
                        noStroke();
                        rect (0,0,this.barWidth, -this.data[i][this.yValues[j]]*this.scaler);
                        translate(0,-this.data[i][this.yValues[j]]*this.scaler);
                    }
                pop();
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
                    fill(this.axisTextColour);
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
            let tickLength;
            if (this.fullTickLength == true) {
                tickLength = this.chartWidth
            }else {
                tickLength = -10
            }
            let tickIncriment = this.chartHeight / this.ticks;
            let multiplier = this.maxNum / this.ticks;
            for(let i=0; i<=this.ticks; i++){
                // Can be improved, -10 can be made into a variable
                line (0, -tickIncriment*i, tickLength, -tickIncriment*i)

                push();
                    noStroke();
                    fill(this.axisTextColour)
                    textAlign(RIGHT,CENTER)
                    text(Math.floor(i*multiplier), -15, -tickIncriment*i);
                pop();
            }
        pop();
    };
        
}

