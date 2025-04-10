const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const submitButton = document.getElementById("submitBtn");

// call submitBtnClicked() when this button is clicked by user
submitButton.addEventListener("click", submitBtnClicked);

// Input form fields
const studentName = document.getElementById("studentName");
const roomName = document.getElementById("roomName");
const bookingDate = document.getElementById("bookingDate");
const bookingStartTime = document.getElementById("bookingStartTime");
const bookingEndTime = document.getElementById("bookingEndTime");
const bookingId = document.getElementById("bookingId");

// Table showing all meeting bookings
const bookingTable = document.getElementById("bookingTable");

// generate a uniqe booking ID using random number generator
function generateBookingId() {
  return Math.floor(Math.random() * 10000000);
}

// user clicked submit button
function submitBtnClicked() {
  if (roomName.value.length == 0) {
    alert("Room name cannot be empty");
  } else if (bookingDate.value.length == 0) {
    alert("Booking Date cannot be empty");
  } else if (bookingStartTime.value.length == 0) {
    alert("Booking Start Time cannot be empty");
  } else if (bookingEndTime.value.length == 0) {
    alert("Booking End Time cannot be empty");
  } 
  else {
    let bStudentName = studentName.value;
    let bRoomName = roomName.value;
    let bBookingDate = bookingDate.value;
    let bBookingStartTime = bookingStartTime.value;
    let bBookingEndTime = bookingEndTime.value;
    let bId = bookingId.value;

    if (bId.length == 0) {
      bId = generateBookingId();
      insertABooking(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId);
      callInsertDBApi(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId);

    } else {
      updateABooking(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId);
      callUpdateDBApi(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId);
    }

    // Reset input fields
    resetInputForm();
  }
}

function insertABooking(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId) {
  // Create an empty <tr> element and add it to the 1st position of the table:
  let row = bookingTable.insertRow();
  row.id = bId;

  // Insert new cells (<td> elements) of the "new" <tr> element
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  let cell8 = row.insertCell(7);

  cell1.innerHTML = bStudentName;
  cell2.innerHTML = bRoomName;
  cell3.innerHTML = bBookingDate;
  cell4.innerHTML = bBookingStartTime;
  cell5.innerHTML = bBookingEndTime;  
  cell6.innerHTML = bId;  

  // ADD EDIT BUTTON
  var eBtn = document.createElement("button");
  eBtn.appendChild(document.createTextNode("Edit"));
  cell7.appendChild(eBtn);
  eBtn.addEventListener("click", editABooking);

  // ADD DELETE BUTTON
  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("Delete"));
  cell8.appendChild(dBtn);
  dBtn.addEventListener("click", deleteABooking);

  function deleteABooking() {
    row.remove();
    callDeleteDBApi(row.cells[5].innerHTML);

    // Reset input fields
    resetInputForm();
  }

  function editABooking() {
    // studentName.value = row.cells[0].innerHTML;
    roomName.value = row.cells[1].innerHTML;
    bookingDate.value = row.cells[2].innerHTML;
    bookingStartTime.value = row.cells[3].innerHTML;
    bookingEndTime.value = row.cells[4].innerHTML;
    bookingId.value = row.cells[5].innerHTML;
  }
}

function resetInputForm() {
  // studentName.value = "";
  roomName.selectedIndex = "0";
  bookingDate.value = "";
  bookingStartTime.value = "";
  bookingEndTime.value = "";
  bookingId.value = "";
}

function updateABooking(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId) {
  let row = document.getElementById(bId);
  let cell1 = row.cells[0];
  let cell2 = row.cells[1];
  let cell3 = row.cells[2];
  let cell4 = row.cells[3];
  let cell5 = row.cells[4];

  cell1.innerHTML = bStudentName;
  cell2.innerHTML = bRoomName;
  cell3.innerHTML = bBookingDate;
  cell4.innerHTML = bBookingStartTime;
  cell5.innerHTML = bBookingEndTime;
}

// ---------- DATABASE CALLS ----------
async function callSelectBookingsDBApi() {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  insertABooking("nugget.", "Rayquaza Room", "2023-10-01", "07:00", "08:30", "5435345");
  insertABooking("nugget.", "Kyogre Room", "2023-11-01", "09:00", "10:30", "2534665");

  displayApiResponse("2 room booking(s) retrieved.");
} 

async function callInsertDBApi(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId) {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  displayApiResponse("Booking inserted successfully.");
}

async function callUpdateDBApi(bStudentName, bRoomName, bBookingDate, bBookingStartTime, bBookingEndTime, bId) {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  displayApiResponse("Booking updated successfully.");
} 

async function callDeleteDBApi(bId) {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  displayApiResponse("Booking deleted successfully.");
} 

function callGetRoomsDBApi() {
  // TODO Need to implement database call API
  
  // Simulate DB Call
  let newOption;
  
  newOption = document.createElement("OPTION");
  newOption.text = "Rayquaza Room (Price - $10.00 Capacity - 10)";
  newOption.value = "Rayquaza Room";
  roomName.add(newOption);

  newOption = document.createElement("OPTION");
  newOption.text = "Groudon Room (Price - $20.00 Capacity - 20)";
  newOption.value = "Groudon Room";
  roomName.add(newOption);

  newOption = document.createElement("OPTION");
  newOption.text = "Kyogre Room (Price - $30.00 Capacity - 30)";
  newOption.value = "Kyogre Room";
  roomName.add(newOption);

  newOption = document.createElement("OPTION");
  newOption.text = "Magikarp Room (Price - $40.00 Capacity - 40)";
  newOption.value = "Magikarp Room";
  roomName.add(newOption);
} 

// Loading hour glass animated GIF
const loadingImg = new Image(); 
loadingImg.src = "./loading.gif";

function displayLoadingHourGlass() {
  document.getElementById("apiresponse").innerHTML = "";
  document.getElementById("apiresponse").appendChild(loadingImg);
}

function displayApiResponse(apiResponse) {
  document.getElementById("apiresponse").innerHTML = 
    "API CALL RESPONSE: [ " + apiResponse + " ]";
}

// Load bookings from Database
callSelectBookingsDBApi();

// Load rooms from Database
callGetRoomsDBApi();
