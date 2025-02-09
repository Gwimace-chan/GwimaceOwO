import { @Vigilant, @SwitchProperty, @SliderProperty, @TextProperty } from "Vigilance";

@Vigilant("GwimaceSettings")
class Settings {
  @SwitchProperty({
    name: "Enable Feature",
    description: "Toggle this feature on or off.",
    category: "General",
  })
  enableFeature = true;

  @SliderProperty({
    name: "Feature Intensity",
    description: "Adjust the intensity of the feature.",
    category: "General",
    min: 1,
    max: 10,
  })
  featureIntensity = 5;

  @TextProperty({
    name: "Custom Message",
    description: "Set a custom message for the command.",
    category: "Customization",
  })
  customMessage = "Hello, Gwimace!";
}

export default new Settings();
