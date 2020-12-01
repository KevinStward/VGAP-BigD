//var myChart = document.getElementById('myChart').getContext('2d');
//var content = document.getElementById('Content')

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


btnTodo.addEventListener('click', async (e) => {
    var content = document.getElementById('cards-for-games')

    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }

    const games = await GetGames()

    games.forEach(doc => {
        let van = doc.data()
        let colorGenre = getColorByGenre(van.Genre);
        var ratingShow = van.Rating == "" ? "N/A" : van.Rating;
        content.innerHTML += `
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
    });
})

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