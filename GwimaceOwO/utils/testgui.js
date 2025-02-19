// File: utils/testGUI.js
import {
    // Import the required Vigilance decorators and utilities
    @Vigilant,
    @ButtonProperty,
    @SwitchProperty,
    @SliderProperty,
    @TextProperty
} from "../Vigilance/index";

@Vigilant("TestGUI", "§dTestGUI", {
    // Optional: Order the categories if needed
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Advanced"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class TestGUIConfig {
    constructor() {
        // Initialize the configuration so that Vigilance builds the GUI
        this.initialize(this);
    }

    @ButtonProperty({
        name: "Test Button",
        description: "A simple test button that displays a chat message.",
        category: "General"
    })
    testButton() {
        ChatLib.chat("&a[TestGUI] Button clicked!");
    }

    @SwitchProperty({
        name: "Test Switch",
        description: "A simple test switch.",
        category: "General"
    })
    testSwitch = false;

    @SliderProperty({
        name: "Test Slider",
        description: "A simple test slider (0 to 100).",
        category: "General",
        min: 0,
        max: 100
    })
    testSlider = 50;

    @TextProperty({
        name: "Test Text",
        description: "A simple text input property.",
        category: "Advanced",
        placeholder: "Enter some text..."
    })
    testText = "";
}

export default new TestGUIConfig();
