// ============================================================
// File: utils/overlay.js
// Description: GUI overlay for GwimaceOwO mod.
// Handles rendering, mouse clicks, dragging (with smoothing),
// and opening/closing the GUI with debug messages.
// ============================================================

import { GUI_TEXTS, MESSAGES } from './constants';

// ---------------------------
// GLOBAL VARIABLES & CONFIGURATION
// ---------------------------
let gui = null;                       // The GUI object
let posX = 100, posY = 100;           // GUI position on screen (top-left corner)
let isDragging = false;               // Flag to track if the GUI is being dragged
let dragOffset = { x: 0, y: 0 };      // Mouse offset during dragging

// Configuration object for the GUI (and auto-praise settings)
let config = {
    autoPraise: false,               // Whether auto-praise is enabled
    displayMode: 'title',            // "title" or "chat" display mode for affirmations
    interval: 30                     // Praise interval in seconds
};

// ---------------------------
// FUNCTION: initializeGUI()
// Creates the GUI object and registers rendering and mouse handlers.
// ---------------------------
function initializeGUI() {
    gui = new Gui();
    ChatLib.chat("[GwimaceOwO] Debug: GUI initialized.");
    
    const scale = Renderer.screen.getScale();

    // REGISTER GUI RENDERING
    gui.registerDraw((mouseX, mouseY) => {
        // (1) Main Window Background (semi-transparent)
        Renderer.drawRect(Renderer.color(50, 50, 50, 180), posX * scale, posY * scale, 250 * scale, 160 * scale);

        // (2) Title Bar
        Renderer.drawRect(Renderer.color(255, 105, 180, 220), posX * scale, posY * scale, 250 * scale, 20 * scale);
        Renderer.drawString(GUI_TEXTS.TITLE, (posX + 10) * scale, (posY + 5) * scale).setColor(Renderer.WHITE).setShadow(true);

        // (3) Close Button
        Renderer.drawRect(Renderer.color(255, 80, 80, 255), (posX + 225) * scale, (posY + 3) * scale, 14 * scale, 14 * scale);
        Renderer.drawString("X", (posX + 228) * scale, (posY + 3) * scale).setColor(Renderer.WHITE).setShadow(true);

        // (4) Auto-Praise Toggle Button
        Renderer.drawRect(config.autoPraise ? Renderer.color(0, 255, 0, 255) : Renderer.color(255, 0, 0, 255),
            (posX + 20) * scale, (posY + 40) * scale, 30 * scale, 15 * scale);
        Renderer.drawString("Auto Praise:", (posX + 60) * scale, (posY + 43) * scale).setColor(Renderer.WHITE);

        // (5) Display Mode Toggle Button
        Renderer.drawRect(Renderer.color(255, 105, 180, 255), (posX + 20) * scale, (posY + 70) * scale, 30 * scale, 15 * scale);
        Renderer.drawString(`Display: ${config.displayMode}`, (posX + 60) * scale, (posY + 73) * scale).setColor(Renderer.WHITE);

        // (6) Interval Slider Background & Fill
        Renderer.drawRect(Renderer.color(100, 100, 100, 255), (posX + 20) * scale, (posY + 100) * scale, 200 * scale, 5 * scale);
        Renderer.drawRect(Renderer.color(255, 105, 180, 255), (posX + 20) * scale, (posY + 100) * scale, (config.interval / 60 * 200) * scale, 5 * scale);
        Renderer.drawString(`Interval: ${config.interval}s`, (posX + 20) * scale, (posY + 110) * scale).setColor(Renderer.WHITE);
    });

    // REGISTER CLICK HANDLING
    gui.registerClicked((mouseX, mouseY, button) => {
        const scale = Renderer.screen.getScale();
        const x = mouseX / scale, y = mouseY / scale;
        ChatLib.chat(`[GwimaceOwO] Debug: Click at (${x}, ${y})`);

        if (x >= posX && x <= posX + 250 && y >= posY && y <= posY + 20) {
            isDragging = true;
            dragOffset.x = x - posX;
            dragOffset.y = y - posY;
            ChatLib.chat("[GwimaceOwO] Debug: Drag started.");
        }

        if (x >= posX + 225 && x <= posX + 239 && y >= posY + 3 && y <= posY + 17) {
            gui.close();
            ChatLib.chat("[GwimaceOwO] Debug: GUI closed via close button.");
        }

        if (x >= posX + 20 && x <= posX + 50 && y >= posY + 40 && y <= posY + 55) {
            config.autoPraise = !config.autoPraise;
            ChatLib.chat(`[GwimaceOwO] Debug: Auto-praise toggled: ${config.autoPraise ? "ON" : "OFF"}`);
        }

        if (x >= posX + 20 && x <= posX + 50 && y >= posY + 70 && y <= posY + 85) {
            config.displayMode = config.displayMode === 'title' ? 'chat' : 'title';
            ChatLib.chat(`[GwimaceOwO] Debug: Display mode set to: ${config.displayMode.toUpperCase()}`);
        }

        if (x >= posX + 20 && x <= posX + 220 && y >= posY + 100 && y <= posY + 105) {
            const newInterval = Math.round(((x - (posX + 20)) / 200) * 60);
            config.interval = Math.min(60, Math.max(5, newInterval));
            ChatLib.chat(`[GwimaceOwO] Debug: Interval set to ${config.interval}s`);
        }
    });

    // REGISTER DRAG HANDLING (SMOOTHER)
    gui.registerMouseDragged((mouseX, mouseY, button) => {
        if (isDragging) {
            const scale = Renderer.screen.getScale();
            posX += ((mouseX / scale - dragOffset.x) - posX) * 0.2;
            posY += ((mouseY / scale - dragOffset.y) - posY) * 0.2;
            ChatLib.chat(`[GwimaceOwO] Debug: Dragging to (${posX.toFixed(2)}, ${posY.toFixed(2)})`);
        }
    });

    // REGISTER MOUSE RELEASE HANDLING
    gui.registerMouseReleased(() => {
        if (isDragging) {
            ChatLib.chat("[GwimaceOwO] Debug: Drag ended.");
        }
        isDragging = false;
    });
}

// ---------------------------
// FUNCTION: openGUI()
// Opens (or initializes) the GUI and centers it on screen.
// ---------------------------
export function openGUI() {
    try {
        if (!gui) {
            initializeGUI();
            ChatLib.chat("[GwimaceOwO] Debug: GUI initialized via openGUI().");
        }

        posX = (Renderer.screen.getWidth() / Renderer.screen.getScale() - 250) / 2;
        posY = (Renderer.screen.getHeight() / Renderer.screen.getScale() - 160) / 2;
        ChatLib.chat(`[GwimaceOwO] Debug: Centered GUI at (${posX}, ${posY})`);

        if (!gui.isOpen()) {
            gui.open();
            ChatLib.chat("[GwimaceOwO] Debug: GUI opened.");
        }
    } catch (error) {
        ChatLib.chat(`[GwimaceOwO] Debug: GUI Error: ${error}`);
    }
}
