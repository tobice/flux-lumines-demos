import Lumines from 'flux-lumines';
import {RESTART} from 'flux-lumines/src/game/actions.js'
import styles from '../styles.css'

let lumines;
let recording = false;
let history;
let timeout;

function resetLumines() {
    if (lumines) {
        lumines.stop();
    }
    lumines = new Lumines(document.getElementById('lumines'));
    lumines.register(action => {
        if (recording) {
            history.push({
                time: performance.now(),
                action: action
            });
        }
    });
}

function dispatch(i) {
    const action = history[i].action;
    lumines.dispatch(action.action, action.payload);
    lumines.render();

    if (history[i + 1]) {
        const delay = history[i + 1].time - history[i].time;
        timeout = setTimeout(() => dispatch(i + 1), delay);
    }
}

document.getElementById("record").onclick = () => {
    clearTimeout(timeout);
    recording = true;
    history = [];
    resetLumines();
    lumines.start();
};

document.getElementById("replay").onclick = () => {
    recording = false;
    resetLumines();

    if (history) {
        dispatch(0);
    }
};


