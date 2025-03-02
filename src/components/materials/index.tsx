interface Material {
  materials: Material[];
  selectedMaterial: string;
  Id: string;
  Name: string;
  SwatchUrl: string;
  handleMaterialChange: (newMaterial: string) => void
}

export default function Materials({
  materials,
  handleMaterialChange,
  selectedMaterial
} : Material) {
  return (
    <fieldset id="product-material" class="container product-material-container col-xs-12 col-md-3">
      <legend class="section-title">Choose your Material</legend>
      <div class="form-group row">
        {materials.map(material => {
          return (
            <div key={material.Id} class="form-check col-md-6">
                <label class="color form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input" 
                      name="optionsMaterial" 
                      id={`optionsMaterial${material.Name}`} 
                      value={selectedMaterial} 
                      onChange={() => handleMaterialChange(material.Id)}
                    />
                    {material.Name}
                </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}