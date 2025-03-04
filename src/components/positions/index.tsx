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
    <fieldset id="product-position" class="container product-position-container">
      <legend class="section-title">Choose your Position</legend>
      <div class="form-group">
        {positions.map(data => {
          return (
            <div key={data.Position} class="form-check">
                <label class="color form-check-label">
                    <input 
                      type="radio" 
                      class="form-check-input visuallyhidden" 
                      name="optionsPosition" 
                      id={`optionsPosition${data.Position}`} 
                      value={selectedPosition} 
                      checked={selectedPosition === data.Position}
                      onChange={() => handlePositionChange(data.Position)}
                    />
                    <img class="form-image product-position" src={data.ImageUrl} alt="Position" height="100%" width="100%" />
                </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}