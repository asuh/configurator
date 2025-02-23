import data from '../../data/config.json';
import Positions from '../positions';
import Colors from '../colors';
import Materials from '../materials';

export default function Form() {
    return (
        <form class="product container-fluid" action="#">
            <div class="row">
                <Positions data={data} />
                <Materials data={data} />
                <Colors data={data} />
            </div>
            <button class="submit" type="submit">Submit</button>
        </form>
    );
}