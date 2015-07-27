import Lumines from 'flux-lumines';
import {PAUSE, RESTART} from 'flux-lumines/src/game/actions.js';
import {PAUSED} from 'flux-lumines/src/game/gameStates.js';
import styles from '../styles.css';

window.onerror = () => {
    // Lumines can't quite handle corrupted state. It somehow expects that the
    // state we set is correct. In case of error (which might or might not be
    // caused by the corrupted state), remove the state from local storage.
    // Just to be sure.
    localStorage.removeItem("sharedState");
};

const lumines = new Lumines(document.getElementById('lumines'));

document.getElementById('broadcast').onclick = () => {
    removeButtons();

    lumines.register(() => {
        localStorage.sharedState = JSON.stringify(lumines.getState());
    });
    lumines.start();
};

document.getElementById('listen').onclick = () => {
    removeButtons();

    // There is an event for detecting local storage changes but it's unusable due to performance
    // reasons. The event is fired too frequently and the browser is unable to handle it. We use
    // interval instead to throttle the updates a bit.
    setInterval(() => {
        if (localStorage.sharedState) {
            lumines.setState(JSON.parse(localStorage.sharedState));
            lumines.render();
        }
    }, 50);
};

function removeButtons() {
    ['broadcast', 'listen'].forEach(id => document.getElementById(id).remove());
}
