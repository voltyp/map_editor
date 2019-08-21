const map = document.querySelector('svg');
const sector = map.querySelectorAll('g');
const startNum = document.querySelector('.start');

sector.forEach(function(item){
  console.log(item.getAttribute('class'))
})

// panel-monitor
const panelMonitor = document.querySelector('.monitor-panel');

function panelFilling() {
  
  sector.forEach(function(item){
    console.log(item, 'item');
    buttonPanel = document.createElement('div');
    
    // получаем класс сектора для добавления его в атрибут
    const sectorName = item.getAttribute('class');
    
    // выводим название кнопки 
    buttonPanel.textContent = 'сектор ' + sectorName;

    // устанавливаем атрибут из которого будем брать класс нужного сектора
    buttonPanel.setAttribute('name', sectorName);
    
    // добавляем кнопки в панель управления 
    panelMonitor.appendChild(buttonPanel);

    // добавляем обработчик на клик по кнопке 
    panelMonitor.addEventListener('click', (e) => {
      
      // делегирование, если клик по кнопке то красим сектор
      if (e.target.getAttribute('name')) {
        
        const nameButton = e.target.getAttribute('name');
        const selectedSector = document.querySelector('.'+nameButton);
        selectedSector.classList.toggle('selected-sector')

        
      }   
      
      
    });

    console.log(document.querySelector('ps1'))
    // console.log(item.getAttribute('class'))
  })
}
panelFilling()
// end pm


console.log(sector[0].childNodes);


// устанавливаем конец ряда.
map.addEventListener('click', (e) => {
  
  if (e.target.tagName == 'circle') {
    e.target.setAttribute('br', 1);
    e.target.classList.add('selected');
  }
  
  console.log(e.target.tagName == 'circle');
  
});

// запускаем нумерацию
startNum.addEventListener('click', () => {
  number()
});



function number() {
  for (let i = 0; i < sector.length; i++) {
    // счетчик мест и ряда.
    let iPlace = 1,
    iRow = 1,
    iSector = sector[i].getAttribute('class');
    
    sector[i].childNodes.forEach(function(item, i) {

      if (item.tagName == 'circle') {
        
        console.log(item);
        item.setAttribute('id', iSector + 'r' + iRow + 'p' + iPlace);  
        item.classList.remove('selected');
        iPlace++;

        // проверяем на конец ряда
        if (item.hasAttribute('br')) {
          iRow++;
          iPlace = 1;
        }

      }

    });
  }
}

