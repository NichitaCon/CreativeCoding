class PieChart {
    constructor(obj){
        this.data = [...obj.data];
        this.yValue = obj.yValue;
        this.xValue = obj.xValue;
        this.scale = obj.scale;
        this.barWidth = obj.barWidth || 10;
        this.chartPosX = obj.chartPosX || 50;
        this.chartPosY = obj.chartPosY || 450;
        this.barColour = obj.barColour || color(0);
        this.textColour = obj.textColour || color(0);
        this.maxArray = (this.data.map(row => row[this.yValue]));
        this.maxNum = max(this.maxArray);
        this.scaler = 270/this.maxNum

        this.data.sort((a, b) => b[this.yValue] - a[this.yValue]);
    }


    renderLegend(){
        push();
            translate(this.chartPosX,this.chartPosY)
            push();
                translate(0,-this.scale*.6)
                //TopLegend
                fill(this.textColour);
                textAlign(CENTER,CENTER)
                textSize(20)
                text(this.yValue,15,0)
            pop();
        pop();
    }

    renderDataBars(){
        push();
            translate(this.chartPosX, this.chartPosY);


            let start = 0
            let end = 270
            console.log(this.chartHeight)
            push();
            rotate(-90)
                for(let i = 0; i<this.data.length; i++){
                    fill(this.barColour)
                    stroke(0);
                    let start = 0;
                    let end = (this.data[i][this.yValue]*this.scaler);
                    //Drawing main Arc
                    arc (0,0, this.scale, this.scale, start, end,PIE)
                    fill(255)
                    //Drawing BackFill "Fake" Arc
                    noStroke()
                    arc (0,0, this.scale-this.barWidth, this.scale-this.barWidth, start, 270,PIE)
                    textSize(7);                    
                    scale(.85)
                }
            pop();

        pop();

    }


    renderLabels(){

        let textPos =
        .985*((.5*this.scale)-(.2*this.barWidth))

        push();
            translate(this.chartPosX, this.chartPosY);
            rotate(-90)
            push();
                for(let i = 0; i<this.data.length; i++) {
                    textAlign(RIGHT,CENTER)

                        push()
                            translate(textPos,-5)
                            rotate(90)
                            textSize(15);
                            fill(this.textColour)
                            text(this.data[i][this.xValue] + ": " + this.data[i][this.yValue], 0, i*this.data.length/(.5*this.scale));
                            
                        pop()

                    scale(.85)
                }
            pop();
        pop();
    };

        
}

