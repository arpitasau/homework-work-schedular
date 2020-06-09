// Identifying DOM elements
var $currentDay = $("#currentDay");
var $businessHours = $(".business-hours");
var $saveButton = $(".btn");
var $container = $(".container-fluid");
var currentTime = getCurrentTime();

//creating array of $businessHours
var businessHours = [];

var events = JSON.parse(localStorage.getItem('events')) || {};

// this function is to make sure javascript starts  after HTML is loaded
$(document).ready(function() {
  populateBusinessHours();
  populateRows();
  getTodaysDate();
});  

function populateBusinessHours() {
  var currentDOW = moment().isoWeekday();
  if (currentDOW <= 5) {
    for(var i = 0; i < 9; i++) {
      var initialTime = moment('09:00 am', "HH:mm a"); 
      var incrementalTime = initialTime.add(moment.duration(i, 'hours'));
      businessHours.push(incrementalTime);
    }

    for(var i = 0; i < businessHours.length; i++) {
      console.log(businessHours[i].format('LT'));
      amIBetween = currentTime.isBetween(businessHours[i], businessHours[i+1]);
      pastTime = currentTime.isAfter(businessHours[i+1]);
      
      if (pastTime === true) {
        console.log("I am grey");
        //$(".event-text").get(i).attr("class", "past");
      } else {
        if (amIBetween === true) {
          console.log("I am red");
          //$(".event-text").get(i).attr("class", "present");
        }else {
          console.log("I am green");
          //$(".event-text").get(i).attr("class", "future");
        }
      }
    }
  }
}
//Function to get date using moment.js
//Refer https://momentjs.com/docs/ search for LLLL and http://zetcode.com/javascript/momentjs/
function getTodaysDate() {
  var today = moment();
  $currentDay.append(today.format('LLLL'));
}
function getCurrentTime() {
  var currentTime = moment();
  return currentTime;
}
//Function to populate the rows on the page
function populateRows (){
  for(var i = 0; i < businessHours.length; i++){
    var rowDiv = $("<div>");
    var hoursDiv = $("<div>");
    var inputDiv = $("<div>");
    var buttonDiv =$("<div>");
    var hours = $("<p>" +businessHours[i].format('LT') + "<p>");
    var button = $("<button>");
    var input = $("<input>");
    $container.append(rowDiv);
    rowDiv.append(hoursDiv);
    rowDiv.append(inputDiv);
    rowDiv.append(buttonDiv);
    hoursDiv.append(hours);
    inputDiv.append(input);
    buttonDiv.append(button);
    rowDiv.attr("class", "row no-gutters");
    hoursDiv.attr("class", "col-1");
    inputDiv.attr("class", "col-10");
    buttonDiv.attr("class", "col-1");
    hours.attr("class", "business-hours");
    input.attr("class", "event-text");
    input.attr("data-index", i);
    input.val(events['input'+ i] || '');
    button.attr("data-index", i);
    button.attr("class", "btn fa fa-floppy-o action");
  };
};
//add event listener to save button
  $('body').on("click", '.action', function(){
    var buttonIndex = $(this).data('index');
    var inputText = $(".event-text").get(buttonIndex).value;
    if (inputText=== "") {
        return;
    }
    events['input' + buttonIndex] = inputText;
  console.log(events);
  localStorage.setItem("events", JSON.stringify(events));
});