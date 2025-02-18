let friend01 = {name:"dave",age:21, bowling:true};
let friend02 = {name:"pete",age:34, bowling:false};
let friend03 = {name:"eric",age:20, bowling:true};
let friend04 = {name:"jeff",age:21, bowling:false};
let friend05 = {name:"joe",age:34, bowling:false};
 
let friends = [];
let friendAges = [];
let friendBowlingAges = [];
 
friends.push(friend01)
friends.push(friend02)
friends.push(friend03)
friends.push(friend04)
friends.push(friend05)
 
for(let index=0; index<5; index++){
    friendAges.push(friends[index].age)
}
 
for(let index=0; index<5; index++){
    if(friends[index].bowling == true){
    friendBowlingAges.push(friends[index].age)
    }
}
 
//function calcAvg(friendBowlingAges) {
  //  let age=0;
  //  for (let friendBowlingAges of friends) {
      //  age += friendBowlingAges.age;
       // }
        //return age / friendBowlingAges.length;
//}
 
//function calcAvg(arrayNums) {
    //let startValue=0;
    //for (let i=0; i<arrayNums.length; i++){
        //startValue = startValue + arrayNums[i]
    //}
    //return startValue/arrayNums.length;
//}
 
//for(let i =0; i<=100; i++){
    //if(i%5==0){console.log(i)}
//}
 
function median(arrayNums){
    arrayNums.sort((a,b) => (a,b))
 
    if(arrayNums.length%2==0){
        let endNum = arrayNums.length/2
        let startNum = endNum-1
 
        return (arrayNums[startNum] + arrayNums[endNum])/2
    } else{
        return arrayNums[Math.floor(arrayNums.length/2)]
    }
}
 
//console.log("The average age is:",calcAvg(friendBowlingAges));