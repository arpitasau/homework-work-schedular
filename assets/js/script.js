// Identifying DOM elements
var $currentDay = $("#currentDay");
var $businessHours = $(".business-hours");
var $eventText = $("#event-text");
var $saveButton = $(".btn");
var $container = $(".container-fluid");

var events = [];

//creating array of $businessHours
var businessHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

$(document).ready(function() {
  populateRows ()
});  
//Function to populate the rows on the page
function populateRows (){
  for(var i = 0; i < businessHours.length; i++){
    var rowDiv = $("<div>");
    var hoursDiv = $("<div>");
    var inputDiv = $("<div>");
    var buttonDiv =$("<div>");
    var hours = $("<p>" +businessHours[i]+ "<p>");
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
    input.attr("id", "event-text");
    button.attr("class", "btn fa fa-floppy-o");

  };
};






$saveButton.click("submit",storeEvents);

function storeEvents(event){
    event.preventDefault();
    if ($eventText=== "") {
        return;
    };
  events.push($eventText);
  console.log($eventText);
  localStorage.setItem("events", JSON.stringify($eventText));
};