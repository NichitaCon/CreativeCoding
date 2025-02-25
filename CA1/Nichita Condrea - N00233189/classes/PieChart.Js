class PieChart {
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
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2))/(this.data.length-1);
        this.scaler = this.chartHeight/(max(this.data.map(row => row[this.yValue])));
        this.axisColour = color(255, 255, 255);
        this.barColour = color(255, 255, 255);
        this.axisTextColour = color(255, 255, 255);
    }


    renderDataBars(){
        push();
            translate(this.chartPosX, this.chartPosY);
            for(let i = 0; i<this.data.length; i++){
                console.log(i)
                fill(random(255), 200, random(0))
                stroke(255);
                let start = 0;
                let end = ((this.data[i]/total)*360);
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


    // renderLabels(){
    //     push();
    //         translate(this.chartPosX, this.chartPosY);
    //         push();
    //             translate(this.margin, 0)
    //             for(let i = 0; i<this.data.length; i++) {
    //                 let xPos = i*(this.barWidth + this.gap);
    //                 textSize(7);
    //                 fill(255);
    //                 noStroke()
    //                 textAlign(LEFT,CENTER)
    //                 push()
    //                     translate(xPos + (this.barWidth/2),10)
    //                     rotate(45)
    //                     text(this.data[i][this.xValue], 0, 0);
    //                 pop()
    //             }
    //         pop();
    //     pop();
    // };

        
}

