const map = document.querySelector('svg');
const sector = map.querySelectorAll('g');
const startNum = document.querySelector('.start');

const sectorInfo = {};

console.log(sectorInfo)

sector.forEach(function(item){
  console.log(item.getAttribute('class'))
})

// panel-monitor
const panelMonitor = document.querySelector('.monitor-panel');

function panelFilling() {
  
  sector.forEach(function(item, i){
    // item - сектора
    console.log(item , i);
    // получаем класс сектора для добавления его в атрибут
    const sectorName = item.getAttribute('class');

    // create wrapper for button in monitor-panel
    const wrapButton  = document.createElement('div');
          wrapButton.classList.add('wrapper-button');

    const buttonPanel = document.createElement('div');
    // Добавляем кнопку в обертку
    wrapButton.appendChild(buttonPanel);

    // добавляем пункты скрытого меню
    const subRow = document.createElement('div');
          subRow.classList.add('sub-item', 'change-start-numbering');
          subRow.textContent = 'Начало нумерации';

    const buttonNum = document.createElement('div');
          buttonNum.classList.add('sub-item', 'start-numbering');
          buttonNum.setAttribute('s-pos', sectorName)
          buttonNum.textContent = 'Пронумеровать';
    
    wrapButton.appendChild(subRow);
    wrapButton.appendChild(buttonNum);
    // выводим название кнопки 
    buttonPanel.textContent = 'Сектор ' + sectorName;

    // устанавливаем атрибут из которого будем брать класс нужного сектора
    buttonPanel.setAttribute('name', sectorName);
    
    // добавляем кнопки в панель управления 
    panelMonitor.appendChild(wrapButton);
    // console.log(item.getAttribute('class'))

    sectorInfo[sectorName] = {
      pos: i,
      startNum: 1
    }
  
    console.log(sectorInfo)

  });

  // добавляем обработчик на клик по кнопке 
  panelMonitor.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    
    function clearSelected() {
      for (let i = 0; i < sector.length; i++) {
        
        sector[i].classList.remove('selected-sector');  
        panelMonitor.children[i].classList.remove('selected-panel'); 

      }

    }

    // делегирование, если клик по кнопке то красим сектор
    if (target.getAttribute('name')) {

      clearSelected();

      // получаем класс сектора
      const nameButton = target.getAttribute('name');
      // получаем сам сектор
      const selectedSector = document.querySelector('.'+nameButton);

      // красим сектор и кнопку в панели управления
      target.parentNode.classList.add('selected-panel');
      selectedSector.classList.toggle('selected-sector');

    }   



    if (target.classList.contains('start-numbering')) {
      const sector = target.getAttribute('s-pos');      
      number(sectorInfo[sector].pos, sectorInfo[sector].startNum)  
    }
    
  });

}
panelFilling()


// end pm


console.log(sector[0].childNodes);


// устанавливаем конец ряда.
map.addEventListener('click', (e) => {
  const target = e.target;

  // проверка на клик по кругу и чтобы была выбрана зона в панели управления по которой клик происходит
  if (target.tagName == 'circle' && target.parentNode.classList.contains('selected-sector')) {
    e.target.setAttribute('br', 1);
    e.target.classList.toggle('selected');
  }
  
  console.log(e.target.tagName == 'circle');
  
});

// запускаем нумерацию
startNum.addEventListener('click', () => {
  number(0,startPlace)  
});



function number(s, sPlace) {
  // for (let i = 0; i < sector.length; i++) {
    sector[s].classList.remove('selected-sector');
    // счетчик мест и ряда.
    let iPlace = sPlace || 1,
    iRow = 1,
    iSector = sector[s].getAttribute('class');
    console.log(iSector, 'tut')
    sector[s].childNodes.forEach(function(item, i) {

      if (item.tagName == 'circle') {
        
        console.log(item);
        item.setAttribute('id', iSector + 'r' + iRow + 'p' + iPlace);  
        item.classList.remove('selected');
        iPlace++;

        // проверяем на конец ряда
        if (item.hasAttribute('br')) {
          iRow++;
          (sPlace) ? iPlace = startPlace : iPlace = 1; 
        }

      }

    });
  // }
}

