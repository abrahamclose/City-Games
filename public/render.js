export const makePage = function() {
    return `
    <div class="main-page">
        <h1 class="logo">SportsCity</h1>
        <h1 class="city-choice">City:</h1>
        <h2><a href="citySelector.html">Reset City</a></h2>
        <h1 class="nba">Latest NBA Score:</h1>
        <h1 class="nfl">Latest NFL Score:</h1>
        <h1 class="nhl">Latest NHL Score:</h1>
        <h1 class="mlb">Latest MLB Score:</h1>
    </div>`;
};

export const makePageWithEnterCity = function() {
    return `
    <div class="main-page">
        <button class="reset-city" type="button">Reset City</button>
        <h1 class="logo">SportsCity</h1>
        <h1 class="enter-city">Enter City:</h1>
        <textarea class="input" id="cityTextArea"></textarea>
        <br/>
        <button class="submit-new-city" type="button">Submit</button>
        <h1 class="nba">Latest NBA Score:</h1>
        <h1 class="nfl">Latest NFL Score:</h1>
        <h1 class="nhl">Latest NHL Score:</h1>
        <h1 class="mlb">Latest MLB Score:</h1>
    </div>`;
};

export const loadSportsPage = function() {
    const $root = $('.root');

    //Later, we can add a parameter to pass into our makePage function to load the correct scores
    $root.append(makePage());
    $root.on("click", '.reset-city', function(){
        $root.empty();
        $root.append(makePageWithEnterCity);
    });
    $root.on("click", '.submit-new-city', function(){
        $root.empty();
        $root.append(makePage);
    });
}

$(function() {
    loadSportsPage();
});