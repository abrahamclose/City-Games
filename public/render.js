const app = firebase.app();
const db = firebase.firestore();
let availableTags = [
    "St. Petersburg, Florida",
    "San Diego, California",
    "Milwaukee, Wisconsin",
    "Miami, Florida",
    "Oklahoma City, Oklahoma",
    "Salt Lake City, Utah",
    "San Francisco, California",
    "Phoenix, Arizona",
    "Sacramento, California",
    "Memphis, Tennessee",
    "San Antonio, Texas",
    "Orchard Park, New York",
    "Miami Gardens, Florida",
    "Baltimore, Maryland",
    "Cleveland, Ohio",
    "Indianapolis, Indiana",
    "Jacksonville, Florida",
    "Kansas City, Missouri",
    "Oakland, California",
    "Arlington, Texas",
    "East Rutherford, New Jersey",
    "Landover, Maryland",
    "Green Bay, Wisconsin",
    "Minneapolis, Minnesota",
    "Charlotte, North Carolina",
    "New Orleans, Louisiana",
    "Glendale, Arizona",
    "Santa Clara, California",
    "Boston, Massachusetts",
    "Buffalo, New York",
    "Detroit, Michigan",
    "Sunrise, Florida",
    "Ottawa, Ontario",
    "Tampa, Florida",
    "Raleigh, North Carolina",
    "Newark, New Jersey",
    "Philadelphia, Pennsylvania",
    "Pittsburgh, Pennsylvania",
    "Denver, Colorado",
    "Dallas, Texas",
    "St. Louis, Missouri",
    "Winnipeg, Manitoba",
    "Anaheim, California",
    "Calgary, Alberta",
    "Edmonton, Alberta",
    "Vancouver, British Columbia",
    "Paradise, Nevada",
    "Atlanta, Georgia",
    "Chicago, Illinois",
    "Cincinnati, Ohio",
    "Columbus, Ohio",
    "Washington, D.C.",
    "Fort Lauderdale, Florida",
    "Montreal, Quebec",
    "Foxborough, Massachusetts",
    "New York City, New York",
    "Harrison, New Jersey",
    "Orlando, Florida",
    "Chester, Pennsylvania",
    "Toronto, Ontario",
    "Commerce City, Colorado",
    "Frisco, Texas",
    "Houston, Texas",
    "Carson, California",
    "Los Angeles, California",
    "Saint Paul, Minnesota",
    "Nashville, Tennessee",
    "Portland, Oregon",
    "Sandy, Utah",
    "San Jose, California",
    "Seattle, Washington",
    "Kansas City, Kansas",
    "Vancouver, British Columbia"
    ];

export const makePage = function() {
    return `
        <section class="section">
            <div class="container">
                <div class="content">
                    <h1 id="section_title" class="title"></h1>
                    <div class="tile is-ancestor">
                    <div id="tile_master" class="tile is-vertical"></div>
                    </div>
                </div>
            </div>
        </section>
        `;
};

export const makeScore = function(game, away_team, home_team) {
    $('#section_title').text(home_team.city);
    $('#tile_master').append(`
        <div class="tile is-parent">
            <article class="tile is-child box">
                <p class="title">${game.date}</p>
                <p class="subtitle">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-48x48"><img src="${away_team.icon}"></p>
                    </figure>
                    <div class="media-content">
                        <div class="content"><p>${away_team.name}</p></div>
                    </div>
                    <p class="title is-pulled-right">${game.away_score}</p>
                </article>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-48x48"><img src="${home_team.icon}"></p>
                    </figure>
                    <div class="media-content">
                        <div class="content"><p><br>${home_team.name}</p></div>
                    </div>
                    <p class="title is-pulled-right">${game.home_score}</p>
                </article>
                </p>
            </article>
        </div>
    `);
}

export const makeScore2 = function (game, away_team, home_team) {
    $('#section_title').text(away_team.city);
    $('#tile_master').append(`
        <div class="tile is-parent">
            <article class="tile is-child box">
                <p class="title">${game.date}</p>
                <p class="subtitle">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-48x48"><img src="${away_team.icon}"></p>
                    </figure>
                    <div class="media-content">
                        <div class="content"><p>${away_team.name}</p></div>
                    </div>
                    <p class="title is-pulled-right">${game.away_score}</p>
                </article>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-48x48"><img src="${home_team.icon}"></p>
                    </figure>
                    <div class="media-content">
                        <div class="content"><p><br>${home_team.name}</p></div>
                    </div>
                    <p class="title is-pulled-right">${game.home_score}</p>
                </article>
                </p>
            </article>
        </div>
    `);
}

export const makeBanner = function () {
    return `<div id="navbar">
        <button class="button is-google" onclick="googleLogin()"> 
          <span class="icon">
            <i class="fab fa-google"></i>
          </span>
          <span>Sign in with Google</span>
        </button>
        <div class="search-container">
            <form autocomplete="off">
              <div class="autocomplete">
                <label for="tags">City (or State in some cases): </label>
                <input id="myInput" class="input" type="text" placeholder="Search for cities" name="search" size="100">
              </div>
            </form>
            <button class="sButton" type="button" id="sButton">Search</button>
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

export const getTeamsfromCity = function(cityName) {
    const teamsRef = db.collection("Teams");
    const query_teams = teamsRef.where("city", "==", cityName);
    query_teams.get()
        .then(teams => {
            teams.forEach(doc => {
                getHomeGamesFromTeams(doc.data());
            })
        });
}

export const getHomeGamesFromTeams = function (team_object) {
    console.log(team_object.team_id);
    
    const gamesRef = db.collection("Games");
    const teamsRef = db.collection("Teams");
    const query_games = gamesRef.where("home_team_id", "==", team_object.team_id).where("date", ">=", "12/05").orderBy("date", "desc").limit(1);
    query_games.get()
        .then(game => {
            game.forEach(doc => {
                let data = doc.data();
                console.log(data.game_id)
                const query_teams = teamsRef.where("team_id", "==", data.away_team_id).limit(5);
                query_teams.get()
                    .then(teams => {
                        teams.forEach(doc => {
                            let away = doc.data();
                            makeScore(data, away, team_object);
                        })
                    });
            })
        });
    const query_away_games = gamesRef.where("away_team_id", "==", team_object.team_id).where("date", ">=", "12/05").orderBy("date", "desc").limit(1);
    query_away_games.get()
        .then(game => {
            game.forEach(doc => {
                let data = doc.data();
                console.log(data.game_id)
                const query_teams = teamsRef.where("team_id", "==", data.home_team_id).limit(5);
                query_teams.get()
                    .then(teams => {
                        teams.forEach(doc => {
                            let away = doc.data();
                            makeScore2(data, team_object, away);
                        })
                    });
            })
        });
}

export const loadSportsPage = function () {
    const $root = $('.root');
    $root.append(makeBanner());
    $root.append(makePage());
    // $('root').on("click", ".sButton", function(event) {
    //     event.preventDefault();
    //     console.log(input);
    //     let input = $('input').val();
    //     getTeamsfromCity(input);
    // });
    // document.getElementsByClassName("sButton").addEventListener("click", function(e) {
    //     console.log("this runs")
    // });
    $(document).ready(function () {
        $(document).on('click', ".sButton", function () {
            let input = $('input').val();
            console.log(input);
            getTeamsfromCity(input);
        });
    });
    // $(document).ready(function() {
    //     $('sButton').click( function() {
    //         let input = $('input').val();
    //         console.log(input);
    //         getTeamsfromCity(input);
    //     });
    // });
    $(document).ready(function () {
        $('input').keyup(debounce(function () {
            let input = $('input').val();
            let x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                x[i].parentNode.removeChild(x[i])
            }
            let vList = document.createElement("DIV");
            vList.setAttribute("id", this.id + "autocomplete-list");
            vList.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(vList);
            let count = 0
            for (let i = 0; i < availableTags.length; i++) {
                if (availableTags[i].substr(0, input.length).toUpperCase() == input.toUpperCase()) {
                    count++;
                    let validCountry = document.createElement("DIV");
                    validCountry.innerHTML = "<strong>" + availableTags[i].substr(0, input.length) + "</strong>"
                    validCountry.innerHTML += availableTags[i].substr(input.length);
                    validCountry.innerHTML += "<input type='hidden' value='" + input[i] + "'>"
                    validCountry.addEventListener("click", function (e) {
                        $('input').val(availableTags[i]);

                        let y = document.getElementsByClassName("autocomplete-items");
                        for (let i = 0; i < y.length; i++) {
                            y[i].parentNode.removeChild(y[i])
                        }
                    });
                    vList.appendChild(validCountry);
                }
                if (count > 5) {
                    break;
                }
            }
        }, 500));
    });
}

$(function () {
    loadSportsPage();
});
