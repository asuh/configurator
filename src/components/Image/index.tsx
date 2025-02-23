import { useContext } from "preact/hooks";
import {Data} from "../../index";

export default function Image() {
  const imageData = useContext(Data);

  return (
    <div id="product-image" class="container product-image-container col-xs-12 col-md-3">
      <img src={imageData.BaseImageUrl} alt={imageData.StyleId} />
    </div>
  );
}