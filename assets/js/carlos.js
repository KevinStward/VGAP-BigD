//var myChart = document.getElementById('myChart').getContext('2d');
//var content = document.getElementById('Content')
let cardContent = document.getElementById('cards-for-games')
let contetSummary = document.getElementById('summary-content')
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

const GetWhere = (Genre) => firestore.collection("BaseGames").where('Genre', '==', Genre).get();

//Tihs start the platform
btnTodo.addEventListener('click', async (e) => {
  deleteElemtos(cardContent)
  summaryGtaph();
  const games = await GetGames()
  games.forEach(doc => {
    
    let van = doc.data()
    console.log(van)
    generateCard(van);
  });
})

async function summaryGtaph() {
  const games = await GetGames()
  nPublisher = Hash(games, 'Publisher', true)

  contetSummary.innerHTML = `
  <section class="why-us section-bg" data-aos="fade-up" date-aos-delay="200" >
  <div class="container">

    <div class="row">
      <div class="col-lg-6">
        <div class="section-title section-title-chart">
          <h2>Platforms</h2>
        </div>
        <div class="char-summary" id="char-summary">
        </div>
      </div>

      <div class="col-lg-6 d-flex flex-column justify-content-center p-5">

        <div class="icon-box">
          <div class="icon"><i class="bx bx-fingerprint"></i></div>
          <h4 class="title"><a href="">Lorem Ipsum</a></h4>
          <p class="description">Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
            occaecati cupiditate non provident</p>
        </div>

        <div class="icon-box">
          <div class="icon"><i class="bx bx-gift"></i></div>
          <h4 class="title"><a href="">Nemo Enim</a></h4>
          <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque</p>
        </div>

        <div class="icon-box">
          <div class="icon"><i class="bx bx-gift"></i></div>
          <h4 class="title"><a href="">Nemo Enim</a></h4>
          <p class="description">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque</p>
        </div>

      </div>
    </div>

  </div>
</section><!-- End Why Us Section -->
  `
  let chartSummary = document.getElementById('char-summary')
  chartSummary.innerHTML = `
    
  <canvas id = "ctx2" width="50px" height="40px"></canvas>
  
  `
  let chartSummary1 = document.getElementById('char-summary-1')
  chartSummary1.innerHTML = `
    
  <canvas id = "ctx3" width="50px" height="40px"></canvas>
  
  `
  let chartSummary4 = document.getElementById('char-summary-4')
  chartSummary4.innerHTML = `
    
  <canvas id = "ctx4" width="50px" height="40px"></canvas>
  
  `
  let CTX2 = document.getElementById('ctx2').getContext('2d');
  let CTX3 = document.getElementById('ctx3').getContext('2d');
  let CTX4 = document.getElementById('ctx4').getContext('2d');
  char1(nPublisher, CTX2)
  char1(nPublisher, CTX3)
  char1(nPublisher, CTX4)
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
        <a href="#" data-toggle="modal" data-target="#exampleModal">
        <div type="button" class="footer-card" >
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
    console.log(key);
    labelsDoc.push(key)
  }
  for (const key in doc) {
    console.log(doc[key]);
    dataDoc.push(doc[key])
  }
  console.log(labelsDoc);
  console.log(dataDoc);
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