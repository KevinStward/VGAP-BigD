//var myChart = document.getElementById('myChart').getContext('2d');
//var content = document.getElementById('Content')
let cardContent = document.getElementById('cards-for-games')
let cardTitle = document.getElementById('gard-title')
let contetSummary = document.getElementById('summary-content')
let nYear=[]
let color =[]
let label = []
let sele = `
<select class="form-control col-2" name="GNRE" id="GNRE">
    <option value="All">Todos</option>
    <option value="Action">Action</option>
    <option value="Adventure">Adventure</option>
    <option value="Fighting">Fighting</option>
    <option value="Misc">Misc</option>
    <option value="Platform">Platform</option>
    <option value="Puzzle">Puzzle</option>
    <option value="Racing">Racing</option>
    <option value="Role-Playing">Role-Playing</option>
    <option value="Shooter">Shooter</option>
    <option value="Simulation">Simulation</option>
    <option value="Sports">Sports</option>
    <option value="Strategy">Strategy</option>
</select> 

`


deleteElemtos(contetSummary)
//Conect to Firebase
var firebaseConfig = {
  apiKey: "AIzaSyC4olR_uHqh4BMUCmFHRH2sReq84KpmSBA",
  authDomain: "ggdsd-df1ea.firebaseapp.com",
  databaseURL: "https://ggdsd-df1ea.firebaseio.com",
  projectId: "ggdsd-df1ea",
  storageBucket: "ggdsd-df1ea.appspot.com",
  messagingSenderId: "422034515041",
  appId: "1:422034515041:web:262c01db37d8d24898f620"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
const btnTodo = document.getElementById('btnTodo');
const btnGenre = document.getElementById('BtnGenre');
const GetGame = (index) => firestore.collection("BaseGames").doc(index).get();

const GetGames = () => firestore.collection("BaseGames").orderBy('Rank').get();

const GetWhere = (Genre) => firestore.collection("BaseGames").where('Genre','==',Genre).orderBy('Rank').get();

//Tihs start the platform
btnTodo.addEventListener('click', async (e) => {
  deleteElemtos(cardContent)
  summaryGtaph();
  const games = await GetGames()
  cardTitle.innerHTML += `
    <div class="section-title" style="padding-top: 20px">
      <h2>Ranking</h2>
      <p>Listado de juegos y sus detalles</p>
      <div class="row justify-content-center">
        <div class="col-2">
        <label for="GNRE">Escoge un Genero:</label>
        </div>
      </div>
      <div class="row justify-content-center" style="padding-top:40px">
        ${sele}
      </div>
      <div class="row justify-content-center" style="padding-top:40px">
        <button type="button" class="btn btn-primary" id="btnFiltro" onclick="generateFilter()">Filtrar</button>
      </div>
    </div>
    `
  games.forEach(doc => {
    let van = doc.data()
    generateCard(van);
  });

  //Ejecucion de las graficas de lineas


  
  //Lines(CTX3,label,nyearn)
})

async function generateFilter(){
  deleteElemtos(cardContent)
  let genreSel = document.getElementById('GNRE').value;
  let GenreF =''
  if(genreSel == 'All'){
      GenreF = await GetGames();
  }else{
      GenreF = await GetWhere(genreSel);
  }
  GenreF.forEach(doc => {
    let van = doc.data()
    generateCard(van);
  });
}

async function summaryGtaph() {
  const games = await GetGames()
  nPublisher = Hash(games, 'Publisher', true)
  nYear = Hash(games,'Year_of_Release', true)

  let Keys = Object.keys(nYear);
  let Data =[]
  Data = OrdenarObjecto(nYear);

 console.log(Data);
  Keys.forEach(year =>{

      let y = parseInt(year.slice(0,-1))
      label.push(y)
      //console.log(typeof(y));
     // let colo = randomColor();
  })
  label.sort();
  console.log(label);
  contetSummary.innerHTML = `
  <section class="why-us section-bg" data-aos="fade-up" date-aos-delay="200" >
  <div class="container">
  <div class="section-title" style="padding-top: 20px">
    <h2>RESUMEN</h2>
    <p>Esto es una vista general de lo que es capas de hacer nuestra plataforma</p>
  </div>
    <div class="row">
      <div class="col-lg-6">
        <div class="section-title section-title-chart">
          <h2>PLATAFORMAS</h2>
        </div>
        <div class="char-summary-1 space-border" id="char-summary">
        </div>
      </div>

      <div class="col-lg-6">
        <div class="section-title section-title-chart">
          <h2>#JUEGOSxAÑO</h2>
        </div>
        <div class="space-border" id="char-summary-line">
        </div
  </div>
</section><!-- End Why Us Section -->
  `
  let chartSummary = document.getElementById('char-summary')
  let chartSummaryL= document.getElementById('char-summary-line')
  chartSummary.innerHTML = `
    
  <canvas id = "ctx2" width="50px" height="40px"></canvas>
  
  `
  chartSummaryL.innerHTML = `
    
  <canvas id = "ctxl" width="50px" height="40px"></canvas>
  
  `
  let CTX2 = document.getElementById('ctx2').getContext('2d');
  let ctxl = document.getElementById('ctxl').getContext('2d');
  char1(nPublisher, CTX2)
  Lines(ctxl,label,Data)
}

function getColorByGenre(genre) {
  let color = "";

  switch (genre) {
    case 'Platform':
      color = 'blue'
      break;
    case 'Sports':
      color = 'cyan'
      break;
    case 'Racing':
      color = 'green'
      break;
    default:
      color = 'pink'
  }

  return color
}

function generateCard(cardData) {
  let van = cardData;
  let colorGenre = getColorByGenre(van.Genre);
  var ratingShow = van.Rating == "" ? "N/A" : van.Rating;
  cardContent.innerHTML += `
  <div class="col-md-6 col-lg-3 align-items-stretch" data-aos="fade-up">
      <div class="icon-box icon-box-${colorGenre}">
        <div class="icon"><i class="bx bxl-dribbble"></i>
        </div>
        <div class="header-card">
          <h4 class="title-moderna"><a href="">${van.Rank}. ${van.Name}</a></h4>
          <div class="label">Genre</div>
          <span class="subtile-card">${van.Genre}</span>
        </div>
        <div class="caracteristicas">
          <div class="row">
            <div class="col">
              <div class="label">Platform</div>
              <div class="value">${van.Platform}</div>
              <div class="label">Year</div>
              <div class="value">${van.Year_of_Release}</div>
            </div>
            <div class="col">
              <div class="label">Publisher</div>
              <div class="value">${van.Publisher}</div>
              <div class="label">Rating</div>
              <div class="value">
              ${ratingShow}
              </div>
            </div>
          </div>
        </div>
        <a href="#" data-toggle="modal" data-target="#exampleModal" onclick="insertIntoModal(${van.Rank})">
        <div type="button" class="footer-card" id="detail-game">
          <span> Details</span>
        </div>
        </a>
      </div>
    </div>
  `
}

function deleteElemtos(elm) {
  while (elm.firstChild) {
    elm.removeChild(elm.firstChild);
  }
}

function char1(doc, ctx) {
  let labelsDoc = [];
  let dataDoc = [];
  for (const key in doc) {
    labelsDoc.push(key)
  }
  for (const key in doc) {
    dataDoc.push(doc[key])
  }
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labelsDoc,
      datasets: [{
        label: `Impacto de las consolas`,
        data: dataDoc,
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 169, 90, 1.5)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 0, 90, 2)',
          'rgba(5, 40, 30, 1)'
        ],
        borderColor: [
        ],
        borderWidth: 0
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {

          }
        }]
      }
    }
  });
};

async function insertIntoModal(rank) {
  const game = await GetGame(rank.toString());
  modalGraphs(game);
  let modalTitle = document.getElementById("ModalTitle");
  modalTitle.innerText = game.data().Name;
  let ModalPlatform = document.getElementById("ModalPlatform");
  ModalPlatform.innerText = game.data().Platform;
  let ModalDeveloper = document.getElementById("ModalDeveloper");
  ModalDeveloper.innerText = game.data().Publisher;
  let ModalGenre = document.getElementById("ModalGenre");
  ModalGenre.innerText = game.data().Genre;
  let ModalRating = document.getElementById("ModalRating");

  if (game.data().Rating != "") {
    ModalRating.innerText = game.data().Rating;
  
}else{
  ModalRating.innerText = "N/A"
  }
  
  let ModalYear = document.getElementById("ModalYear");
  ModalYear.innerText = game.data().Year_of_Release;

  let ModalGlobalSales = document.getElementById("ModalGlobalSales");
  if (game.data().Global_Sales != "") {
    ModalGlobalSales.innerText = game.data().Global_Sales;
  }else{
    ModalGlobalSales.innerText = "0";
  }

  let ModalCriticCount = document.getElementById("ModalCriticCount");
  if (game.data().Critic_Count != "") {
    ModalCriticCount.innerText = game.data().Critic_Count;
  }else{
    ModalCriticCount.innerText = "0";
  }

  let ModalUserCount = document.getElementById("ModalUserCount");
  if (game.data().Critic_Count != "") {
    ModalUserCount.innerText = game.data().Critic_Count;
  }else{
    ModalUserCount.innerText = "0";
  }

}

function modalGraphs(game){

  let chartSummary1 = document.getElementById('char-summary-1')
  chartSummary1.innerHTML = `
  <canvas id = "ctx3" width="50px" height="40px"></canvas>
  `
  let CTX3 = document.getElementById('ctx3').getContext('2d');
  modalChar1(game, CTX3)
  
  let chartSummary4 = document.getElementById('char-summary-4')
  if(game.data().Critic_Score === "" || game.data().User_Score === ""){
    chartSummary4.innerHTML = `
    <span> Lo sentimos, no contamos con la data para esta grafica</span>
    <img src="https://media.istockphoto.com/vectors/error-page-dead-emoji-illustration-vector-id1095047472?k=6&m=1095047472&s=612x612&w=0&h=3pmxoo0x2rRQXv7z_3Ijm_tsMXMkJfImBdBsXmCJ_tQ=" alt="" class="img-fluid">
  
  `
  }else{
    chartSummary4.innerHTML = `
    
  <canvas id = "ctx4" width="50px" height="40px"></canvas>
  
  `
  let CTX4 = document.getElementById('ctx4').getContext('2d');
  modalChar2(game, CTX4)
  }
}

function modalChar1(doc, ctx) {
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['EU_Sales','NA_Sales','JP_Sales', 'Other_Sales'],
      datasets: [{
        label: "Numero de Ventas por Region (millions)",label: `Impacto de las consolas`,
        data: [doc.data().EU_Sales,doc.data().NA_Sales, doc.data().JP_Sales, doc.data().Other_Sales],
        backgroundColor: ['#044AC3','#0CC500','#D34600','#D300AC']
      }]
    },
    options: {
      title: {
        display: true,
        text: `Numero de Ventas por Region (millions)`
      }
    }
  });
};

function modalChar2(doc, ctx) {
 let score =  parseInt(doc.data().User_Score) * 10 //
 var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['CRITIC_SCORE', 'CRITIC_USER'],
      datasets: [{
          label: '# of Votes',
          data: [parseInt(doc.data().Critic_Score),score],
          backgroundColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1 )',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
  }
});
};

function Hash(Games, Q, Percet = false) {
  let dit = []

  Games.forEach(doc => {
    let i = ''
    if (typeof (doc.get(Q)) == 'number') {
      i = doc.get(Q).toString() + 'a'
    }
    else {

      i = doc.get(Q)
    }
    if (i in dit) {
      ++dit[i];
    }
    else {
      dit[i] = 1;
    }
  })
  let dit2 = []
  let total = 0
  /*if(Percet === true){
    console.log("entra a if");
    console.log(typeof(dit));
    console.log(dit);
    for (const key in dit) {
      console.log('Mostrar valor para sumar y tener total');
      console.log(value);
      total =+ value
    }
    console.log("NEXT");
    for (let [key, value] of dit) {
      console.log('Total')
      console.log(total)
      console.log('Mostrar valor para sumar y tener porcentaje');
      console.log(value);
      dit2[key] = intToPercet(value,total);
    }
    return dit2;
  }*/
  return dit
}

function intToPercet(value, total) {
  return (value / total) * 100;
}

function Lines(ctx,label,data){
  new Chart(ctx, {
      type: 'line',
      data: {
        labels: label,
        datasets: [{ 
            data: Object.values(data),
            label: "# de juegos por año",
            borderColor: '#EC2121',
            backgroundColor: '#D300AC',
            
            fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Cantidad de Juegos Por año'
        },
        scales: {
          yAxes: [{
              ticks: {
                  suggestedMin: 0,
                  suggestedMax: 10
              }
          }]
      }
      }
    });


}
function randomColor(){

  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";

}

function OrdenarObjecto(year){
  let cc = []
  let keys = Object.keys(year).sort()
  keys.forEach(y =>{
  
      cc.push(year[y])
  
  
  })
  console.log(Object.values(cc));
  return cc
  }

