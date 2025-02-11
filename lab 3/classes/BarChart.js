class BarChart {
    constructor(_data,_yValue, _xValue, _chartHeight,_chartWidth,_barWidth,_margin,_axisThickness,_chartPosX,_chartPosY){
        this.data = _data;
        this.yValue = _yValue;
        this.xValue = _xValue;
        this.chartHeight = _chartHeight;
        this.chartWidth = _chartWidth;
        this.barWidth = _barWidth;
        this.margin = _margin;
        this.axisThickness = _axisThickness;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartHeight/(max(cleanedData.map(row => row[this.yValue])))
        this.axisColour = color(255, 255, 255);
        this.barColour = color(255, 255, 255);
        this.axisTextColour = color(255, 255, 255);
    }

    renderChartBars(){
    push()

        //Chart Bars
        translate(this.chartPosX,this.chartPosY)
        noFill();
        text('hi', 50, 50);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
        line (0,0,0, -this.chartHeight)
        line (0,0, this.chartWidth,0)

    pop()
    let femaleScores = cleanedData.map(row => row.Female)
    let ageGroups = cleanedData.map(row => row.Age_Group)

    console.log(femaleScores, ageGroups)
    }

    renderDataBars(){
        
        push();
            translate(this.chartPosX, this.chartPosY);
            //Data Bars
            push();
            translate(this.margin, 0)
            for(let i = 0; i<this.data.length; i++) {
                let xPos = i*(this.barWidth + this.gap);
                fill(this.barColour)
                rect(xPos,0,this.barWidth, -this.data[i][this.yValue]*this.scaler)
            }
        pop()
    let femaleScores = cleanedData.map(row => row.Female)
    let ageGroups = cleanedData.map(row => row.Age_Group)

    console.log(femaleScores, ageGroups)
    }

    renderLabels(){
        push()
            //Data Bars
            push();
            translate(this.margin, 0)
            for(let i = 0; i<this.data.length; i++) {
                let xPos = i*(this.barWidth + this.gap);
                fill(this.barColour)
                rect(xPos,0,this.barWidth, -this.data[i][this.yValue]*this.scaler)
    
                //TEXT
                push()
                    textSize(7);
                    fill(255);
                    stroke(0);
                    strokeWeight(1);
                    textAlign(LEFT,CENTER)
                    push()
                        translate(xPos + (this.barWidth/2),10)
                        rotate(45)
                        text(this.data[i][this.xValue], 0, 0);
                    pop()
                pop()
                
            }
        pop()
    let femaleScores = cleanedData.map(row => row.Female)
    let ageGroups = cleanedData.map(row => row.Age_Group)

    console.log(femaleScores, ageGroups)
    }

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
    }
        
}

