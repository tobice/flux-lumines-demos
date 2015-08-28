import Lumines from 'flux-lumines';
import styles from '../styles.css';

const {PAUSE, RESTART} = Lumines.actions;
const {PAUSED} = Lumines.gameStates;

window.onerror = () => {
    // Lumines can't quite handle corrupted state. It somehow expects that the
    // state we set is correct. In case of error (which might or might not be
    // caused by the corrupted state), remove the state from local storage.
    // Just to be sure.
    localStorage.removeItem("state");
};

const lumines = new Lumines(document.getElementById('lumines'));

lumines.register(({action}) => {
    if (action === PAUSE && lumines.isPaused()) {
        localStorage.state = JSON.stringify(lumines.getState());
        console.log('Game state saved to the Web Storage.');
    }
});

if (localStorage.state) {
    lumines.setState(JSON.parse(localStorage.state));
    console.log('Game state loaded from the Web Storage.')
}

lumines.start();
