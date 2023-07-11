

//192.168.1.196:80
//192.168.100.25:80


//* websockets

var client_id = Date.now()
var websocket = new WebSocket(`ws://192.168.1.178:8000/ws/browser/${client_id}`);
var data_update_decives

// setInterval(function() {
//   sendMessage();
// }, 5000);

websocket.onmessage = function(event) {
    msg = JSON.parse(event.data)
    console.log(msg)
    switch (msg['type']) {
        case 'device_update':
            console.log(msg)
            clearDataDevices()
            processListDevice(msg["data"]["robots"]);
            data_update_decives = msg["data"]["robots"];
            break;

        case 'console_update':
            loadMessage(msg["data"])
            break;
            
        default:
            break;
    }


// Hàm xử lý khi kết nối thành công
websocket.onopen = function(event) {
  console.log('Đã kết nối thành công với máy chủ.');
};

// Hàm xử lý khi mất kết nối với máy chủ
websocket.onclose = function(event) {
  console.log('Mất kết nối với máy chủ.');

  // Hiển thị thông báo
  alert('Mất kết nối với máy chủ.');

  // Tải lại trang (tuỳ chọn)
  location.reload();

  // Hoặc tự động kết nối lại
  // setTimeout(function() {
  //   socket = new WebSocket('wss://example.com/socket');
  // }, 3000); // Kết nối lại sau 3 giây
};

// Hàm xử lý khi có lỗi xảy ra
websocket.onerror = function(error) {
  console.error('Lỗi kết nối: ', error);
};


};

function addRobo(event) {
    var input = document.getElementById("serial-add")
    var type = document.getElementById("type-add")
    var json = {
        "name":"",
        "type": type.value,
        "serial": input.value
    }
    if(input.value != ""){
    fetch('http://192.168.1.178:8001/api/v1/robot/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
    .then(response => {
      if (response.ok) {
        console.log('ADD DONE');
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .catch(error => {
      // Xử lý lỗi trong trường hợp không thể truy cập API
      console.log(error);
    });
    input.value = ''
    event.preventDefault()

}
alert("Add robot success")
location.reload();

}

// function sendCommand(event, robot_serial) {
//     var input = document.getElementById("commandText")
//     msg = {
//         "type": "browser_command",
//         "data": {
//             "robot_serial": robot_serial,
//             "GOTO":"ansadhsa",
//             "TAKE":"asdas",
//             "GET":"asdasd"
//         }
//     }

//     websocket.send(JSON.stringify(msg))
//     input.value = ''
//     event.preventDefault()
// }

function loadMessage(data){
  const table = document.getElementById('console-chat');

  const tbody = document.querySelector('#console-chat tbody');
  console.log(data)
  // Tạo các hàng trong bảng từ dữ liệu nhận được
    // Tạo một hàng mới
    const row = document.createElement('tr');

    // Tạo các ô dữ liệu trong hàng
    const cell1 = document.createElement('td');
    cell1.textContent = data["created_at"];
    row.appendChild(cell1);

    const cell2 = document.createElement('td');
    cell2.textContent = data["name"];
    row.appendChild(cell2);

    const cell3 = document.createElement('td');
    cell3.textContent = data["message"];
    row.appendChild(cell3);

    // Thêm hàng vào tbody
    tbody.appendChild(row);
    table.scrollTop = table.scrollHeight;
}

// function loadClientOnline(data){
//     var client_online = document.getElementById('client_online')
//     var ele = document.createElement('li')
//     var content = document.createTextNode(data)
//     ele.appendChild(content)
//     client_online.appendChild(ele)
// }

function clearDataDevices() {
  // Lấy tham chiếu đến phần tử tbody trong bảng
  const tbody = document.querySelector('#ListDevices tbody');
  // Xóa các hàng hiện có trong tbody
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  const menuOptions = document.querySelector('#menu-edit ul')
  while (menuOptions.hasChildNodes()) {
    menuOptions.removeChild(menuOptions.firstChild);
  }
  const menuOptions1 = document.querySelector('#menu-control ul')
  while (menuOptions1.hasChildNodes()) {
    menuOptions1.removeChild(menuOptions1.firstChild);
  }
}



function processListDevice(data) {
  // Lấy tham chiếu đến phần tử tbody trong bảng
  // const tbody = document.querySelector('#ListDevices tbody');
  // console.log(data)
  // // Tạo các hàng trong bảng từ dữ liệu nhận được
  // data.forEach(item => {
  //   // Tạo một hàng mới
  //   const row = document.createElement('tr');

  //   // Tạo các ô dữ liệu trong hàng
  //   const cell1 = document.createElement('td');
  //   cell1.textContent = item["serial"];
  //   row.appendChild(cell1);

  //   const cell2 = document.createElement('td');
  //   cell2.textContent = item["name"];
  //   row.appendChild(cell2);

  //   const cell3 = document.createElement('td');
  //   cell3.textContent = item["type"];
  //   row.appendChild(cell3);

  //   const cell4 = document.createElement('td');
  //   cell4.textContent = item["created_at"];
  //   row.appendChild(cell4);

  //   const cell5 = document.createElement('td');
  //   cell5.textContent = item["status"];
  //   row.appendChild(cell5);

  //   // Thêm hàng vào tbody
  //   tbody.appendChild(row);
  // });

  // const menuOptions = document.querySelector('#menu-edit ul')
  const menu = document.querySelector('#menu-control ul')
  const menu1 = document.querySelector('#menu-add ul')
  data.forEach(item=>{
    const option1 = document.createElement('li');
    option1.textContent = item["serial"];
    menu.appendChild(option1)
    // console.log(option)
    const option2 = document.createElement('li');
    option2.textContent = item["serial"];
    menu1.appendChild(option2)
  });
  console.log(menu.textContent)
}

fetch('http://192.168.1.178:8001/api/v1/robots/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    // Xử lý dữ liệu nhận được từ API
    const tbody = document.querySelector('#ListDevices tbody');
    console.log(data);
    const menuOptions = document.querySelector('#menu-edit ul')

    // Tạo các hàng trong bảng từ dữ liệu nhận được
    data["robots"].forEach(item => {
      // Tạo một hàng mới
      const option = document.createElement('li');
      option.textContent = item["serial"];
      menuOptions.appendChild(option);

      const row = document.createElement('tr');

      // Tạo các ô dữ liệu trong hàng
      const cell1 = document.createElement('td');
      cell1.textContent = item["serial"];
      row.appendChild(cell1);

      const cell2 = document.createElement('td');
      cell2.textContent = item["name"];
      row.appendChild(cell2);

      const cell3 = document.createElement('td');
      cell3.textContent = item["type"];
      row.appendChild(cell3);

      const cell4 = document.createElement('td');
      cell4.textContent = item["created_at"];
      row.appendChild(cell4);

      const cell5 = document.createElement('td');
      cell5.textContent = item["status"];
      row.appendChild(cell5);

      const cell6 = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener('click', function() {
        // Hiển thị hộp thoại xác nhận trước khi gửi yêu cầu DELETE
        const confirmation = confirm('Do you want to delete robot with serial: ' + item["serial"] + '?');
        if (confirmation) {
          // Gửi yêu cầu DELETE khi người dùng xác nhận
          fetch(`http://192.168.1.178:8001/api/v1/robot/${item["serial"]}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => {
              // Xử lý kết quả từ yêu cầu DELETE
              if (response.ok) {
                console.log(`Deleted robot with serial: ${item["serial"]}`);
                // Xóa hàng khỏi bảng
                tbody.removeChild(row);
              } else {
                console.log(`Failed to delete robot with serial: ${item["serial"]}`);
              }
            })
            .catch(error => {
              // Xử lý lỗi trong trường hợp không thể gửi yêu cầu DELETE
              console.log(`Error deleting robot with serial: ${item["serial"]}`, error);
            });
        }
      });
      cell6.appendChild(deleteButton);
      row.appendChild(cell6);

      // Thêm hàng vào tbody
      tbody.appendChild(row);
    });
  })
  .catch(error => {
    // Xử lý lỗi trong trường hợp không thể truy cập API
    console.log(error);
  });









//* =======================control=============================


function openControl(evt, pageName, namecontent, name_link) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName(namecontent);
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName(name_link);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(pageName).style.display = "flex";
  evt.currentTarget.className += " active";
}


window.onload = function() {

  // Hiển thị tab "dashboard"
  document.getElementById("dashboard").style.display = "flex";
  document.getElementById("add").style.display = "flex";
  document.getElementById("location-tab").style.display = "flex";
  
  // Xóa lớp "active" khỏi tất cả các tablinks
 
  // Thêm lớp "active" vào tablink tương ứng với id "dashboard"
  var dashboardTab = document.getElementById("dashboard-tab");
  dashboardTab.classList.add("active");
  var addTab = document.getElementById("add-tab");
  addTab.classList.add("active");
  var locationTab = document.getElementById("location-item");
  locationTab.classList.add("active");
}



// *MENU of layout edit and remote
const toggleBtns = document.querySelectorAll('.toggleBtn');
const menuOptions = document.querySelectorAll('.menuOptions');

toggleBtns.forEach(function(toggleBtn, index) {
  const menuOption = menuOptions[index];

  toggleBtn.addEventListener('click', function() {
    console.log("co goi", menuOption)
    menuOption.style.display = menuOption.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('mousedown', function(event) {
    const target = event.target;
    if (!target.closest('.toggleBtn') && !target.closest('.menuOptions')) {
      menuOption.style.display = 'none';
    }
  });

  menuOption.addEventListener('click', function(event) {
    const target = event.target;
    const option = target.textContent;
    if (option) {
      editInfoRobot(option);
      controlRobot(option);
      menuOption.style.display = 'none';

    }
  });
});

// *select data of option and send data
function editInfoRobot(option) {
  // Xử lý thông tin robot dựa trên tùy chọn được chọn
  console.log('Option selected:', option);
  const serial = document.querySelector('#serial-robo h3');
  serial.textContent = option;
  fetch ('http://192.168.1.178:8001/api/v1/robot/'+option)

    .then(response => response.json())
    .then(data => {
      // Xử lý dữ liệu nhận được từ API
      var name = document.getElementById('edit-name');
        name.value = data["robot"]["name"];
      var name = document.getElementById('edit-home');
        name.value = data["home_location"];
      var name = document.getElementById('edit-ip-server');
        name.value = data["ip_server"];
      var name = document.getElementById('edit-port');
        name.value = data["port_server"]
      var name = document.getElementById('edit-SSID-ST');
        name.value = data["SSID_ST"];
      var name = document.getElementById('edit-PASS-ST');
        name.value = data["PASS_ST"];
      var name = document.getElementById('edit-SSID-AP');
        name.value = data["SSID_AP"];
      var name = document.getElementById('edit-PASS-AP');
        name.value = data["PASS_AP"];
      console.log(data);
    })
  
    .catch(error => {
      // Xử lý lỗi trong trường hợp không thể truy cập API
      console.log(error);
    });
// data_update_decives.forEach(json=>{
//   if (json["serial"] == option){
//       var name = document.getElementById('edit-name');
//         name.value = json["name"];
//       var name = document.getElementById('edit-home');
//         name.value = json["home_location"];
//       var name = document.getElementById('edit-ip-server');
//         name.value = json["ip_server"];
//       var name = document.getElementById('edit-port');
//         name.value = json["port_server"]
//       var name = document.getElementById('edit-SSID-ST');
//         name.value = json["SSID_ST"];
//       var name = document.getElementById('edit-PASS-ST');
//         name.value = json["PASS_ST"];
//       var name = document.getElementById('edit-SSID-AP');
//         name.value = json["SSID_AP"];
//       var name = document.getElementById('edit-PASS-AP');
//         name.value = json["PASS_AP"];
//   }
//   });
}



// function saveEditInfo(event){
//   const editInfo = document.querySelectorAll('#edit-info textarea')
//   const serialRobo = document.querySelector('#serial-robo h3').textContent
//   console.log(serialRobo)
//   console.log(editInfo[0].value)
//   var json = {
//     "robot":{
//       "serial":serialRobo,
//       "name":editInfo[0].value,
//       "home_location":editInfo[1].value,
//       "ip_server":editInfo[2].value,
//       "port_server":editInfo[3].value,
//       "SSID_ST":editInfo[4].value,
//       "PASS_ST":editInfo[5].value,
//       "SSID_AP":editInfo[6].value,
//       "PASS_AP":editInfo[7].value
//     }
//   }
//   console.log(json)
//   fetch('http://192.168.1.178:8001/api/v1/robot/'+serialRobo),{
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify(json), // data can be `string` or {object}!
    
//   }
//   .catch(error => {
//     // Xử lý lỗi trong trường hợp không thể truy cập API
//     console.log(error);
//   });
  

//   // data_update_decives.forEach(item=>{
//   //   if(serialRobo == item["serial"]){
//   //     console.log("SAVE DONE")
//   //   }
//   // });
// }

function saveEditInfo(event) {
  event.preventDefault(); // Ngăn chặn hành vi mặc định của form (nếu có)

  const editInfo = document.querySelectorAll('#edit-info textarea');
  const serialRobo = document.querySelector('#serial-robo h3').textContent;
  console.log(serialRobo);
  console.log(editInfo[0].value);

  var json = {
      "serial": serialRobo,
      "name": editInfo[0].value,
      "home_location": editInfo[1].value,
      "ip_server": editInfo[2].value,
      "port_server": editInfo[3].value,
      "SSID_ST": editInfo[4].value,
      "PASS_ST": editInfo[5].value,
      "SSID_AP": editInfo[6].value,
      "PASS_AP": editInfo[7].value
  };
  console.log(json);

  fetch('http://192.168.1.178:8001/api/v1/robot/' + serialRobo, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
    .then(response => {
      if (response.ok) {
        console.log('SAVE DONE');
        alert('Save success');
        document.location(reload)
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .catch(error => {
      // Xử lý lỗi trong trường hợp không thể truy cập API
      console.log(error);
    });
}


// * add command and submit to remote decives
function controlRobot(option){
  console.log('Option selected:', option);
  const serial = document.querySelector('#serial-robo-control h3');
  serial.textContent = option
}


function SubmitCommand(event){
  const serialRobo = document.querySelector('#serial-robo-control h3').textContent
  const commandControl = document.querySelectorAll('#command button')
  var command = ""
commandControl.forEach(item=>{
  if(command == ""){
  command = item.textContent;
  }
  else{
    command = command + "," + item.textContent;
  }
});

  data_update_decives.forEach(item=>{
    if(serialRobo == item["serial"]){
      console.log("SUBMIT DONE")
      var json = {
        "type":"browser_command",
        "data":{
          "serial":serialRobo,
          "command":command
        },
      }
      websocket.send(JSON.stringify(json))
      console.log(json)
      document.getElementById('command').textContent = "";
    }
  });
}

function handleEnterKey(event) {
  if (event.keyCode === 13) { // Kiểm tra mã phím Enter
      event.preventDefault(); // Ngăn chặn hành động mặc định của phím Enter
      var textareaValue = document.getElementById("commandGoto").value.trim();
      addCommand('GOTO:'+ textareaValue); // Gọi hàm addCommand()
      document.getElementById("commandGoto").value = "";
  }
}

function addCommand(content) {
  var commandSection = document.getElementById('command')
  const option = document.createElement('button');
    option.textContent = content;
    commandSection.appendChild(option);

}
const commandSection = document.getElementById('command');
commandSection.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName === 'BUTTON') {
    target.remove();
  }
});

// * request
