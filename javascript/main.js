/** ------------------------- //
//   Vocabular Builder by     // 
//     Keilon Robertson       //
// ------------------------- **/

var correct = 0;
var c = 0;//this stores how much times the print question function has been run. There should be 5 five questions, which means the print question function should only be run 5 times in one quiz.
var k = 0;//this stores the index of the randArray variable throughout the printQuestion function.
var $name = "";

function getName() {
    name = document.getElementById("user").value;
    document.getElementById("details").innerHTML = ("Are you ready, " + name + "?");
}

var randArray = [0,1,2,3,4,5,6,7,8,9,];//this represents the indexes of the questions array

randArray.sort(() => Math.random() -0.5); //once the order is randomized, the first 5 numbers would be shuffled... we can use these first 5 numbers to print 5 random indexes of the questions array

/** ARRAYS TO STORE THE DIFFERENT QUIZ ITEMS IN PARRALLEL **/
var word = [];
var hint = [];
var answer = [];
var option1 = [];
var option2 = [];
var option3 = [];
var option4 = [];
var question = [];

var xrequest = new XMLHttpRequest; 
xrequest.open("GET", "questions.xml", true)
xrequest.onreadystatechange = function() {
    if(xrequest.readyState === 4 && xrequest.status === 200){
        var xmlDoc = this.responseXML;
            
    for (var x = 0; x<10 ; x++)//loops through the xml file
    { question.push(xmlDoc.getElementsByTagName("question")[x]);//when a question tag is found this stores all of its children tags(hint, answer, word etc) and their values
        }
    
    for (var i = 0; i<10; i++) {//loops through each question and stores all the values into their respective arrays
        word.push(question[i].getElementsByTagName("word")[0].childNodes[0].nodeValue);
        answer.push(question[i].getElementsByTagName("answer")[0].childNodes[0].nodeValue);
        hint.push(question[i].getElementsByTagName("hint")[0].childNodes[0].nodeValue);
        option1.push(question[i].getElementsByTagName("option1")[0].childNodes[0].nodeValue);
        option2.push(question[i].getElementsByTagName("option2")[0].childNodes[0].nodeValue);
        option3.push(question[i].getElementsByTagName("option3")[0].childNodes[0].nodeValue);
        option4.push(question[i].getElementsByTagName("option4")[0].childNodes[0].nodeValue);
       
    }//each index now represents an entire question
        }
    };
xrequest.send(); 

var w = document.getElementById("quiz");
      w.style.display = "none";//hides the quiz section until the player clicks start 
var y = document.getElementById("restart");
      y.style.display = "none";//hides the restart button until the results are shown 

function startButton() {
  var x = document.getElementById("ready");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
    
    var g = document.getElementById("quiz");
  if (g.style.display === "none") {
    g.style.display = "block";
  } else {
    g.style.display = "none";
  }
}

function checkAnswer() {
    if (document.activeElement.innerHTML === answer[x]){
        alert("You are correct!!");
        correct++;
    }
    
    else{
        alert("Baka!!, the correct answer is : " + answer[x]);
    }
    if (c === 5)//when the print question function has been run 5 times, the quiz is over, so the results must be printed.
        {
            printResults();
        } 
    else{//once the quiz is not over, the next question is printed
            printQuestion();
        }
}

function printQuestion() { 
    x = randArray[k]; //stores the next number in the array so that the following code will use the appropriate index for the questions array.
        document.getElementById("word").innerHTML = word[x];
        document.getElementById("hint").innerHTML = hint[x];
        document.getElementById("option1").innerHTML = option1[x];
        document.getElementById("option2").innerHTML = option2[x];
        document.getElementById("option3").innerHTML = option3[x];
        document.getElementById("option4").innerHTML = option4[x];  
    k++;// increment the current index of the array, so that the next time, the following index's questions will be printed
    c++;//this will increment until it reaches 5 since the quiz is 5 questions long
}//END PRINT QUESTION

function printResults(total) {
    document.getElementById('head').innerHTML = "RESULTS!!"
    if (correct === 5) {
     document.getElementById("quiz").innerHTML = ("Congratulations "+ name +"!!! You scored a perfect 5/5");
    }
    else if(correct === 4) {
     document.getElementById("quiz").innerHTML = (name+", that was good!! You Scored 4/5");
        }
    else if(correct === 3) {
     document.getElementById("quiz").innerHTML = ("Not great "+ name +"... You scored 3/5");
        }
    else if(correct === 2) {
     document.getElementById("quiz").innerHTML = ("Ooof "+ name +" You scored 2/5");
        }
    else {
     document.getElementById("quiz").innerHTML = ( name +", To say you need to go back to school, is an understatement....yOu aRe InCrEdIbLy SmArT.... "+ correct +"/5");
        }    
    
     var y = document.getElementById("restart");
    if (y.style.display === "block"){
      y.style.display = "none";  
    } else {
        y.style.display = "block";
    }//shows the restart button when the game is done
    
}//END PRINT RESULTS