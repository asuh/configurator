import Positions from '../Positions';
import Colors from '../Colors';
import Materials from '../Materials';
import Image from '../Image';

export default function Form() {
    return (
        <form class="product container-fluid" action="#">
            <div class="row">
                <Positions />
                <Image />
                <Materials />
                <Colors />
            </div>
            <button class="submit" type="submit">Submit</button>
        </form>
    );
}