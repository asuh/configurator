import type { Color } from "@types";

interface ColorProps {
  colors: Color[];
  selectedColor: string;
  handleColorChange: (newColor: string) => void
}

export default function Colors({
  handleColorChange,
  colors,
  selectedColor
} : ColorProps) {
  return (
    <fieldset id="product-color" class="container product-color-container">
      <legend class="section-title">Choose your Color</legend>
      <div class="form-group">
        {colors.map(color => {
          return (
            <div key={color.Id} class="form-check">
                <label class="color form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input visuallyhidden" 
                      name="optionsColor" 
                      id={`optionsColor${color.Id}`} 
                      value={selectedColor}
                      checked={selectedColor === color.Id}
                      onChange={() => handleColorChange(color.Id)}
                    />
                    <img class="form-image product-color" src={color.SwatchUrl} alt="Color" height="50" width="50" />
                </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}