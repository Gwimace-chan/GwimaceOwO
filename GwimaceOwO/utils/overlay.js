// utils/overlay.js
import { GUI_TEXTS, MESSAGES } from './constants';

const gui = new Gui();

// Draw GUI
gui.registerDraw((mouseX, mouseY) => {
    Renderer.drawRect(Renderer.color(30, 30, 30, 200), 100, 100, 200, 100);
    Renderer.drawString(GUI_TEXTS.TITLE, 110, 110);
    
    // Button
    Renderer.drawRect(Renderer.color(255, 105, 180), 120, 130, 160, 20);
    Renderer.drawString(GUI_TEXTS.BUTTON, 130, 135);
});

// Handle Clicks
gui.registerClicked((mouseX, mouseY) => {
    if (mouseX >= 120 && mouseX <= 280 && mouseY >= 130 && mouseY <= 150) {
        ChatLib.chat(MESSAGES.BUTTON_CLICK);
        gui.close();
    }
});

export function openGUI() {
    gui.open();
}