
register("command", () => { // Attempt to get the player's ping using the ChatTriggers API let ping = Player.getPing();

if (ping === undefined) {
    ping = "unknown";
}

ChatLib.chat(`&aYour ping is: &b${ping}ms`);
}).setName("ping").setAliases("gwimping");