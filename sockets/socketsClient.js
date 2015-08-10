import Lumines from 'flux-lumines';
import {PAUSE, RESTART} from 'flux-lumines/src/game/actions.js';
import {PAUSED} from 'flux-lumines/src/game/gameStates.js';
import styles from '../styles.css';

const lumines = new Lumines(document.getElementById('lumines'));
const ws = new WebSocket('ws://localhost:9091');
ws.onmessage = event => {
    // First message we receive from the server is the current game state
    lumines.setState(JSON.parse(event.data));
    ws.onmessage = () => {};
};

document.getElementById('broadcast').onclick = () => {
    if (ws.readyState != WebSocket.OPEN) {
        alert('The socket connection has not been established! Is the server running?');
        return;
    }
    removeButtons();

    lumines.register(action => {
        ws.send(JSON.stringify(action));
    });
    lumines.start();
};

document.getElementById('listen').onclick = () => {
    if (ws.readyState != WebSocket.OPEN) {
        alert('The socket connection has not been established! Is the server running?');
        return;
    }
    removeButtons();

    ws.onmessage = event => {
        const {action, payload} = JSON.parse(event.data);
        lumines.dispatch(action, payload);
        lumines.render();
    };
    lumines.render();
};

function removeButtons() {
    ['broadcast', 'listen'].forEach(id => document.getElementById(id).remove());
}
