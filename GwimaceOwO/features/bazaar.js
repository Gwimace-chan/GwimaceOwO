// features/bazaar.js
import request from "request";

const API_URL = "https://api.hypixel.net/skyblock/bazaar";

// Command to fetch Bazaar data
register("command", (item) => {
    if (!item) {
        ChatLib.chat("&cUsage: /gwimbz <item>");
        return;
    }
    
    fetchBazaarData(item.toUpperCase());
}).setName("gwimbz").setAliases("gwimbazaar");

function fetchBazaarData(item) {
    request({ url: API_URL, json: true }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            ChatLib.chat("&cFailed to fetch Bazaar data!");
            return;
        }

        if (!body.products[item]) {
            ChatLib.chat("&cItem not found in the Bazaar!");
            return;
        }

        const sellPrices = body.products[item].sell_summary.map(s => s.pricePerUnit);
        const buyPrices = body.products[item].buy_summary.map(b => b.pricePerUnit);

        const avgSellPrice = calculateAverage(sellPrices);
        const avgBuyPrice = calculateAverage(buyPrices);

        ChatLib.chat(`&a[GwimBazaar] &f${item}:`);
        ChatLib.chat(`&aAverage Sell Price (3d): &6${avgSellPrice.toFixed(2)} coins`);
        ChatLib.chat(`&aAverage Buy Price (3d): &6${avgBuyPrice.toFixed(2)} coins`);
    });
}

function calculateAverage(prices) {
    if (prices.length === 0) return 0;
    return prices.reduce((sum, price) => sum + price, 0) / prices.length;
}
