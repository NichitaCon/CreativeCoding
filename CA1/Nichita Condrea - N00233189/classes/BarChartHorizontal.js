class BarChartHorizontal {
    constructor(obj){
        this.data = obj.data;
        this.yValue = obj.yValue;
        this.xValue = obj.xValue;
        this.chartHeight = obj.chartHeight || 300;
        this.chartWidth = obj.chartWidth || 300;
        this.barWidth = obj.barWidth || 10;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 450;
        this.ticks = obj.ticks || 5;
        this.gap = (this.chartHeight - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartWidth/(max(this.data.map(row => row[this.xValue])));
        this.axisColour = obj.axisColour || color(255, 255, 255);
        this.barColour = obj.barColour || color(255, 255, 255);
        this.axisTextColour = obj.axisTextColour || color(255, 255, 255);
        this.fullTickLength = obj.fullTickLength || false;
    }


    renderLegend(){
        push();
            translate(this.chartPosX,this.chartPosY)
            push();
                translate(this.chartWidth/2, -this.chartHeight-30)
                fill(this.axisTextColour);
                textAlign(CENTER,CENTER)
                //Graph title
                text(this.xValue,15,0)
            pop();
        pop();
    }

    renderDataBars(){
        push();
            translate(this.chartPosX, this.chartPosY);
            translate(0, this.margin)
            push()
                translate(0,-this.chartHeight)
                //Data bars LOOP
                for(let i = 0; i<this.data.length; i++) {
                    let yPos = i*(this.barWidth + this.gap);
                    fill(this.barColour);
                    noStroke()
                    rect(0,yPos,this.data[i][this.xValue]*this.scaler, this.barWidth)
                }
            pop()
        pop();
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


    renderLabels(){
        push();
            translate(this.chartPosX, this.chartPosY);
            push();
                translate(-15, this.margin)
                push();
                    translate(0,-this.chartHeight)
                    for(let i = 0; i<this.data.length; i++) {
                        let yPos = i*(this.barWidth + this.gap);
                        textSize(7);
                        fill(this.axisTextColour);
                        noStroke()
                        textAlign(RIGHT,CENTER)
                        push()
                            translate(10, yPos + (this.barWidth/2))
                            text(this.data[i][this.yValue], 0, 0);
                        pop()
                    }
                pop();
            pop();
        pop();
    };

    renderTicks(){
        push();
            translate(this.chartPosX, this.chartPosY)
            noFill()
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);

            //if/else statement for user choice on 100% tick length or short
            let tickLength;
            if (this.fullTickLength == true) {
                tickLength = -this.chartHeight
            }else {
                tickLength = 10
            }

            let tickIncriment = this.chartWidth / this.ticks;
            let multiplier = max(this.data.map(row => row[this.xValue])) / this.ticks
            for(let i=0; i<=this.ticks; i++){
                line(tickIncriment*i, 0, tickIncriment*i, tickLength);

                push()
                    noStroke();
                    fill(this.axisTextColour)
                    translate(tickIncriment*i-5,20)
                    rotate(45)
                    text(i*multiplier, 0, 0);
                pop()
            }
        pop();
    };
        
}

