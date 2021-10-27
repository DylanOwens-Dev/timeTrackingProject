const info = document.querySelector('.info-container')
const daily = document.querySelector('.daily')
const weekly = document.querySelectorAll('.weekly')
const monthly = document.querySelectorAll('.monthly')
const btns = document.querySelectorAll('.time-btns')
var currentTime = ''

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

  
//   data.boxes.forEach(obj => {
//     setCurrentTime()
//     var statContainer = document.createElement('div');
//     statContainer.classList.add('info-box', `${obj.title}`.split(" ").join());
//     statContainer.innerHTML = `
//     <div class="background">
//         <div class="title">${obj.title}</div>
//         <button class="options">...</button>
//         <div class="stat">${obj}</div>
//         <div class="last-stat">Last Week - 36hrs</div>
//     </div>`;

//     info.appendChild(statContainer)
// });
}

function displayData(data) {
    data.boxes.forEach(obj => {
        var statContainer = document.createElement('div');
        statContainer.classList.add('info-box', `${obj.title.split(" ").join()}`);

        function createHTML(title, hours, date) {
            statContainer.innerHTML = `
                <div class="background">
                    <div class="title">${obj.title}</div>
                    <button class="options">...</button>
                    <div class="stat">${hours}hrs</div>
                    <div class="last-stat">Last Week - ${date}hrs</div>
                </div>`;
        }

        createHTML(obj.title, obj.timeframes.weekly.current, obj.timeframes.weekly.previous);
        info.appendChild(statContainer);

        daily.addEventListener('click', () => {
            btns.forEach((btn) => btn.classList.remove('active'));
            dailyBtn.classList.add('active');
            createHTML(
              item.title,
              item.timeframes.daily.current,
              item.timeframes.daily.previous
            );
          });
    })
}










