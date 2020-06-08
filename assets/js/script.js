// Identifying DOM elements
var $currentDay = $("#currentDay");
var $businessHours = $(".business-hours");
var $saveButton = $(".btn");
var $container = $(".container-fluid");
var currentTime = getCurrentTime();
console.log("Current Time: " + currentTime.format('LT'));
//creating array of $businessHours
//var businessHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
var businessHours = [];
var events = JSON.parse(localStorage.getItem('events')) || {};
  console.log(events);   
// this function is to make sure javascript starts  after HTML is loaded
$(document).ready(function() {
  populateBusinessHours();
  populateRows();
  getTodaysDate();
});  
function populateBusinessHours() {
  var currentDOW = moment().isoWeekday();
  if (currentDOW <= 5) {
    var startTime = moment('09:00 am', "HH:mm a");
    var endTime = moment('05:00 pm', "HH:mm p");
    amIBetween = currentTime.isBetween(startTime , endTime);
    if (amIBetween == true){
      console.log("Need to do some work");
    }
    else{
      console.log("Relax now... had a long day");
    }
    for(var i = 0; i < 9; i++) {
      var updatedTime = startTime.add(moment.duration(i, 'hours')).format('LT');
      console.log("Working Time: " + i + '-' + updatedTime);
      businessHours.push(updatedTime);
    }
  }
  // if (currentDOW ==6) {
  //   var startTime = moment('09:00 am', "HH:mm a");
  //   var endTime = moment('06:00 pm', "HH:mm a");
  //   amIBetween = currentTime.isBetween(startTime , endTime);
  //   if (amIBetween == true){
  //     document.write('We are currently open. We close today at 6:00PM');
  //   }
  //   else{
  //     document.write('We are currently closed. We will be open again Monday at 8:00AM');
  //   }
  // }
  // if (currentDOW ==7) {
  //   document.write('We are currently closed. We will be open again on Monday at 8:00AM');
  // }
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
    console.log("Business hours: " + businessHours[i]);
    var hours = $("<p>" +businessHours[i] + "<p>");
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
//for ( var j = 0; j < businessHours.length; j++ ) {
  $('body').on("click", '.action', function(){
    var buttonIndex = $(this).data('index');
    var inputText = $(".event-text").get(buttonIndex).value;
    if (inputText=== "") {
        return;
    }
    events['input' + buttonIndex] = inputText;
  // events.push(inputText);
  console.log(events);
  localStorage.setItem("events", JSON.stringify(events));
});