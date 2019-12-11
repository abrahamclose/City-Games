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

    $root.append(makePage2());
}

$(function() {
    loadSportsPage();
});