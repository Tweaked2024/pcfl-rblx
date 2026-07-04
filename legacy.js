/**
 * NBL - Legacy Portal Core Interface Script Logic
 */

// Global State Object
const state = {
    activeTab: 'leaderboard-view',
    modalElement: null
};

// Initialize interactive triggers on document load
document.addEventListener('DOMContentLoaded', () => {
    state.modalElement = document.getElementById('playerStatModal');
    setupTooltipInteractions();
});

/**
 * Handle Tab switching views inside the portal dashboard elements
 * @param {string} viewId - Target layout panel selector target
 */
function switchLegacyView(viewId) {
    // Hide all view panels
    const sections = document.querySelectorAll('.legacy-view-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Remove active styles from nav buttons
    const buttons = document.querySelectorAll('.legacy-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected view panel
    const targetSection = document.getElementById(viewId);
    if (targetSection) {
        targetSection.classList.add('active');
        state.activeTab = viewId;
    }

    // Mark current button active
    const evt = window.event;
    if (evt && evt.target) {
        evt.target.classList.add('active');
    }
}

/**
 * Wire up hover metrics tooltips across items to match layout structures
 */
function setupTooltipInteractions() {
    // Collect both podium cards and list rows
    const targets = document.querySelectorAll('.leaderboard-row-item, .podium-card');

    targets.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            // Read metrics values safely from element attributes
            const name = item.getAttribute('data-username');
            const bowls = item.getAttribute('data-bowls') || '0';
            const conf = item.getAttribute('data-conf') || '0';
            const mvp = item.getAttribute('data-mvp') || '0';
            const opoty = item.getAttribute('data-opoty') || '0';
            const allpro = item.getAttribute('data-allpro') || '0';
            const star = item.getAttribute('data-star') || '0';
            const badge = item.getAttribute('data-badge') || '0';
            const xp = item.getAttribute('data-xp') || '0';

            if (!name) return;

            // Map data items into the view panel UI elements
            document.getElementById('modalName').innerText = name;
            document.getElementById('statBowls').innerText = bowls;
            document.getElementById('statConf').innerText = conf;
            document.getElementById('statMvp').innerText = mvp;
            document.getElementById('statOpoty').innerText = opoty;
            document.getElementById('statAllPro').innerText = allpro;
            document.getElementById('statStar').innerText = star;
            document.getElementById('statBadge').innerText = badge;
            document.getElementById('modalTotalXp').innerText = `${xp} XP`;

            // Display floating box panel
            if (state.modalElement) {
                state.modalElement.style.display = 'block';
            }
        });

        item.addEventListener('mousemove', (e) => {
            if (!state.modalElement) return;
            // Position tooltip dynamically offset slightly right/down from screen cursor coordinates
            const offsetX = 15;
            const offsetY = 15;
            
            state.modalElement.style.left = `${e.clientX + offsetX}px`;
            state.modalElement.style.top = `${e.clientY + offsetY}px`;
        });

        item.addEventListener('mouseleave', () => {
            if (state.modalElement) {
                state.modalElement.style.display = 'none';
            }
        });
    });
}

/**
 * Custom click action handler to display specific user deep profile page elements
 * @param {string} username - Targeted account context parameters
 */
function navigateToProfile(username) {
    // Redirect logic to pull up deep user profiling components
    console.log(`Opening full profile/trophy deep view elements for: ${username}`);
    window.location.href = `profile.html?player=${encodeURIComponent(username)}`;
}
