import Lumines from 'flux-lumines';
import styles from '../styles.css'

const mountpoint = document.getElementById('lumines');
let lumines;
let history;
let timeout;

document.getElementById("record").onclick = () => {
    clearTimeout(timeout);
    history = [];

    lumines = new Lumines(mountpoint);
    lumines.register(action => {
        history.push({
            time: performance.now(),
            action: action
        });
    });
    lumines.start();
};

document.getElementById("replay").onclick = () => {
    if (lumines) {
        lumines.stop();
    }
    lumines = new Lumines(mountpoint);

    function dispatch(i) {
        const action = history[i].action;
        lumines.dispatch(action.action, action.payload);
        lumines.render();

        if (history[i + 1]) {
            const delay = history[i + 1].time - history[i].time;
            timeout = setTimeout(() => dispatch(i + 1), delay);
        }
    }

    if (history) {
        dispatch(0);
    }
};
