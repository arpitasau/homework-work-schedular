// Identifying DOM elements
var $currentDay = $("#currentDay");
//var $businessHours = $(".business-hours");
var $saveButton = $(".btn");
var $container = $(".container-fluid");
var currentTime = getCurrentTime();

//creating array of $businessHours
var businessHours = [];

//To get the saved item(if any) from local storage
var events = JSON.parse(localStorage.getItem('events')) || {};

// this function is to make sure javascript starts  after HTML is loaded
$(document).ready(function() {
  populateRows();
  getTodaysDate();
  populateBusinessHours();
  
});  

function populateBusinessHours() {
  var currentDOW = moment().isoWeekday();
  if (currentDOW <= 5) {
    for(var i = 0; i < businessHours.length; i++) {
      console.log(businessHours[i].format('LT'));
      var startTime = businessHours[i];
      var endTime = businessHours[i+1] != undefined ? businessHours[i+1] : businessHours[i].add(moment.duration(1, 'hours'));
      amIBetween = currentTime.isBetween(startTime, endTime);
      pastTime = currentTime.isAfter(endTime);
      if (pastTime === true) {
        console.log("I am grey");
        $('.event-text[data-index='+i+']').attr("class","past");

      } else {
          if (amIBetween === true) {
          $('.event-text[data-index='+i+']').attr("class","present");
          console.log("I am red");
          //console.log(i);
      
          } else {
            console.log("I am green");
            $('.event-text[data-index='+i+']').attr("class","future");
            //console.log(i);
          }
      }
    }
  }
}
//Function to get date using moment.js
//Refer https://momentjs.com/docs/ search for LLLL
function getTodaysDate() {
  var today = moment();
  $currentDay.append(today.format('LLLL'));
}
function getCurrentTime() {
  var currentTime = moment();
  return currentTime;
}
//Function to populate the rows and business hours on the page
function populateRows (){
  for(var i = 0; i < 9; i++) {
    var initialTime = moment('09:00 am', "HH:mm a"); 
    var incrementalTime = initialTime.add(moment.duration(i, 'hours'));
    businessHours.push(incrementalTime);
  }
  for(var i = 0; i < businessHours.length; i++){
    var rowDiv = $("<div>");
    var hoursDiv = $("<div>");
    var inputDiv = $("<div>");
    var buttonDiv =$("<div>");
    var hours = $("<p>" +businessHours[i].format('LT') + "</p>");
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
    hoursDiv.attr("class", "col-2");
    inputDiv.attr("class", "col-9");
    buttonDiv.attr("class", "col-1");
    hours.attr("class", "business-hours");
    hours.attr("data-index", i);
    input.attr("class", "event-text");
    input.attr("data-index", i);
    input.val(events['input'+ i] || '');
    button.attr("data-index", i);
    button.attr("class", "btn fa fa-floppy-o action");
  }
}
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