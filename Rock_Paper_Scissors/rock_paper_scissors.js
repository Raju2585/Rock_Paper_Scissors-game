
// localStorage - it is a object for storing our data permenantly in system
// It will take only string values
// JSON(Javascript Object Notation) - It is an built in object used to convert js object into JSON object 
// So we can use that JSON object in many situations like passing that data into databases etc

let scores=JSON.parse(localStorage.getItem('scores'))||
{
    wins:0,
    loses:0,
    ties:0
};
updatescores();

// functino to implement the game 
// It takes playermove as argument and computer move from the another function
// and assigns the result by comparing both the moves
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r')
    {
        playgame('rock');
    }
    else if(event.key==='p')
    {
        playgame('paper');
    }
    else if(event.key==='s')
    {
        playgame('scissors');
    }
    
});
function playgame(playermove)
{
    const cmove=pickamove();
    let res='';
    if(playermove==='rock')
    {
        if(cmove==='rock')
        {
            res='Tie';
        }
        else if(cmove==='paper')
        {
            res='You lose';
        }
        else if(cmove==='scissors')
        {
            res='You win';
        }
    }
    else if(playermove==='paper')
    {
        if(cmove==='rock')
        {
            res='You win';
        }
        else if(cmove==='paper')
        {
            res='Tie';
        }
        else if(cmove==='scissors')
        {
            res='You lose';
        }
    }
    else if(playermove==='scissors')
    {
        if(cmove==='rock')
        {
            res='You lose';
           
        }
        else if(cmove==='paper')
        {
            res='You win';
        }
        else if(cmove==='scissors')
        {
            res='Tie'; 
        }
    }
    if(res==='You win')
    {
        scores.wins+=1;
    }
    else if(res==='You lose')
    {
        scores.loses+=1;
    }
    else if(res==='Tie')
    {
        scores.ties+=1;
    }
    // Storing json object in the system
    localStorage.setItem('scores',JSON.stringify(scores));
    document.querySelector('.js-result').innerHTML=res;
    document.querySelector('.js-moves').innerHTML=`You <img src="images/${playermove}-emoji.png" class="moves">,Computer <img src="images/${cmove}-emoji.png" class="moves">`;
    updatescores();
}
// function for picking a move by the computer 
// it will take a random value from 0-1
// Assign to cmove according to that values and return it

function pickamove()
{
    const Random=Math.random();
    let cmove='';
    if(Random>=0 && Random<1/3)
    {
        cmove='rock';
    }
    else if(Random>=1/3 && Random<2/3)
    {
        cmove='paper';
    }
    else if(Random>=2/3 && Random<1)
    {
        cmove='scissors';
    }
    return cmove;
}    
// function to update the scores after every game
function updatescores()
{
    document.querySelector('.js-scores').
    innerHTML=`wins:${scores.wins},loses:${scores.loses},ties:${scores.ties}`;
}

// function to reset the scores whenever player clicks the reset scores button

function resetscores()
{
    scores.wins=0;
    scores.loses=0;
    scores.ties=0;
    localStorage.removeItem('scores');
    updatescores();
    document.querySelector('.js-result').innerHTML='';
    document.querySelector('.js-moves').innerHTML='';
}