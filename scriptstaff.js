
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const submitButton = document.getElementById("submitBtn");

// call submitBtnClicked() when this button is clicked by user
submitButton.addEventListener("click", submitBtnClicked);

// Input form fields
const roomName = document.getElementById("roomName");
const roomPrice = document.getElementById("roomPrice");
const promoCode = document.getElementById("promoCode");
const roomCapacity = document.getElementById("roomCapacity");
const roomStatus = document.getElementById("roomStatus");
const roomId = document.getElementById("roomId");

// Table showing all meeting rooms
const roomTable = document.getElementById("roomTable");

// generate a uniqe room ID using random number generator
function generateRoomId() {
  return Math.floor(Math.random() * 10000000);
}

// set Input form fields to blank
function resetInputFields() {
  roomName.value = "";
  roomPrice.value = "";
  promoCode.value = "";
  roomCapacity.value = "";
  roomStatus.selectedIndex = "0";
  roomId.value = "";
}

// user clicked submit button
function submitBtnClicked() {
  if (roomName.value.length == 0) {
    alert("Room name cannot be empty");
  } else if (roomPrice.value.length == 0) {
    alert("Room price cannot be empty");
  } else if (roomCapacity.value.length == 0) {
    alert("Room capacity cannot be empty");
  } 
  else {
    let rName = roomName.value;
    let rPrice = Number(roomPrice.value).toFixed(2);
    let rPromoCode = promoCode.value;
    let rCapacity = roomCapacity.value;
    let rStatus = roomStatus.value;
    let rId = roomId.value;

    if (rId.length == 0) {
      rId = generateRoomId();
      insertARoom(rName, rPrice, rPromoCode, rCapacity, rStatus, rId);
      callInsertDBApi(rName, rPrice, rPromoCode, rCapacity, rStatus, rId);

    } else {
      updateARoom(rName, rPrice, rPromoCode, rCapacity, rStatus, rId);
      callUpdateDBApi(rName, rPrice, rPromoCode, rCapacity, rStatus, rId);
    }

    // Reset input fields
    resetInputFields();
  }
}

function insertARoom(rName, rPrice, rPromoCode, rCapacity, rStatus, rId) {
  // Create an empty <tr> element and add it to the 1st position of the table:
  let row = roomTable.insertRow();
  row.id = rId;

  // Insert new cells (<td> elements) of the "new" <tr> element
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  let cell8 = row.insertCell(7);

  cell1.innerHTML = rName;
  cell2.innerHTML = rPrice;
  cell3.innerHTML = rPromoCode;
  cell4.innerHTML = rCapacity;
  cell5.innerHTML = rStatus;
  cell6.innerHTML = rId;

  // ADD EDIT BUTTON
  var eBtn = document.createElement("button");
  eBtn.appendChild(document.createTextNode("Edit"));
  cell7.appendChild(eBtn);
  eBtn.addEventListener("click", editARoom);

  // ADD DELETE BUTTON
  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("Delete"));
  cell8.appendChild(dBtn);
  dBtn.addEventListener("click", deleteARoom);

  function deleteARoom() {
    row.remove();
    callDeleteDBApi(row.cells[4].innerHTML);

    // Reset input fields
    resetInputFields();
  }

  function editARoom() {
    roomName.value = row.cells[0].innerHTML;
    roomPrice.value = row.cells[1].innerHTML;
    promoCode.value = row.cells[2].innerHTML;
    roomCapacity.value = row.cells[3].innerHTML;
    roomStatus.value = row.cells[4].innerHTML;
    roomId.value = row.cells[5].innerHTML;
  }
}

function updateARoom(rName, rPrice, rPromoCode, rCapacity, rStatus, rId) {
  let row = document.getElementById(rId);

  let cell1 = row.cells[0];
  let cell2 = row.cells[1];
  let cell3 = row.cells[2];
  let cell4 = row.cells[3];
  let cell5 = row.cells[4];

  cell1.innerHTML = rName;
  cell2.innerHTML = rPrice;
  cell3.innerHTML = rPromoCode;
  cell4.innerHTML = rCapacity;
  cell5.innerHTML = rStatus;
}

// ---------- DATABASE CALLS ----------
async function callGetRoomsDBApi() {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  insertARoom("Rayquaza Room", "10.00", "PROMO10", "10", "Active", "561456465");
  insertARoom("Groudon Room", "20.00", "PROMO20", "20", "Active", "432454366");
  insertARoom("Kyogre Room", "30.00", "PROMO30", "30", "Active", "675876987");
  displayApiResponse("3 meeting room(s) retrieved.");
} 

async function callInsertDBApi(rName, rPrice, rCapacity, rStatus, rId) {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  displayApiResponse("Room inserted successfully.");
}

async function callUpdateDBApi(rName, rPrice, rPromoCode, rCapacity, rStatus, rId) {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  displayApiResponse("Room updated successfully.");
} 

async function callDeleteDBApi(rId) {
  // TODO Need to implement database call API

  // Sleep 2 secs to simulate DB Call
  displayLoadingHourGlass();
  await sleep(2000);
  displayApiResponse("Room deleted successfully.");
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

// Load rooms from Database
callGetRoomsDBApi();
