// ===== CONFIG =====
const config = {
    owoMode: true, // Toggle OwO joke features
    showGUI: true, // Toggle the GUI
};

// ===== GUI SETUP =====
let guiVisible = false;
const guiStats = {
    coins: 0,
    farmingLevel: 0,
};

// Fetch REAL player coins from the purse
function getPurse() {
    const purseRegex = /Purse: (\d+(?:,\d+)*)/;
    const scoreboard = Scoreboard.getLines().map(line => line.getName());
    for (const line of scoreboard) {
        if (purseRegex.test(line)) {
            const coins = line.match(purseRegex)[1].replace(/,/g, '');
            return parseInt(coins);
        }
    }
    return 0; // Fallback if purse not found
}

// Fetch REAL farming level from Skyblock API
function getFarmingLevel() {
    const playerStats = Player.getSBProfile()?.stats;
    if (!playerStats) return 0;
    return playerStats.farming?.level || 0;
}

// Update GUI stats with real data
function updateStats() {
    guiStats.coins = getPurse();
    guiStats.farmingLevel = getFarmingLevel();
}

// ===== COMMANDS =====
// Toggle GUI with /gwim
register("command", () => {
    guiVisible = !guiVisible;
    updateStats();
    ChatLib.chat(`&4[GwimaceOwO] GUI ${guiVisible ? "&aEnabled" : "&cDisabled"}`);
}).setName("gwim");

// Random OwO joke command
register("command", () => {
    const owoJokes = [
        "OwO! You have &6${guiStats.coins.toLocaleString()} coins&f! *nuzzles*",
        "Nya~! Farming level &a${guiStats.farmingLevel}&f? So cute!",
        "ÒwÓ Someone’s been grinding crops!"
    ];
    const joke = owoJokes[Math.floor(Math.random() * owoJokes)];
    ChatLib.chat(`&d[GwimaceOwO] &f${joke}`);
}).setName("gwimaceowo");

// ===== GUI RENDER =====
register("renderOverlay", () => {
    if (guiVisible && config.showGUI) {
        RenderLib.fill(100, 100, 200, 150, 0x80000000); // Background
        RenderLib.text("&4GwimaceOwO Stats", 110, 110);
        RenderLib.text(`&7Coins: &6${guiStats.coins.toLocaleString()}`, 110, 130);
        RenderLib.text(`&7Farming: &aLevel ${guiStats.farmingLevel}`, 110, 150);
        RenderLib.text("&d>w<", 250, 120); // OwO decoration
    }
});

// ===== SKYBLOCK UTILITIES =====
// Detect REAL coin gain (e.g., from killing mobs)
register("chat", (coins, event) => {
    if (config.owoMode) {
        ChatLib.chat(`&d[GwimaceOwO] &fNya~! You got &6${coins}&f coins! *purrs*`);
    }
}).setCriteria("+${coins} coins!");

// ===== OWO CHAT TRANSLATOR =====
register("chat", (message, event) => {
    if (config.owoMode) {
        let owoMessage = message
            .replace(/[rl]/g, 'w')
            .replace(/\!/g, '! >w<')
            .replace(/\?/g, '? OwO');
        ChatLib.chat(owoMessage);
        cancel(event);
    }
}).setCriteria("${message}");