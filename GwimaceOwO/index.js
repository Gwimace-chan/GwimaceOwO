import { openGUI } from './utils/overlay';
import { MESSAGES } from './utils/constants';
import './utils/testGUI.js';

  ChatLib.chat(`§d[GwimaceOWO] Module loaded`);
  
// Affirmation messages
const affirmations = [
    "Good pet~ *tail wags*",
    "Obedient kitten needs pets~",
    "Loyal pup awaits commands~",
    "Pretty collar suits you~",
    "Eager pet deserves rewards~",
    "Sweet subby kitty~",
    "Good girl knows her place~",
    "Deserving pup earns treats~",
    "Trained pet obeys commands~",
    "Deserving kitten needs praise~",
    "Good toys follow orders~",
    "Pretty pet deserves attention~",
    "Eager subby needs guidance~",
    "Obedient plaything~",
    "Devoted pet pleases owner~",
    "Sweet submissive awaits orders~"
];

let autoInterval = null;

// Core functionality
function showAffirmation() {
    const affirmation = affirmations[Math.floor(Math.random() * affirmations.length)];
    const message = `&d${affirmation}&r`;
    
    if(config.displayMode === 'title') {
        Client.showTitle(message, "", 5, 40, 5);
    } else {
        ChatLib.chat(message);
    }
}

function startAutoPraise() {
    if(autoInterval) autoInterval.unregister();
    autoInterval = register("step", () => {
        showAffirmation();
    }).setDelay(config.praiseInterval * 20);
}

// Command implementations
// Command handler with proper structure
const PRAISE_COMMANDS = new Set(["mode", "auto", "help"]);

register("command", (...args) => {
    if (!args[0]) {
        // Show help if no arguments are provided
        ChatLib.chat("&r&r&d&m-----------------------------------------------------");
        ChatLib.chat("          &d[GwimaceOwO] &f&aPraise Commands");
        ChatLib.chat("&d/gwimpraise mode &7- Toggle between title/chat display");
        ChatLib.chat("&d/gwimpraise auto [5-60] &7- Set auto-praise interval");
        ChatLib.chat("&d/gwimpraise help &7- Show this help menu");
        ChatLib.chat("&r&r&d&m-----------------------------------------------------");
        ChatLib.chat(`&7Current Mode: &a${config.displayMode}`);
        ChatLib.chat(`&7Auto-Praise: &a${config.autoPraise ? "ON" : "OFF"}`);
        ChatLib.chat(`&7Interval: &a${config.praiseInterval}s`);
        return;
    }

    const subcommand = args[0].toLowerCase();

    switch (subcommand) {
        case "mode":
            config.displayMode = config.displayMode === "title" ? "chat" : "title";
            ChatLib.chat(`&d[GwimaceOwO] &fDisplay mode set to: &a${config.displayMode.toUpperCase()}`);
            break;

        case "auto":
            if (args[1]) {
                const interval = Math.min(60, Math.max(5, parseInt(args[1])));
                if (isNaN(interval)) {
                    ChatLib.chat("&cPlease enter a valid number between 5-60!");
                    return;
                }
                config.praiseInterval = interval;
                config.autoPraise = true;
                startAutoPraise();
                ChatLib.chat(`&aAuto-praise enabled every ${interval} seconds`);
            } else {
                config.autoPraise = !config.autoPraise;
                ChatLib.chat(config.autoPraise ? 
                    "&aAuto-praise enabled!" : "&cAuto-praise disabled!");
                if (config.autoPraise) startAutoPraise();
                else if (autoInterval) autoInterval.unregister();
            }
            break;

        case "help":
            ChatLib.chat("&r&r&d&m-----------------------------------------------------");
            ChatLib.chat("          &d[GwimaceOwO] &f&aPraise Commands Help");
            ChatLib.chat("&d/gwimpraise mode &7- Toggle between title/chat display");
            ChatLib.chat("&d/gwimpraise auto [5-60] &7- Set auto-praise interval");
            ChatLib.chat("&d/gwimpraise help &7- Show this help menu");
            ChatLib.chat("&r&r&d&m-----------------------------------------------------");
            break;

        default:
            ChatLib.chat("&cUnknown subcommand! Valid commands: " + Array.from(PRAISE_COMMANDS).join(", "));
    }
}).setName("gwimpraise").setAliases("pk", "praisekink");


// Proper GUI command implementation
register("command", () => {
    openGUI();
	ChatLib.chat("&aOpened [GwimaceOWO] settings GUI!");
}).setName("gwim").setAliases("gwimace", "gwimaceowo");

register("command", () => {
    showAffirmation();
}).setName("Gwimaffirmation").setAliases("gwimOwO");

//ping command

register("command", () => {
    try {
        const host = "mc.hypixel.net";
        const ProcessBuilder = Java.type("java.lang.ProcessBuilder");

        // Run system ping command (works on Windows & Linux)
        let process = new ProcessBuilder(["ping", "-n", "1", host]).start();
        let reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));
        
        let line;
        let pingTime = "unknown";
        
        while ((line = reader.readLine()) !== null) {
            if (line.includes("time=") || line.includes("ms")) { 
                // Extracting ping time from response
                let match = line.match(/time[=<]([0-9]+)ms/);
                if (match) {
                    pingTime = match[1] + "ms";
                    break;
                }
            }
        }

        ChatLib.chat(`§d[GwimaceOWO] &aPing to ${host}: &b${pingTime}`);

    } catch (error) {
        ChatLib.chat(`§d[GwimaceOWO] &cError pinging Hypixel: ${error}`);
    }
}).setName("ping").setAliases("gwimping");
// Tps command
let lastTime = World.getTime();
let lastCheck = Date.now();
let estimatedTPS = 20; // Default to 20 TPS

register("step", () => {
    let currentTime = World.getTime();
    let currentCheck = Date.now();

    let tickDiff = currentTime - lastTime;
    let timeDiff = (currentCheck - lastCheck) / 1000; // Convert to seconds

    if (timeDiff > 0) {
        estimatedTPS = Math.min(20, (tickDiff / timeDiff));
    }

    lastTime = currentTime;
    lastCheck = currentCheck;
}).setDelay(1); // Runs every tick

register("command", () => {
    ChatLib.chat(`§d[GwimaceOwO] &aEstimated TPS: &b${estimatedTPS.toFixed(2)}`);
}).setName("tps").setAliases("gwimtps");
// freaky welcome messages
const welcomeMessages = [
    "Welcome back, kitten~",
    "Freak bob time~",
    "Loyal bottom frag reporting for duty~",
    "necron awaits you, don't keep him waiting~",
    "took you long enough to hop back on >:c",
    "The Porsche 911 GT2. The engineers knew exactly what their objective was: to make the new 911 GT2 RS the most powerful Porsche for the road. Objective achieved. The water-cooled six-cylinder bi-turbo Boxer engine with four-valve technology, variable turbine geometry (VTG) and VarioCam Plus delivers its power through the rear axle. From a displacement of 3,600 cm3, it generates an enormous 456 kW (620 hp) at an engine speed of 6,500 rpm. The maximum torque of 700 Nm is available from 2,250 rpm. From 0 to 100 km/h (62 mph) takes just 3.5 seconds. To 200 km/h (124 mph) only 9.8 seconds, and to 300 km/h (186 mph) just 28.9 seconds. Maximum boost pressure is not reached until a speed of 330 km/h (205 mph). The weight-to-power ratio that is essential for this kind of performance is just 2.21 kg/hp. A consistent supply of oil to the engine – even at high cornering speeds – is achieved using a dry sump lubrication system with a separate engine oil reservoir. The oil is cooled by an oil-water heat exchanger.",
    "Who's my good little coop member?~",
    "good dungeon nons get cuddles~",
    "Remember your place, bitch"
];
 const dotArt = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡘⢧⡀⠀⠀⢰⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠁⠀⠙⢦⡀⢸⡏⠻⢦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠃⠀⠀⠀⠀⠙⠺⡇⠀⠀⠙⠳⠦⡀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⣠⠤⢤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⡖⠶⠶⠒⠒⠒⠒⠓⠂⠀⠀⠀⠀⠀⠐⠒⠚⠛⠋⠉⠉⠉⠁⠀⠀⠀⠀⠉⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠙⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⢀⣠⣄⡀⠀⠀⠀⠀⢀⣠⣤⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⣸⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠀⠀⠀⣰⠏⢉⣼⣧⠀⠀⠀⢠⣿⣅⠀⠀⢹⡆⠀⠀⠀⠀⠀⠀⢠⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡯⠀⢸⣿⣿⠀⠀⠀⣾⣿⣿⠀⠀⠀⣷⠀⠀⠀⠀⠀⢀⡞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡴⠛⠁⢀⠈⠁⠀⢸⣿⣿⠀⠀⠀⢹⣿⣿⠀⠀⠀⠉⠀⠀⠀⠈⠛⢿⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡀⠀⠀⢸⣧⣴⣀⣄⠉⣁⠐⣳⢀⣨⣟⠋⠀⠀⣀⣴⣠⠀⠀⠀⢀⡼⠃⠀⠀⠀⢰⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⢶⡎⢳⣌⡉⠀⠀⠙⠻⣯⣉⢉⣿⠄⠀⠀⢉⣬⡿⠃⠀⠀⢾⡀⠀⠀⠀⠀⣸⠃⠙⠳⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣇⣀⡈⠙⠛⢳⡶⣤⣤⣭⣽⣭⡴⣶⠛⣿⣥⡄⢠⣤⣤⣼⡇⠀⡄⣾⠀⣿⠀⠀⠀⠀⠙⢦⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢰⡟⠛⠺⠷⢤⣤⣿⣿⣿⣤⡾⠟⣃⡿⠀⠀⠀⠀⠀⠀⠘⠃⡿⢀⡗⠀⠀⠀⠀⠀⠈⢻⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣆⠀⠀⠀⢸⣏⣌⡙⡇⠀⠀⠺⣦⠀⠀⠀⠀⠀⠀⣼⣄⠀⢸⡇⠀⠀⠀⠀⠀⠀⠀⠹⣇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢙⣷⠀⠀⠀⠛⠛⠛⠁⠀⠀⣾⠁⠀⠀⠀⠀⠀⢰⡟⢹⣆⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡏⠁⠀⠀⠀⠀⣤⠀⠀⠀⢰⣾⠀⠀⠀⠀⠀⣠⡟⠀⠀⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⡟⠛⠛⠀⣠⡟⠀⠀⠀⢸⢹⡄⠀⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡇⣿⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⣿⡇⠀⠀⠀⢸⠸⣇⣀⡴⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⢻⠀⡄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠀⠀⠀⣿⠀⠀⠀⠀⣿⠀⠻⣏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⢼⣰⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡶⠶⠛⠋⣿⠀⠀⢠⡏⠀⠀⠀⠀⡿⠀⠀⠙⢷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⢁⡿⠾⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⠿⠀⠀⠀⣿⠀⠀⣸⠃⠀⠀⠀⢠⡏⠀⠀⠀⠀⢹⡷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠟⠈⠁⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠰⣟⠁⠀⠀⠀⠀⢶⣿⠀⢠⡟⠀⠀⠀⠀⢸⠅⠀⠀⠀⠀⢻⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡾⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡾⠃⠀⠀⠀⠀⠘⣿⢀⡾⠁⠀⠀⠀⠀⣿⠀⠀⠀⠀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠿⢦⣄⡀⠀⠀⠀⠀⡏⣼⠃⠀⠀⠀⠀⢀⡿⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⢠⣄⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣴⠟⠓⠤⡀⠈⠹⣦⡀⠀⠐⣷⣷⡇⠀⢠⡄⠀⣼⣃⣀⣀⣀⠀⠀⡇⠀⠀⠀⠲⣄⡀⠀⠀⠀⣈⡽⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣠⠿⠅⣀⠀⠀⠈⠳⡄⠸⣧⠀⣠⡿⠿⢷⢤⣬⣿⡾⠛⠉⠉⠉⠉⠷⣴⡇⠀⠀⠀⠀⠈⠙⠛⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣠⡾⢁⡀⠀⠀⠑⢄⠀⠀⠸⣄⣿⠟⠉⠀⠀⠀⠀⠀⢸⣇⠤⠤⠦⠤⠤⢀⣹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢀⣴⠋⠀⠀⠈⠑⢄⠀⠀⢣⠀⣠⡟⠁⠀⠀⠀⠀⠀⠀⠀⢸⠇⠀⠀⠀⠀⠀⠀⠉⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢰⡏⣴⠉⠑⣢⣄⠀⠀⢳⣀⣴⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠈⠿⣏⠀⠀⢿⠀⣳⣤⡶⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣀⣀⡀⠀⠀⠀⠀⢹⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠋⠙⠛⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠉⠓⠢⣼⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣀⠀⣀⣀⡀⠀⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⢰⡇⠀⠀⢿⢑⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣷⣀⣤⣼⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀`;
register("gameLoad", () => {
    let randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    ChatLib.chat("&d[GwimaceOwO] &a" + randomMessage);
});
// gwim help command
register("command", () => {
    ChatLib.chat("&r&r&d&m-----------------------------------------------------");
    ChatLib.chat("          &d[GwimaceOwO] &f&aHelp List (Page 1/1)");
    ChatLib.chat("&d/gwimhelp &f- Show this help menu");
    ChatLib.chat("&d/owo &f- Open the settings GUI");
    ChatLib.chat("&d/Gwimaffirmation &f- Get a random affirmation");
    ChatLib.chat("&d/ping &f- Get your ping to Hypixel");
    ChatLib.chat("&d/tps &f- Check the current TPS (Ticks Per Second)");
    ChatLib.chat("&d/Gwimpraise &f[mode|auto] - Manage auto-praise settings");
    ChatLib.chat("&r&r&d&m-----------------------------------------------------");
}).setName("gwimhelp");




// Cleanup
register("gameUnload", () => {
    if(autoInterval) autoInterval.unregister();
    config.save();
});