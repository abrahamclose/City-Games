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

    $root.append(makePage());
}

$(function() {
    loadSportsPage();
});