setInterval(function() {
fetch('http://192.168.1.178:8002/api/v1/tables/', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => {
    const table = document.querySelector('#list-location');
  // Xóa các hàng hiện có trong tbody
    while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }
    const tbody = document.querySelector('#list-location');
    console.log(data);
    // Tạo các hàng trong bảng từ dữ liệu nhận được
    data["tables"].forEach(item => {
      // Tạo một hàng mới

      // Tạo các ô dữ liệu trong hàng

      const cell2 = document.createElement('section');
      cell2.textContent = item["name"];
      tbody.appendChild(cell2);

      if(item["is_empty"]){
        cell2.className = 'empty';
      }
      else{
        cell2.className = 'full';
      }
      ;
      cell2.addEventListener('click', function() {
        // Hiển thị hộp thoại chỉnh sửa name, qr_code và có nút delete, save, cancel
        const dialog = document.createElement('dialog');
        dialog.innerHTML = `
        <form method="dialog">
          <h2>${item["name"]}</h2>
          <h3>Do you want to change status of this table?</h3>
          <section class="actions">
          
          <button value="cancel">Cancel</button>
          <button value="OK" class="save">OK</button>
          </section>

        </form>
        `;
        document.body.appendChild(dialog);
        dialog.classList.add('dialog');
        dialog.showModal();
        dialog.addEventListener('click', function(event) {
          const target = event.target;
          if (target.tagName === 'BUTTON') {
            const value = target.value;
            if (value === 'cancel') {
              dialog.close();
            } else if (value === 'OK') {

              const is_empty = !item["is_empty"];
              console.log( is_empty);
              const json = {
                "is_empty": is_empty
              };
              fetch(`http://192.168.1.178:8002/api/v1/table/${item["qr_code"]}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(json)
              })
                .then(response => {
                  if (response.ok) {
                    console.log(`Updated table with id: ${item["name"]}`);
                    // Cập nhật lại dữ liệu mới cho hàng

                    // Đóng hộp thoại
                    dialog.close();
                  } else {
                    throw new Error('Error: ' + response.status);
                  }
                })
                .catch(error => {
                  // Xử lý lỗi trong trường hợp không thể gửi yêu cầu PUT
                  console.log(`Error updating table with id: ${item["id"]}`, error);
                });
            } 
          }
        });
      } );
    }
    );
  })
}, 1000);


