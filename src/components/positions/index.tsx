import { useContext } from "preact/hooks";
import {Data} from "../../index";

export default function Positions() {
  const positionData = useContext(Data);

  return (
    <fieldset id="product-position" class="container product-position-container col-xs-12 col-md-3">
      <legend class="section-title">Choose your Position</legend>
      <div class="form-group row">
          {positionData.Positions.map(position => {
              return (
                  <div key={position.Position} class="form-check col-xs-3 col-sm-3 col-md-6">
                      <label class="color form-check-label">
                          <input type="radio" class="form-check-input" name="optionsPosition" id={`optionsPosition${position.Position}`} value={position.Position} />
                          <img class="form-image product-position" src={position.ImageUrl} alt="Position" height="50" width="50" />
                      </label>
                  </div>
              );
          })}
      </div>
    </fieldset>
  );
}