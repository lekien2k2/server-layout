
// import Swal from 'sweetalert';
// import Swal from 'sweetalert2';
//192.168.1.196:80
//192.168.100.25:80
// import Swal from 'sweetalert2'
// const Swal = require('sweetalert2')
// import Md from 'reactjs-md-editor';
// import React from 'react';
//* websockets
// md.render('# your markdown string');
var client_id = Date.now()
var websocket = new WebSocket(`ws://192.168.1.178:8000/ws/browser/${client_id}`);
var data_update_devices
var ip = "http://192.168.1.178" 

// setInterval(function() {
//   sendMessage();
// }, 5000);

websocket.onmessage = function(event) {
    msg = JSON.parse(event.data)
    console.log(msg)
    switch (msg['type']) {
        case 'server.deviceUpdate':
            console.log(msg)
            clearDataDevices()
            processListDevice(msg["data"]["robots"]);
            data_update_devices = msg["data"]["robots"];
            break;

        case 'server.consoleUpdate':
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
  Swal.fire('Mất kết nối với máy chủ.')

  // Tải lại trang (tuỳ chọn)
  .then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
    location.reload()
    }});


  // Hoặc tự động kết nối lại
  // setTimeout(function() {
  //   socket = new WebSocket('wss://example.com/socket');
  // }, 3000); // Kết nối lại sau 3 giây
};

// Hàm xử lý khi có lỗi xảy ra
websocket.onerror = function(error) {
  console.error('Lỗi kết nối: ', error);
  Swal.fire('Lỗi kết nối: ', error)

  // Tải lại trang (tuỳ chọn)
  .then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
    location.reload()
    }});
};


};



// * control chat
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
    cell2.textContent = data["name"] + "(" + data["serial"] + ":" + data["port"] + ")";
    row.appendChild(cell2);

    const cell3 = document.createElement('td');
    cell3.textContent = data["status"];
    row.appendChild(cell3);

    // Thêm hàng vào tbody
    tbody.appendChild(row);
    table.scrollTop = table.scrollHeight;
}



function clearDataDevices() {
  // Lấy tham chiếu đến phần tử tbody trong bảng
  // const tbody = document.querySelector('#ListDevices tbody');
  // // Xóa các hàng hiện có trong tbody
  // while (tbody.firstChild) {
  //   tbody.removeChild(tbody.firstChild);
  // }

  // const menuOptions = document.querySelector('#menu-edit ul')
  // while (menuOptions.hasChildNodes()) {
  //   menuOptions.removeChild(menuOptions.firstChild);
  // }
  const menuOptions1 = document.querySelector('#menu-control ul')
  while (menuOptions1.hasChildNodes()) {
    menuOptions1.removeChild(menuOptions1.firstChild);
  }
  const menuOptions2 = document.querySelector('#menuAdd select')
  while (menuOptions2.hasChildNodes()) {
    menuOptions2.removeChild(menuOptions2.firstChild);
  }
  // const tbody1 = document.querySelector('#devices-manager tbody');
  // // Xóa các hàng hiện có trong tbody
  // while (tbody1.firstChild) {
  //   tbody1.removeChild(tbody1.firstChild);
  // }
}



function processListDevice(data) {
 console.log("co goi proccess"+data)
  const menu = document.querySelector('#menu-control ul')
  const menu1 = document.querySelector('#menuAdd select')
  data.forEach(item=>{
    const option1 = document.createElement('li');
    option1.textContent = item["serial"];
    menu.appendChild(option1)
    // console.log(option)
    const option2 = document.createElement('option');
    option2.value = item["serial"];
    option2.textContent = item["serial"];
    menu1.appendChild(option2)
  });
  console.log(menu.textContent)
}

// * get devices
setInterval(function() {
fetch(ip +':8001/api/v1/robots', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const table = document.querySelector('#ListDevices tbody');
  // Xóa các hàng hiện có trong tbody
    while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
    }
    const table2 = document.querySelector('#menu-edit ul');
  // Xóa các hàng hiện có trong tbody
    while (table2.hasChildNodes()) {
    table2.removeChild(table2.firstChild);
  }
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
      deleteButton.textContent = "Remove";
      deleteButton.addEventListener('click', function() {
        // Hiển thị hộp thoại xác nhận trước khi gửi yêu cầu DELETE
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          // cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(ip+`:8001/api/v1/robot/${item["serial"]}`, {
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
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
        }
           
            
          }
        )
          
      });
      cell6.appendChild(deleteButton);
      row.appendChild(cell6);

      // Thêm hàng vào tbody
      tbody.appendChild(row);
    });
    
    const table1 = document.querySelector('#devices-manager tbody');
  // Xóa các hàng hiện có trong tbody
    while (table1.hasChildNodes()) {
    table1.removeChild(table1.firstChild);
  }
    
    const tbody1 = document.querySelector('#devices-manager tbody');
    console.log(data);
    
    
    var stt = 0;
    // Tạo các hàng trong bảng từ dữ liệu nhận được
    data["robots"].forEach(item => {
      // Tạo một hàng mới
      

      const row = document.createElement('tr');

      // Tạo các ô dữ liệu trong hàng
      const cell1 = document.createElement('td');
      cell1.textContent = stt + 1;
      stt++;
      row.appendChild(cell1);
      
      const cell3 = document.createElement('td');
      cell3.textContent = item["serial"];
      row.appendChild(cell3);

      const cell2 = document.createElement('td');
      cell2.textContent = item["name"];
      row.appendChild(cell2);

      const cell4 = document.createElement('td');
      cell4.textContent = item["type"];
      row.appendChild(cell4);

      const cell6 = document.createElement('td');
      cell6.textContent = item["created_at"];
      row.appendChild(cell6);

      const cell5 = document.createElement('td');
      cell5.textContent = item["status"];
      row.appendChild(cell5);

      // Thêm hàng vào tbody
      tbody1.appendChild(row);
    });
  })
  .catch(error => {
    // Xử lý lỗi trong trường hợp không thể truy cập API
    console.log(error);
  });
},1000);

//* add devices

function addRobo(event) {
  var input = document.getElementById("serial-add")
  var type = document.getElementById("type-add")
  var json = {
      "name":"",
      "type": type.value,
      "serial": input.value
  }
  if(input.value != ""){
  fetch(ip+':8001/api/v1/robot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(json)
})
  .then(response => {
    if (response.status == 200) {
      console.log('ADD DONE');
      Swal.fire("Add robot success")
    } else {
      throw new Error('Error: ' + response.status);
      // Swal.fire("Add robot fail")
    }
  })
  .catch(error => {
    // Xử lý lỗi trong trường hợp không thể truy cập API
    console.log(error);
  });
  input.value = ''
  event.preventDefault()

}

}






//* =======================control page=============================


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



// *MENU of layout remote
const toggleBtn = document.querySelector('#menu-control .toggleBtn');
const menuOption = document.querySelector('#menu-control .menuOptions');


  toggleBtn.addEventListener('click', function() {
    console.log("co goi", menuOption)
    menuOption.style.display = menuOption.style.display === 'none' ? 'flex' : 'none';
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
      controlRobot(option);
      menuOption.style.display = 'none';

    }
  });

// *select data of option and send data

const menuOptionsEdit = document.querySelector('#menu-edit ul');
menuOptionsEdit.addEventListener('click', function(event) {
  const target = event.target;
  console.log("cos goij")
  const option = target.textContent;
  if (option) {
    editInfoRobot(option);
  }
});


function editInfoRobot(option) {
  // Xử lý thông tin robot dựa trên tùy chọn được chọn
  console.log('Option selected:', option);
  const serial = document.querySelector('#serial-robo h3');
  serial.textContent = option;
  fetch (ip+':8001/api/v1/robot/'+option)

    .then(response => response.json())
    .then(data => {
      // Xử lý dữ liệu nhận được từ API
      var name = document.getElementById('edit-name');
        name.value = data["robot"]["name"];
      var name = document.getElementById('edit-home');
        name.value = data["robot"]["home_location"];
      var name = document.getElementById('edit-ip-server');
        name.value = data["robot"]["ip_server"];
      var name = document.getElementById('edit-port');
        name.value = data["robot"]["port_server"]
      var name = document.getElementById('edit-SSID-ST');
        name.value = data["robot"]["ssid_wifi"];
      var name = document.getElementById('edit-PASS-ST');
        name.value = data["robot"]["pass_wifi"];
      var name = document.getElementById('edit-SSID-AP');
        name.value = data["robot"]["ssid_ap"];
      var name = document.getElementById('edit-PASS-AP');
        name.value = data["robot"]["pass_ap"];
      console.log(data);
    })
  
    .catch(error => {
      // Xử lý lỗi trong trường hợp không thể truy cập API
      console.log(error);
    });
  }

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
      "ssid_wifi": editInfo[4].value,
      "pass_wifi": editInfo[5].value,
      "ssid_ap": editInfo[6].value,
      "pass_ap": editInfo[7].value
  };
  console.log(json);

  fetch(ip+':8001/api/v1/robot/' + serialRobo, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(json)
  })
    .then(response => {
      if(response.ok) {
        Swal.fire(`Updated robot with serial: ${serialRobo}`);
      } else {  
        Swal.fire({
          title:'Warning!',
          text: `Failed to update robot ${editInfo["name"]}: ${response.status}`,
          icon: 'warning',
      });
        throw new Error('Error: ' + response.status);
      }
    })
    .catch(error => {
      // Xử lý lỗi trong trường hợp không thể truy cập API
      Swal.fire({
        title:'Error!',
        text: `Failed to update robot ${editInfo["name"]}: ${error}`,
        icon: 'error',
    });
    });
}


// * add command and submit to remote devices
function controlRobot(option){
  console.log('Option selected:', option);
  const serial = document.querySelector('#serial-robo-control h3');
  serial.textContent = option
}

const btnGoto = document.querySelector('#selectGoto');
const menuGoto = document.querySelector('#menuGoto');



btnGoto.addEventListener('click', function() {
    console.log("co goi", menuGoto)
    menuGoto.style.display = menuGoto.style.display === 'none' ? 'block' : 'none';
  });

  document.addEventListener('mousedown', function(event) {
    const target = event.target;
    if (!target.closest('.btnGoto') && !target.closest('.menuGoto')) {
      menuGoto.style.display = 'none';
    }
  });

  menuGoto.addEventListener('click', function(event) {
    
    const target = event.target;
    const option = target.textContent.split("\n")[1]
    if (option) {
      addGoto(option);
      menuGoto.style.display = 'none';

    }
  });

  function addGoto(option) {
    const nameGoto = document.getElementById('commandGoto');
    nameGoto.value = option;
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
    command = command  + item.textContent;
  }
});

  data_update_devices.forEach(item=>{
    if(serialRobo == item["serial"]){
      console.log("SUBMIT DONE")
      var json = {
        "type":"browser.command",
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

// * =======================request page=================================

// * location page

function addLocation(event) {
  var input = document.getElementById("name-location")
  var type = document.getElementById("qr-code")
  var json = {
      "name":input.value,
      "qr_code": type.value,
  }
  if(input.value != ""){
  fetch(ip+':8002/api/v1/table', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(json)
})
  .then(response => {
    if (response.status == 200) {
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
Swal.fire("Add table success")

}
// *get api location
setInterval(function() {
fetch(ip+':8002/api/v1/tables', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({isEmpty: false})
})
  .then(response => response.json())  
  .then(data => {
    const menuGoto = document.querySelector('#menuGoto ul');
  // Xóa các hàng hiện có trong tbody
    while (menuGoto.hasChildNodes()) {
    menuGoto.removeChild(menuGoto.firstChild);
  }
    const table = document.querySelector('#list-location tbody');
  // Xóa các hàng hiện có trong tbody
    while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }
    const tbody = document.querySelector('#list-location tbody');
    console.log(data);
    // Tạo các hàng trong bảng từ dữ liệu nhận được
    var stt = 0;
    data["tables"].forEach(item => {
      const option = document.createElement('li');
      option.textContent = item["name"] +": \n";
      option.textContent += item["qr_code"];
      menuGoto.appendChild(option);
      // Tạo một hàng mới
      const row = document.createElement('tr');

      // Tạo các ô dữ liệu trong hàng
      const cell1 = document.createElement('td');
      cell1.textContent = stt+1;
      stt++;
      row.appendChild(cell1);

      const cell2 = document.createElement('td');
      cell2.textContent = item["name"];
      row.appendChild(cell2);

      const cell3 = document.createElement('td');
      cell3.textContent = item["qr_code"];
      row.appendChild(cell3);

      const cell4 = document.createElement('td');
      cell4.textContent = item["is_empty"];
      row.appendChild(cell4);
      if(item["is_empty"]){
        row.className = "empty"
      }else{
        row.className = "full"
      }
      row.addEventListener('click', function() {
        // Hiển thị hộp thoại chỉnh sửa name, qr_code và có nút delete, save, cancel
        Swal.fire({
          title: item["name"],
          html: `
            <h3>Table Name</h3>
            <input type="text" value="${item["name"]}" style = "font-size:1em;">
            <h3>QR Code</h3>
            <input type="text" value="${item["qr_code"]}"  style="font-size:1em;">
          `,
          showCancelButton: true,
          confirmButtonText: 'Save',
          cancelButtonText: 'Cancel',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const name = Swal.getPopup().querySelector('input[type="text"]:nth-of-type(1)').value;
            const qr_code = Swal.getPopup().querySelector('input[type="text"]:nth-of-type(2)').value;
            const json = {
              "name": name,
              "qr_code": qr_code
            };
            return fetch(ip+`:8002/api/v1/table/${item["qr_code"]}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(json)
            })
            .then(response => {
              if (response.status == 200) {
                console.log(`Updated table: ${item["name"]}`);
                // Cập nhật lại dữ liệu mới cho hàng
                item["name"] = name;
                item["qr_code"] = qr_code;
                // Cập nhật lại nội dung của các ô dữ liệu trong hàng
                cell2.textContent = name;
                cell3.textContent = qr_code;
                return true;
              } else {
                throw new Error('Error: ' + response.status);
              }
            })
            .catch(error => {
              // Xử lý lỗi trong trường hợp không thể gửi yêu cầu PUT
              console.log(`Error updating table: ${item["name"]}`, error);
              Swal.showValidationMessage('Error updating table');
              return false;
            });
          },
          showCloseButton: true,
          allowOutsideClick: () => !Swal.isLoading(),
          showDenyButton: true,
          denyButtonText: 'Delete',
          deleteButtonColor: '#d33',
          reverseButtons: true,
          focusdelete: true
        })
        .then(result => {
          if (result.isConfirmed) {
            Swal.fire(
              'Saved!',
              `Table ${item["name"]} has been updated.`,
              'success'
            );
          } else if (result.dismiss === Swal.DismissReason.deny) {
            Swal.fire({
              title: `Do you want to delete table: ${item["name"]}?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Delete',
              cancelButtonText: 'Cancel',
              reverseButtons: true,
              focusCancel: true,
              preConfirm: () => {
                  fetch(ip+`:8002/api/v1/table/${item["qr_code"]}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                .then(response => {
                  
                  if (response.status == 204) {
                    console.log(`Deleted table: ${item["name"]}`);
                    // Xóa hàng khỏi bảng
                    // tbody.removeChild(row);
                    Swal.fire(
                      'Deleted!',
                      `Table ${item["name"]} has been deleted.`,
                      'success'
                    );
                  } else {
                    console.log(`Failed to delete table: ${item["name"]}`);
                    Swal.fire(
                      'Error!',
                      `Failed to delete table ${item["name"]}.`, response.status,
                      'error'
                    );
                  }
                })
                .catch(error => {
                  // Xử lý lỗi trong trường hợp không thể gửi yêu cầu DELETE
                  console.log(`Error deleting table: ${item["name"]}`, error);
                  Swal.fire(
                    'Error!',
                    `Error deleting table ${item["name"]}.`,
                    'error'
                  );
                });
              }
            });
          }
        })
        .catch(error => {
          console.log('Error:', error);
        });
      } );
        
      tbody.appendChild(row);
    }
    );
  })
},1000);


// *MENU of layout remote
const optionAdd = document.getElementById('addLocation');
  function autoAddLocation(){
    var json = {
      "type":"browser_command",
      "data":{
        "serial":optionAdd.value,
        "command":"addLocation"
      },
    }
    websocket.send(JSON.stringify(json))
    console.log(json)
  }



// * get api order
setInterval(function() {
  fetch(ip+':8003/api/v1/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      const table = document.querySelector('#orderTable tbody');
    // Xóa các hàng hiện có trong tbody
      while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
      const tbody = document.querySelector('#orderTable tbody');
      console.log(data);
      // Tạo các hàng trong bảng từ dữ liệu nhận được
      var stt = 0;
      data["orders"].forEach(item => {
       
        // Tạo một hàng mới
        const row = document.createElement('tr');
  
        // Tạo các ô dữ liệu trong hàng
        const cell1 = document.createElement('td');
        cell1.textContent = stt+1;
        stt++;
        row.appendChild(cell1);
  
        const cell2 = document.createElement('td');
        cell2.textContent = item["order_id"];
        row.appendChild(cell2);
  
        const cell3 = document.createElement('td');
        cell3.textContent = item["table_qr"];
        row.appendChild(cell3);
  
        const cell4 = document.createElement('td');
        cell4.textContent = item["created_at"];
        row.appendChild(cell4);

        const cell5 = document.createElement('td');
        cell5.textContent = item["updated_at"];
        row.appendChild(cell5);

        const cell6 = document.createElement('td');
        cell6.textContent = item["status"];
        row.appendChild(cell6);
        if(item["status"] == "done"){
          row.style.color = "green"
        }else if(item["status"] == "waiting"){
          row.style.color = "black"
        }else{
          row.style.color = "red"
        }
        
          
        tbody.appendChild(row);
      }
      );
    })
  },1000);


// *chart order

const xValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
const yValues = [7,8,8,9,9,9,10,11,14,14,15,0,0];

new Chart("webAppChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 0, max:16}}],
    }
  }
});

new Chart("runningChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});

new Chart("requestChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});

// *chart order
// using md from react-md
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// LineChart = React.createClass({
//   render () {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//       <LineChart width={600} height={300} data={data}
//             margin={{top: 5, right: 30, left: 20, bottom: 5}}>
//        <XAxis dataKey="name"/>
//        <YAxis/>
//        <CartesianGrid strokeDasharray="3 3"/>
//        <Tooltip/>
//        <Legend />
//        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
//        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//       </LineChart>
//       </ResponsiveContainer>
//     );
//     document.getElementById("chart-order").appendChild(LineChart);
//   }
// })