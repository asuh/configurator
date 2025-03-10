import type { Material } from "@types";

interface MaterialProps {
  materials: Material[];
  selectedMaterial: string;
  handleMaterialChange: (newMaterial: string) => void
}

export default function Materials({
  materials,
  handleMaterialChange,
  selectedMaterial
} : MaterialProps) {
  return (
    <fieldset id="product-material" class="container product-material-container">
      <legend class="section-title">Choose your Material</legend>
      <div class="form-group">
        {materials.map(material => {
          return (
            <div key={material.Id} class="form-check">
                <label class="color form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input" 
                      name="optionsMaterial" 
                      id={`optionsMaterial${material.Name}`} 
                      value={selectedMaterial}
                      checked={selectedMaterial === material.Id}
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