function addOption(option) {
    const selectElement = document.getElementById('mySelect');
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;





    
    selectElement.appendChild(optionElement);
  }
  
  const selectElement = document.getElementById('mySelect');
  selectElement.addEventListener('change', function(event) {
    const target = event.target;
    const optionValue = target.value;
  
    // Kiểm tra xem option đã tồn tại trong danh sách options chưa
    const existingOption = selectElement.querySelector(`option[value="${optionValue}"]`);
    if (existingOption) {
      existingOption.remove();
    } else {
      addOption(optionValue);
    }
  });
  