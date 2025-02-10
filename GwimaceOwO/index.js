// ===== CONFIG =====
const config = {
    owoMode: true, // Toggle OwO features globally
    showGUI: true, // Toggle the GUI
};

let guiVisible = false;

// ===== OWO MODE TOGGLE =====
register("command", () => {
    config.owoMode = !config.owoMode;
    ChatLib.chat(`&d[GwimaceOwO] &fOwO mode: ${config.owoMode ? "&aEnabled >w<" : "&cDisabled :c"}`);
}).setName("owo").setAliases("owomode");

// ===== GUI RENDER =====
register("renderOverlay", () => {
    if (guiVisible && config.showGUI) {
        // Draw background
        RenderLib.fill(100, 100, 200, 150, 0x80000000); // x, y, width, height, color
        
        // Draw stats
        RenderLib.text("&4GwimaceOwO Stats", 110, 110);
        RenderLib.text("&7Coins: &6" + getPurse().toLocaleString(), 110, 130);
        RenderLib.text("&7Farming: &aLevel " + getFarmingLevel(), 110, 150);
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

// ===== OWO CHAT TRANSLATOR (ONLY FOR OTHER PLAYERS) =====
register("chat", (event) => {
    if (config.owoMode && !Player.getPlayer().getName().equals(event.sender)) {
        let message = ChatLib.getChatMessage(event);
        message = message
            .replace(/[rl]/g, 'w')
            .replace(/\!/g, '! >w<')
            .replace(/\?/g, '? OwO');
        cancel(event);
        ChatLib.chat(`${event.sender}: ${message}`);
    }
}).setCriteria("${message}");

// ===== OWO ITEM NAME MODIFIER =====
register("renderItemOverlay", (item, x, y) => {
    if (config.owoMode && item) {
        const originalName = item.getName();
        const owoName = originalName
            .replace(/Giant/gi, "Gwiant") // "Giant's Sword" → "Gwiant's Sword"
            .replace(/sword/gi, "sword OwO") // Add OwO to swords
            .replace(/pickaxe/gi, "pickaxe UwU"); // Add UwU to pickaxes
        
        // Render modified name
        RenderLib.drawString(owoName, x, y - 10, 0xFFFFFF, false, 1, true);
    }
});

// ===== GUI TOGGLE COMMAND =====
register("command", () => {
    guiVisible = !guiVisible;
    ChatLib.chat(`&4[GwimaceOwO] GUI ${guiVisible ? "&aEnabled" : "&cDisabled"}`);
}).setName("gwim");