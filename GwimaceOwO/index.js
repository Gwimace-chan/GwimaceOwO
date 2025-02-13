import { openGUI } from './utils/overlay';
import { MESSAGES } from './utils/constants';

// Register Command
register("command", () => {
    openGUI();
}).setName("owo").setAliases("gwimace", "gwimaceowo");

// Load message
register("gameLoad", () => {
    ChatLib.chat("&d[GwimaceOwO] &fModule loaded! >w<");
});

let owoEnabled = false;

// Improved owoify with better transformations
function owoify(text) {
    return text
        .replace(/[rl]/gi, 'w')
        .replace(/(th|the)/gi, (match) => 
            match.toLowerCase() === 'the' ? 'da' : 'd'
        )
        .replace(/\b(n)([aeiou])/gi, '$1y$2')
        .replace(/!+/g, () => ` ${["OwO", "UwU", ">w<", "^w^"][Math.floor(Math.random()*4)]}`)
        .replace(/(\b[a-z])/gi, (match) => 
            Math.random() < 0.3 ? `${match}-${match.toLowerCase()}` : match
        );
}

// Toggle command
register("command", () => {
    owoEnabled = !owoEnabled;
    ChatLib.chat(`&d[GwimaceOwO] &fOwo mode ${owoEnabled ? "&aenabled" : "&cdisabled"}`);
}).setName("owotoggle").setAliases("owomode", "toggleowo");

// Modified chat event handler for incoming messages
register("chat", (event) => {
    if (owoEnabled) {
        const originalMessage = ChatLib.getChatMessage(event);
        const transformed = owoify(originalMessage);
        
        event.cancel(); // Cancel original message
        ChatLib.chat(transformed); // Post modified message
    }
});