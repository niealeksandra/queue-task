var i = 1;
var maxValue = 10;
var number = 0;
var queue = [];
var taskDone = false;

var wykonywane = document.getElementById('wykonywane');
var kolejka = document.getElementById('kolejka');
var zrobione = document.getElementById('zrobione');
var addButton = document.getElementById('add');


addButton.addEventListener('click', function(){
  addToQueue();
  start();
})


function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}


function createElement(name, id) {
  let p = document.createElement('p');
  p.textContent = name + ' ' + i;
  p.className = name + i;
  p.id = `item-${id}`
    return p;
}


function createButton(id) {
  let b = document.createElement('button');
  b.textContent = 'x';
  b.className = 'button';
  b.id = `button-${id}`
    return b;
}


function deleteItem(id) {
  let el = document.getElementById('item-' + id)
  el.remove();
}


function addToQueue() {
  queue.push({id: i, time: getRandom(5000, 10000)})
  kolejka.appendChild(createElement('zadanie', i));

  i++;
}


function start() {

  if(queue.length > 0) {

    let check = setInterval( function() {
      if (queue.length > 0) {
        if (number < maxValue) {

          let item = queue.shift();
          startProcessing(item)
        }  

      } else {
        clearInterval(check)
      }
    }, 100);
  } 
}

function startProcessing(item) {

  let processedItem = document.getElementById('item-' + item.id);
  wykonywane.appendChild(processedItem);

  number++;

  endProcessing(item)
}


function endProcessing(item) {
  let endItem = document.getElementById('item-' + item.id);

  setTimeout(() => {
    zrobione.appendChild(endItem);
    number--;
    console.log('Zadanie ' + item.id + ' wykonane po ' + Math.ceil(item.time/1000) + 's.');

    let buttonItem = document.getElementById('item-' + item.id);
    buttonItem.appendChild(createButton(item.id))
    
    let deleteButton = document.getElementById('button-' + item.id);
    deleteButton.addEventListener('click', function(){
      deleteItem(item.id) 
    })

  }, item.time);
}



