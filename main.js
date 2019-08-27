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

function createElement(type, Class, Text, setAtr) {
  const div  = document.createElement(type); 
        div.classList.add(Class);   
        div.setAttribute(setAtr[0], setAtr[1]);   
        div.textContent = Text;
}

function panelFilling() {
  
  sector.forEach(function(item, i){
    // item - сектора
    console.log(item , i);
    // получаем класс сектора для добавления его в атрибут
    item.setAttribute('class', 's'+ (i+1))
    const sectorName = item.getAttribute('class');
    
    // создаем обертку для кнопки в панели управления
    const wrapButton  = document.createElement('div');
          wrapButton.classList.add('wrapper-button');    
          // записываем имя сектора за который отвечает данная кнопка 
          wrapButton.setAttribute('name', sectorName);

    const buttonPanel = document.createElement('div');
    // Добавляем кнопку в обертку
    wrapButton.appendChild(buttonPanel);
    // выводим название кнопки 
    buttonPanel.textContent = 'Сектор ' + sectorName;


    // добавляем пункты скрытого меню
    const subRow = document.createElement('div');
          subRow.classList.add('sub-item', 'change-start-numbering');
          subRow.textContent = 'Нумерация';
    
    // добавляем поле ввода начала нумерации
    const inputWrap = document.createElement('div'), 
          inputWrapItem = document.createElement('div'), 
          // заголовок
          inputTitle = document.createElement('h4'),

          inputRow = document.createElement('input'),          
          inputButton = document.createElement('button');

          // добавляем в обертку инпут и кнопку
          inputWrapItem.appendChild(inputRow);
          inputWrapItem.appendChild(inputButton);

          inputWrap.classList.add('sub-item', 'input-wrap');
          inputRow.classList.add('input-start-numbering');
          inputButton.classList.add('button-start-numbering');
          inputTitle.textContent = 'Начало нумерации c:';
          inputButton.textContent = 'ok';
          
    inputWrap.appendChild(inputTitle);
    inputWrap.appendChild(inputWrapItem);
    subRow.appendChild(inputWrap);

    const createArbitaryRow = (newRow) => {
      const arbitraryWrap = document.createElement('div'),
          arbitaryItem = document.createElement('div'),
          arbitaryTitle = document.createElement('h4'),
          arbitaryCheckBox = document.createElement('input'),
          arbitaryInput = document.createElement('input'),
          arbitaryButton = document.createElement('button');

          arbitraryWrap.classList.add('sub-item', 'input-wrap');
          arbitaryTitle.textContent = 'Произвольная точка начала: ';
          arbitaryCheckBox.setAttribute('type', 'checkbox');
          arbitaryCheckBox.classList.add('checkbox');
          arbitaryButton.textContent = 'ok';

          arbitaryItem.appendChild(arbitaryCheckBox);
          arbitaryItem.appendChild(arbitaryInput);
          arbitaryItem.appendChild(arbitaryButton);

          arbitraryWrap.appendChild(arbitaryTitle);
          arbitraryWrap.appendChild(arbitaryItem);
          
          (newRow) ? subRow.insertBefore(arbitraryWrap, addArbitaryButton) : subRow.appendChild(arbitraryWrap);

          // оставляем только один активный чекбокс
          arbitaryCheckBox.addEventListener('click', function(e) {
            
            const allCheckbox = document.querySelectorAll('.checkbox');
            
            for (let i = 0; i < allCheckbox.length; i++) {
              allCheckbox[i].checked = false;
            }

            e.target.checked = true;
            
          });

          arbitaryInput.addEventListener('change' , () => {
            let valueInput = arbitaryInput.value;
            arbitaryCheckBox.setAttribute('startNum', valueInput);
            // arbitaryCheckBox.checked = false;
          })

          arbitaryButton.addEventListener('click', () => {
            arbitaryCheckBox.checked = false;
          })


    }

    createArbitaryRow()

    const addArbitaryButton = document.createElement('button');
          addArbitaryButton.textContent = 'Добавить точку начала';
          
          subRow.appendChild(addArbitaryButton);

          addArbitaryButton.addEventListener('click', () => {
            createArbitaryRow(true)
          });

// кнопка запуска нумерации
    const buttonNum = document.createElement('div');
          buttonNum.classList.add('sub-item', 'start-numbering');
          buttonNum.setAttribute('s-pos', sectorName)
          buttonNum.textContent = 'Пронумеровать';
    
    // кнопка выбора цвета
   const buttonColor = document.createElement('div');
         buttonColor.classList.add('sub-item', 'button-color');
         
   const color = ['#FFCCCC','#FFF497', '#CCFFFF', '#EEEEEE'];

   for (let j = 0; j < color.length; j++) {
    const circleColor = document.createElement('div');
          circleColor.classList.add('color-circle');
          circleColor.style.background = color[j];

    buttonColor.appendChild(circleColor);
   }

    wrapButton.appendChild(subRow);
    wrapButton.appendChild(buttonNum);
    wrapButton.appendChild(buttonColor);
    
    
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
  const allCheckbox = document.querySelectorAll('.checkbox');
  let flagChecked = false;
  let checkbox;

  for (let i = 0; i < allCheckbox.length; i++) {
    
    if (allCheckbox[i].checked) {
      flagChecked = true;
      checkbox = allCheckbox[i].getAttribute('startNum');     
      console.log(checkbox, 'first') 
    }
      

  }

  // проверка на клик по кругу и чтобы была выбрана зона в панели управления по которой клик происходит
  if (target.tagName == 'circle' && target.parentNode.classList.contains('selected-sector')) {
  
    if (flagChecked) {
      console.log(checkbox, 'second') 
      e.target.setAttribute('startNum', checkbox)
      e.target.classList.toggle('selected-start');
      // поменять цвет точки начала нумерации
    } else {
      e.target.setAttribute('br', 1);
      e.target.classList.toggle('selected');
    }
    
  }

  
  
  console.log();
  
});

// запускаем нумерацию
startNum.addEventListener('click', () => {
  number(0,startPlace)  
});



function number(s, sPlace) {
  // for (let i = 0; i < sector.length; i++) {
    sector[s].classList.remove('selected-sector');

    // if (reverseNumbering)
      
    // счетчик мест и ряда.
    let iPlace = sPlace || 1,
    iRow = 1,
    iSector = sector[s].getAttribute('class');
    sector[s].childNodes.forEach(function(item, i) {

      if (item.tagName == 'circle') {
        
        if (item.hasAttribute('startNum') && item.classList.contains('selected-start')) {
          iPlace = item.getAttribute('startNum');
          item.classList.remove('selected-start');
        }

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

