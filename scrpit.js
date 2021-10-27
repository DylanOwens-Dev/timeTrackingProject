const info = document.querySelector('.info-container')
const daily = document.querySelector('.daily')
const weekly = document.querySelector('.weekly')
const monthly = document.querySelector('.monthly')
const btns = document.querySelectorAll('.time-btns')
var currentTime = ''
var prev = ''

setCurrentTime()
setPrev()

function setPrev() {
    if (currentTime == 'daily') {
        prev = 'Yesterday'
    } else if (currentTime == 'weekly') {
        prev = "Last Week"
    } else {
        prev = "Last Month"
    }
}

function setCurrentTime() {
    if (daily.classList.contains('active')) {
        currentTime = 'daily';
    } else if (weekly.classList.contains('active')) {
        currentTime = 'weekly';
    } else {
        currentTime = 'monthly';
    }
}
//get data from json
getData();
async function getData() {
  const response = await fetch('./data.json');
  const data = await response.json();
  displayData(data);
}

//display data
function displayData(data) {
    data.boxes.forEach(obj => {
        var statContainer = document.createElement('div');
        statContainer.classList.add('info-box', `${obj.title.split(" ").join()}`);

        //create the html
        function createHTML(title, hours, date) {
            statContainer.innerHTML = `
                <div class="background">
                    <div class="title">${obj.title}</div>
                    <button class="options">...</button>
                    <div class="stat">${hours}hrs</div>
                    <div class="last-stat">${prev} - ${date}hrs</div>
                </div>`;
        }

        var lastStat = document.querySelector(".last-stat")

        createHTML(obj.title, obj.timeframes.weekly.current, obj.timeframes.weekly.previous);
        info.appendChild(statContainer);

        //functions for btns to change the data
        daily.addEventListener('click', () => {
            btns.forEach((btn) => btn.classList.remove('active'));
            daily.classList.add('active');
            setCurrentTime()
            setPrev()
            createHTML(obj.title, obj.timeframes.daily.current, obj.timeframes.daily.previous);
        });

        weekly.addEventListener('click', () => {
            btns.forEach((btn) => btn.classList.remove('active'));
            weekly.classList.add('active');
            setCurrentTime()
            setPrev()
            createHTML(obj.title, obj.timeframes.weekly.current, obj.timeframes.weekly.previous);
        });

        monthly.addEventListener('click', () => {
            btns.forEach((btn) => btn.classList.remove('active'));
            monthly.classList.add('active');
            setCurrentTime()
            setPrev()
            createHTML(obj.title, obj.timeframes.monthly.current, obj.timeframes.monthly.previous);
        });
    })
}










