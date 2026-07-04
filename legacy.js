document.addEventListener('DOMContentLoaded', () => {
    setupRowHoverUpdates();
    setupRowClickNavigation();
});

/**
 * Updates the locked right-side summary card on hover (instead of moving with the mouse cursor)
 */
function setupRowHoverUpdates() {
    const rows = document.querySelectorAll('.player-row');

    rows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            // Pull data values from attributes
            const name = row.getAttribute('data-username');
            const bowls = row.getAttribute('data-bowls');
            const conf = row.getAttribute('data-conf');
            const mvp = row.getAttribute('data-mvp');
            const opoty = row.getAttribute('data-opoty');
            const allpro = row.getAttribute('data-allpro');
            const star = row.getAttribute('data-star');
            const crowns = row.getAttribute('data-crowns');
            const badges = row.getAttribute('data-badges');
            const totalXp = row.getAttribute('data-xp');

            // Map variables directly to stationary layout card values
            document.getElementById('panelPlayerName').innerText = name;
            document.getElementById('lblBowls').innerText = bowls;
            document.getElementById('lblConf').innerText = conf;
            document.getElementById('lblMvp').innerText = mvp;
            document.getElementById('lblOpoty').innerText = opoty;
            document.getElementById('lblAllPro').innerText = allpro;
            document.getElementById('lblStar').innerText = star;
            document.getElementById('lblCrowns').innerText = crowns;
            document.getElementById('lblBadges').innerText = badges;
            document.getElementById('lblTotalXp').innerText = totalXp;
        });
    });
}

/**
 * Handles explicit target redirection on row selection
 * Yields query parameter URL schemes match: /alltime/trophy/?id=XXXXX&u=XXXXX
 */
function setupRowClickNavigation() {
    const rows = document.querySelectorAll('.player-row');

    rows.forEach(row => {
        row.addEventListener('click', () => {
            const playerId = row.getAttribute('data-id');
            const username = row.getAttribute('data-username');

            if (playerId && username) {
                // Formulate the path matching your browser context structure
                window.location.href = `/alltime/trophy/?id=${playerId}&u=${encodeURIComponent(username)}`;
            }
        });
    });
}
