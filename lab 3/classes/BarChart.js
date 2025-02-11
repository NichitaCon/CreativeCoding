class BarChart {
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
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartHeight/(max(cleanedData.map(row => row[this.yValue])))
        this.axisColour = color(255, 255, 255);
        this.barColour = color(255, 255, 255);
        this.axisTextColour = color(255, 255, 255);
    }

    renderChartBars(){
        push();

            //Chart Bars
            translate(this.chartPosX,this.chartPosY)
            noFill();
            text('hi', 50, 50);
            stroke(this.axisColour);
            strokeWeight(this.axisThickness);
            line (0,0,0, -this.chartHeight)
            line (0,0, this.chartWidth,0)

        pop();
    }

    renderDataBars(){
        push();
            translate(this.chartPosX, this.chartPosY);
            //Data Bars
            translate(this.margin, 0)
            for(let i = 0; i<this.data.length; i++) {
                let xPos = i*(this.barWidth + this.gap);
                fill(this.barColour);
                noStroke()
                rect(xPos,0,this.barWidth, -this.data[i][this.yValue]*this.scaler)
            }
        pop();
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
            let tickIncriment = this.chartHeight/5;
            for(let i=0; i<=5; i++){
                line (0, -tickIncriment*i, -10, -tickIncriment)
            }
        pop();
    };
        
}

