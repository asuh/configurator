export default function Materials({data}) {
  const firstMaterial = data.Positions[0];

  return (
    <fieldset id="product-material" class="container product-material-container col-xs-12 col-md-9">
      <legend class="section-title">Choose your Material</legend>
      <div class="form-group row">
          {firstMaterial.Materials.map(material => {
              return (
                  <div key={material.id} class="form-check col-xs-3 col-sm-3 col-md-6">
                      <label class="color form-check-label">
                          <input type="radio" class="form-check-input" name="optionsMaterial" id={`optionsMaterial${material.Name}`} value={material.Id} />
                          <img src={material.ImageUrl} alt="Material" height="50" width="50" />
                      </label>
                  </div>
              );
          })}
      </div>
    </fieldset>
  );
}