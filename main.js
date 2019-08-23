const map = document.querySelector('svg');
const sector = map.querySelectorAll('.sector');
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
    item.setAttribute('class', 's'+ (i+1))
    const sectorName = item.getAttribute('class');
    
    
    // create wrapper for button in monitor-panel
    const wrapButton  = document.createElement('div');
          wrapButton.classList.add('wrapper-button');    
          // записываем имя сектора за который отвечает данная кнопка 
          wrapButton.setAttribute('name', sectorName);

    const buttonPanel = document.createElement('div');
    // Добавляем кнопку в обертку
    wrapButton.appendChild(buttonPanel);

    // добавляем пункты скрытого меню
    const subRow = document.createElement('div');
          subRow.classList.add('sub-item', 'change-start-numbering');
          subRow.textContent = 'Начало нумерации';
    
    // добавляем поле вводаж 
    const inputWrap = document.createElement('div'),
          inputRow = document.createElement('input'),
          inputButton = document.createElement('button');

          inputWrap.classList.add('sub-item', 'input-wrap');
          inputRow.classList.add('input-start-numbering');
          inputButton.classList.add('button-start-numbering');
          inputButton.textContent = 'ok';
          
    inputWrap.appendChild(inputRow);
    inputWrap.appendChild(inputButton);
    subRow.appendChild(inputWrap);
           
// кнопка запуска нумерации
    const buttonNum = document.createElement('div');
          buttonNum.classList.add('sub-item', 'start-numbering');
          buttonNum.setAttribute('s-pos', sectorName)
          buttonNum.textContent = 'Пронумеровать';
    
    wrapButton.appendChild(subRow);
    wrapButton.appendChild(buttonNum);
    // выводим название кнопки 
    buttonPanel.textContent = 'Сектор ' + sectorName;
    
    // добавляем кнопки в панель управления 
    panelMonitor.appendChild(wrapButton);
    // console.log(item.getAttribute('class'))   

    sectorInfo[sectorName] = {
      sector: sectorName,
      pos: i,
      startNum: 1
    }

     // обрбаботчик на кнопку ок при выборе начала нумерации
     inputButton.addEventListener('click', () => {
      let value = inputRow.value;
      sectorInfo[sectorName].startNum = +value;
      console.log(sectorInfo)
    });
  
    console.log(sectorInfo)

  });

  // добавляем обработчик на клик по кнопке 
  panelMonitor.addEventListener('click', (e) => {
    const target = e.target;

    // получаем родителя в который записана информация о секторе 
    const getParent = target.parentNode;

    console.log(getParent);
    
    function clearSelected() {
      for (let i = 0; i < sector.length; i++) {
        
        sector[i].classList.remove('selected-sector');  
        panelMonitor.children[i].classList.remove('selected-panel'); 

      }

    }

    // делегирование, если клик по кнопке то красим сектор
    if (getParent.getAttribute('name')) {

      clearSelected();

      // получаем класс сектора
      const nameButton = getParent.getAttribute('name');
      // получаем сам сектор
      const selectedSector = document.querySelector('.'+nameButton);

      // красим сектор и кнопку в панели управления
      target.parentNode.classList.add('selected-panel');
      selectedSector.classList.toggle('selected-sector');

    }   

    // установка начала нумерации
    if (target.classList.contains('change-start-numbering')) {
      inputNum = document.querySelectorAll('.input-start-numbering');      
      target.childNodes[1].classList.toggle('sub-item');



    }

    // запуск нумерации
    if (target.classList.contains('start-numbering')) {
      const sector = getParent.getAttribute('name');    
      number(sectorInfo[sector].pos, sectorInfo[sector].startNum)  
    }
    
  });

}
panelFilling()


// end pm



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
          (sPlace) ? iPlace = sPlace : iPlace = 1; 
        }

      }

    });
  // }
}

