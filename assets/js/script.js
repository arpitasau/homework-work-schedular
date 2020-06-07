// Identifying DOM elements
var $currentDay = $("#currentDay");
var $businessHours = $(".business-hours");
var $eventText = $("#event-text");
var $saveButton = $(".btn");

var events = [];

//creating array of $businessHours
var businessHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];

//Function to populate the rows on the page
function populateRows (){
  for(var i = 0; i < businessHours.length; i++){

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