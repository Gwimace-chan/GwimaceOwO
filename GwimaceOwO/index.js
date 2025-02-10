// ===== CONFIG =====
const config = {
    owoMode: true, // Toggle OwO features globally
    showGUI: true, // Toggle the GUI
};

let guiVisible = false;
const playerName = Player.getName(); // Get the player's username

// ===== OWO MODE TOGGLE =====
register("command", () => {
    config.owoMode = !config.owoMode;
    ChatLib.chat(`&d[GwimaceOwO] &fOwO mode: ${config.owoMode ? "&aEnabled >w<" : "&cDisabled :c"}`);
}).setName("owo").setAliases("owomode", "gwimaceowo");

// ===== CUSTOM GUI RENDER (NO RenderLib) =====
register("renderOverlay", () => {
    if (guiVisible && config.showGUI) {
        const coins = getPurse().toLocaleString();
        const farmingLevel = getFarmingLevel();

        // Draw background box
        Renderer.drawRect(Renderer.color(0, 0, 0, 100), 100, 100, 200, 150);

        // Draw text
        Renderer.drawString("§4GwimaceOwO Stats", 110, 110);
        Renderer.drawString(`§7Coins: §6${coins}`, 110, 130);
        Renderer.drawString(`§7Farming: §aLevel ${farmingLevel}`, 110, 150);
    }
});

// ===== REAL COIN/FARMING LEVEL DETECTION =====
function getPurse() {
    const purseLine = Scoreboard.getLines().find(line => line.getName().includes("Purse:"));
    return purseLine ? parseInt(purseLine.getName().replace(/[^0-9]/g, '')) : 0;
}

function getFarmingLevel() {
    const profile = Player.getSBProfile();
    return profile?.stats?.farming?.level || 0;
}

// ===== OWO CHAT TRANSLATOR =====
register("chat", (event) => {
    if (config.owoMode) {
        const message = ChatLib.getChatMessage(event);
        const sender = ChatLib.getChatSender(event);

        // Skip the player's own messages
        if (sender === playerName) return;

        // Preserve color codes and UwU-ify
        const translated = message
            .replace(/[rl]/g, 'w')
            .replace(/\!/g, '! >w<')
            .replace(/\?/g, '? OwO');

        cancel(event);
        ChatLib.chat(`${sender}: ${translated}`);
    }
}).setCriteria("${message}");

// ===== OWO ITEM NAME MODIFIER =====
register("renderItemOverlay", (item, x, y) => {
    if (config.owoMode && item) {
        const originalName = item.getName();
        const owoName = originalName
            .replace(/Giant/gi, "Gwiant")
            .replace(/sword/gi, "sword OwO");
        
        // Draw modified name above the item
        Renderer.drawString(owoName, x, y - 10, false, 1);
    }
});

// ===== GUI TOGGLE COMMAND =====
register("command", () => {
    guiVisible = !guiVisible;
    ChatLib.chat(`&4[GwimaceOwO] GUI ${guiVisible ? "&aEnabled" : "&cDisabled"}`);
}).setName("gwim").setAliases("gwimace");