import { HeartRateSensor } from "heart-rate";
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today } from "user-activity";
import { battery } from "power";
import { goals } from "user-activity";
import { today } from "user-activity";
import * as battery from "battery";
import { me as device } from "device";
import * as messaging from "messaging";

import * as util from "../common/utils";

console.log("PiSaucer's SudoFitbit Version 0.15")

// Update the clock every minute
clock.granularity = "seconds"; //clock is refreshing every sec. It is possible to select minutes as well

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
let elDate = document.getElementById("date");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let dtDate = new Date();
  let hours = today.getHours();
  
   elDate.text = `${util.getDay3(dtDate.getDay())} ${dtDate.getDate()} ${util.getMonth3(dtDate.getMonth())}`;
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
}


// steps
let txtSteps = document.getElementById("txtSteps");

// still steps 
//inside the clock tick handler
txtSteps.text = today.adjusted.steps || 0;


//batt
const batteryHandle = document.getElementById("batteryLabel");

  // Battery Measurement
  let batteryValue = battery.chargeLevel; // measure the battery level and send it to the variable batteryValue
  
  // Assignment value battery
  batteryHandle.text = `${batteryValue}%`;


//hr
const heartrateHandle = document.getElementById("heartrateLabel");

// The following block read the heart rate from your watch
const hrm = new HeartRateSensor();

hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate} BPM`;
}
hrm.start();


