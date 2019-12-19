//TODO: STEP 1 - Import the useState hook.
import React, {useState, useEffect} from "react";
import "./App.css";
import BottomRow from "./BottomRow";


function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [quarter, setQuarter] = useState(1);
  const [time, setTime] = useState(35);
  const [isActive, setActive] = useState(true);

  const touchDownHome = (e) => {
setHomeScore(homeScore + 7);
  };

  const fieldGoalHome  = (e) => {
    setHomeScore(homeScore + 3);

  };

  const touchDownAway = (e) => {
    setAwayScore(awayScore + 7);
      };
    
      const fieldGoalAway = (e) => {
        setAwayScore(awayScore + 3);
    
      };

      const reset = (e) => {
        setQuarter(0);
        setHomeScore(0);
        setAwayScore(0);
      }

      

      useEffect(()=>{
        let interval = null;
        if(isActive && time > 0){
          interval=
        setInterval(() => {
          setTime(time => time - 1);
        },
         1000)}
         else if(!isActive && time != 0) {
         clearInterval(interval)
         } else if (time = 0 && quarter <= 4){
           setTime(35);
           nextQuarter();

         }
         else if ((time === 0 && quarter === 4) || quarter === "OT" ||quarter === 'OT2'){
           clearInterval(interval);
           setQuarter();
           setTime(35);
         }
        
         return () => clearInterval(interval)
      },[time, isActive])

      const leader = homeScore > awayScore ? 'Lions Win!' : 'Jags Win!'

      const nextQuarter = (e) => {
        //if else for 'OT' and/or standard quarters in a game//
        if (homeScore === awayScore && quarter === 4){
          setQuarter('OT')
        } else if(quarter === 4){
          alert (`End of Game and ${leader}`)
          reset()
        } else if (quarter === 'OT'){
          setQuarter(quarter + '2')
        }else if (quarter === 'OT2'){
          if (homeScore === awayScore){
            alert ('End of Game in a TIE')
            reset()
          } else {
            alert(`The winner is ${leader}`)
            reset()
          }
        }
        else setQuarter(quarter + 1);
      }

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Detroit Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{homeScore}</div>
          </div>
          <div className="timer">{time}</div>
          <div className="away">
            <h2 className="away__name">Jax Jaguars</h2>
            <div className="away__score">{awayScore}</div>
          </div>
        </div>
        <BottomRow quarter = {quarter} />
      </section>
      <section className="buttons">
      {/*Strecth Goal*/}
      <button onClick = {nextQuarter} >Next Quarter</button>

        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick = {touchDownHome}>Home Touchdown</button>
          <button  className="homeButtons__fieldGoal" onClick = {fieldGoalHome}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick = {touchDownAway} >Away Touchdown</button>
          <button  className="awayButtons__fieldGoal" onClick = {fieldGoalAway}>Away Field Goal</button>
        </div>
      </section>
    </div>
  );
}

export default App;
