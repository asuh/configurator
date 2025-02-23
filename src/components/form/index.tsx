import Positions from '../Positions';
import Colors from '../Colors';
import Materials from '../Materials';

export default function Form() {
    return (
        <form class="product container-fluid" action="#">
            <div class="row">
                <Positions />
                <Materials />
                <Colors />
            </div>
            <button class="submit" type="submit">Submit</button>
        </form>
    );
}