const app = firebase.app();
const db = firebase.firestore();

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

export const makeScore = function(game, away_team, home_team) {
    $('.root').append(`
        <div class="tile is-parent">
            <article class="tile is-child box">
                <p class="title">${game.league}</p>
                <p class="title is-pulled-right">${game.date}</p>
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
    const query_games = gamesRef.where("home_team_id", "==", team_object.team_id).orderBy("date", "asc").limit(1);
    query_games.get()
        .then(game => {
            game.forEach(doc => {
                let data = doc.data();
                const query_teams = teamsRef.where("team_id", "==", data.away_team_id).limit(1);
                query_teams.get()
                    .then(teams => {
                        teams.forEach(doc => {
                            let away = doc.data();
                            makeScore(data, away, team_object);
                        })
                    });
            })
        });
}

export const loadSportsPage = function() {
    const $root = $('.root');

    getTeamsfromCity("Boston, Massachusetts");
}

$(function() {
    loadSportsPage();
});