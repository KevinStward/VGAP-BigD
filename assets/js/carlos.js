//var myChart = document.getElementById('myChart').getContext('2d');
//var content = document.getElementById('Content')
let cardContent = document.getElementById('cards-for-games')

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

const GetGames = () => firestore.collection("BaseGames").get();

const GetWhere = (Genre) => firestore.collection("BaseGames").where('Genre', '==', Genre).get();

//Tihs start the platform
btnTodo.addEventListener('click', async (e) => {
  let summaryContent = document.getElementById('summary-content')
  deleteElemtos(cardContent)

  const games = await GetGames()
  games.forEach(doc => {
    let van = doc.data()
    generateCard(van);
  });
})
summaryGtaph();
async function summaryGtaph(){
  let chartSummary = document.getElementById('char-summary')
  const games = await GetGames()
  games.forEach(doc => {
    let van = doc.data()
    console.log(van)
  });

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
        <div class="icon"><i class="bx bxl-dribbble"></i></div>
        <div class="header-card">
          <h4 class="title-moderna"><a href="">${van.Name}</a></h4>
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
function char(doc, ctx) {
  var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['EU_Sales', 'NA_Sales', 'JP_Sales', 'Other_Sales'],
      datasets: [{
        label: `# de ventas de ${doc.data().Name}`,
        data: [doc.data().EU_Sales, doc.data().NA_Sales, doc.data().JP_Sales, doc.data().Other_Sales],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 169, 90, 1.5)',
          'rgba(255, 0, 90, 2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 169, 90, 1)'
        ],
        borderWidth: 1
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