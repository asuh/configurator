export default function Colors({
  handleColorChange,
  colors,
  selectedColor
}) {
  return (
    <fieldset id="product-color" class="container product-color-container col-xs-12 col-md-9">
      <legend class="section-title">Choose your Color</legend>
      <div class="form-group row">
        {colors.map(color => {
          return (
            <div key={color.Id} class="form-check col-xs-3">
                <label class="color form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input" 
                      name="optionsColor" 
                      id={`optionsColor${color.Id}`} 
                      value={selectedColor}
                      onChange={handleColorChange}
                    />
                    <img src={color.SwatchUrl} alt="Color" height="50" width="50" />
                </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}