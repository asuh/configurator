export default function Colors({data}) {
  const firstPosition = data.Positions[0];
  const firstMaterial = firstPosition.Materials[0];

  return (
    <fieldset id="product-color" class="container product-color-container col-xs-12 col-md-9">
      <legend class="section-title">Choose your Color</legend>
      <div class="form-group row">
          {firstMaterial.Colors.map(color => {
              return (
                  <div key={color.id} class="form-check col-xs-3 col-sm-3 col-md-6">
                      <label class="color form-check-label">
                          <input type="radio" class="form-check-input" name="optionsColor" id={`optionsColor${color.Id}`} value={color.Name} />
                          <img src={color.SwatchUrl} alt="Color" height="50" width="50" />
                      </label>
                  </div>
              );
          })}
      </div>
    </fieldset>
  );
}