// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var allTextValues = {
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
  }
  //uses jquery to get all the time block elements and puts them into an array
  var timeBlock = $(".time-block")
  //gets current hour and turns it into an int
  var currentHour = parseInt(dayjs().format("H"))
  console.log("current hour: " + currentHour)

  function applyStyles() {
    //takes the ID of the time block, parses it into an number, then compares it to the current hour
    for (var i = 0; i < timeBlock.length; i++) {
      console.log(timeBlock[i].id)
      if (timeBlock[i].id < parseInt(currentHour)) {
        $(timeBlock[i]).addClass("past")
      } else if (timeBlock[i].id == parseInt(currentHour)) {
        $(timeBlock[i]).addClass("present")
      } else {
        $(timeBlock[i]).addClass("future")
      }

    }
  }

  //gets the current date and displays it at the top of the page
  function displayDate() {
    var currentDay = dayjs().format('dddd, MMMM D, YYYY')
    var currentDayEl = $("#currentDay")
    currentDayEl.text(currentDay)
  }

  //renders all of the saved inputs when the page loads
  function renderSaved() {
    allTextValues = localStorage.getItem("textValues")
    allTextValues = JSON.parse(allTextValues)

    for (var i = 0; i < timeBlock.length; i++) {
      var textToEnter = allTextValues[i + 9] //+9 because the id for time blocks starts at 9, not 0
      //puts the saved value into it's respective spot in the list of time blocks
      $(timeBlock[i]).children().eq(1).val(textToEnter)
    }
  }

  //event listener for all of the buttons
  $('.saveBtn').on("click", function () {
    //uses jquery dom traversal to get the value of the text field next to the button clicked.
    var textFieldValue = $(this).parent().children().eq(1).val()
    //uses jquery dom traversal to get the id of the section
    var timeID = parseInt($(this).parent().attr("id"))

    console.log($(this).parent())
    console.log("ID: " + timeID + "\nValue: " + $(this).parent().children().eq(1).val())

    //set value entered to that specific ID in the allTextValues variable
    allTextValues[timeID] = textFieldValue
    console.log(allTextValues[timeID])
    console.log(allTextValues)

    //save allTextValues to local storage
    localStorage.setItem("textValues", JSON.stringify(allTextValues))
  })

  //establish textValues in local storage if it's empty
  if (!localStorage.getItem("textValues")) {
    localStorage.setItem("textValues", JSON.stringify(allTextValues))
  }

  //initialize by running these three functions
  applyStyles()
  displayDate()
  renderSaved()
});
