let availableTags = [
    "Atlanta",
    "Miami",
    "New York",
    "Philadelphia",
    "Washington",
    "Chicago",
    "Cincinnati",
    "Milwaukee",
    "Pittsburgh",
    "St. Louis",
    "Arizona",
    "Colorado",
    "Los Angeles",
    "San Diego",
    "San Francisco",
    "Baltimore",
    "Boston",
    "Tampa Bay",
    "Toronto",
    "Chicago",
    "Cleveland",
    "Detroit",
    "Kansas City",
    "Minnesota",
    "Houston",
    "Los Angeles",
    "Oakland",
    "Seattle",
    "Texas",
    "Dallas",
    "Buffalo",
    "Carolina",
    "Denver",
    "Green Bay",
    "Indianapolis",
    "Jacksonville",
    "New England",
    "New Orleans",
    "Tennessee",
    "Brooklyn",
    "Charlotte",
    "Golden State",
    "Indiana",
    "Memphis",
    "Oklahoma City",
    "Orlando",
    "Phoenix",
    "Portland",
    "Sacramento",
    "San Antonio",
    "Utah",
    "Anaheim",
    "Calgary",
    "Columbus",
    "Edmonton",
    "Florida",
    "Montreal",
    "Nashville",
    "New Jersey",
    "Ottawa",
    "San Jose",
    "Vancouver",
    "Vegas",
    "Winnipeg"
  ];

export const makePage = function() {
    return `
        <div class="tile is-ancestor">
            <div class="tile is-parent">
            <article class="tile is-child box">
                <p class="title">Hello World</p>
                <p class="subtitle">What is up?</p>
                <div class="content">
                </div>
            </article>
            </div>
            <div class="tile is-parent">
            <article class="tile is-child box">
                <p class="title">Foo</p>
                <p class="subtitle">Bar</p>
                <div class="content">
                </div>
            </article>
            </div>
        </div>
        `;
};

export const makeBanner = function() {
    return `<div id="navbar">
        <button class="button is-google" onclick="googleLogin()"> 
          <span class="icon">
            <i class="fab fa-google"></i>
          </span>
          <span>Sign in with Google</span>
        </button>
        <div class="search-container">
            <form autocomplete="off" action="/action_page.php">
              <div class="autocomplete">
                <label for="tags">City (or State in some cases): </label>
                <input id="myInput" class="input" type="text" placeholder="Search for cities" name="search" size="100">
              </div>
              <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </div>
      </div>`;
}

export const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer) ;
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

export const loadSportsPage = function() {
    const $root = $('.root');
    const app = firebase.app();
    const db = firebase.firestore();
    const teamsRef = db.collection("Teams");
    const gamesRef = db.collection("Games");

    const query_teams = teamsRef.where("city", "==", "Boston, Massachusetts");
    let relevant_teams = [];
    
    query_teams.get()
        .then(teams => {
            teams.forEach(doc => {
                let data = doc.data();
                const query_games = teamsRef.where("home_team_id", "==", data.team_id)
                    .orderBy("date", "asc")
                query_games.get()
                    .then(games => {
                        games.forEach(doc => {
                            let data = doc.data();
                            console.log(dat)
                        });
                    });

            });
        });

    console.log(relevant_teams);
    let relevant_games = [];
    relevant_teams.forEach(elm => {
        console.log(elm.team_id);
        const query_games = teamsRef.where("home_team_id", "==", elm.team_id);
        query_games.get()
            .then(games => {
                games.forEach(doc => {
                    let data = doc.data();
                    relevant_games.push(data);
                });
            });
    })

    console.log(relevant_games);
    $root.append(makeBanner())
    $(document).ready(function() {
        $('input').keyup(debounce( function() {
            let input = $('input').val();
            console.log(input);
            let x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++)
            {
                x[i].parentNode.removeChild(x[i])
            }
            let vList = document.createElement("DIV");
            vList.setAttribute("id", this.id + "autocomplete-list");
            vList.setAttribute("class", "autocomplete-items"); 
            this.parentNode.appendChild(vList);
            let count = 0
            for (let i = 0; i < availableTags.length; i++)
            {
                count++;
                if (availableTags[i].substr(0, input.length).toUpperCase() == input.toUpperCase())
                {
                    let validCountry = document.createElement("DIV");
                    validCountry.innerHTML = "<strong>" + availableTags[i].substr(0, input.length) + "</strong>"
                    validCountry.innerHTML += availableTags[i].substr(input.length);
                    validCountry.innerHTML += "<input type='hidden' value='" + input[i] + "'>"
                    validCountry.addEventListener("click", function(e) {
                        input.value = this.getElementsByTagName("input")[0].value;

                        let y = document.getElementsByClassName("autocomplete-items");
                        for (let i = 0; i < y.length; i++)
                        {
                            y[i].parentNode.removeChild(y[i])
                        }
                    });
                    vList.appendChild(validCountry);
                }
                if (count >5)
                {
                    break;
                }
            }
        }, 500));
    });
    $root.append(makePage());
}

$(function() {
    loadSportsPage();
});