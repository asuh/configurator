import type { Position } from "@types";

export interface PositionProps {
  positions: Position[];
  selectedPosition: string;
  handlePositionChange: (newPosition: string) => void;
}

export default function Positions({
  handlePositionChange,
  positions,
  selectedPosition
} : PositionProps) {

  return (
    <fieldset id="product-position" class="container product-position-container col-xs-12 col-md-3">
      <legend class="section-title">Choose your Position</legend>
      <div class="form-group row">
        {positions.map(data => {
          return (
            <div key={data.Position} class="form-check col-xs-3 col-sm-3 col-md-6">
                <label class="color form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input" 
                      name="optionsPosition" 
                      id={`optionsPosition${data.Position}`} 
                      value={selectedPosition} 
                      checked={selectedPosition === data.Position}
                      onChange={() => handlePositionChange(data.Position)}
                    />
                    <img class="form-image product-position" src={data.ImageUrl} alt="Position" height="50" width="50" />
                </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}