import Lumines from 'flux-lumines';
import {PAUSE, RESTART} from 'flux-lumines/src/game/actions.js';
import {PAUSED} from 'flux-lumines/src/game/gameStates.js';
import styles from '../styles.css';

const socketUrl = 'ws://localhost:9091';
const lumines = new Lumines(document.getElementById('lumines'));

document.getElementById('broadcast').onclick = () => {
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
        removeButtons();

        lumines.register(action => {
            ws.send(JSON.stringify(action));
        });
        lumines.start();
    };
};

document.getElementById('listen').onclick = () => {
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
        removeButtons();

        ws.onmessage = event => {
            // First message we receive from the server is the current game state
            lumines.setState(JSON.parse(event.data));

            ws.onmessage = event => {
                const {action, payload} = JSON.parse(event.data);
                lumines.dispatch(action, payload);
                lumines.render();
            };

            lumines.render();
        };
    };
};

function removeButtons() {
    ['broadcast', 'listen'].forEach(id => document.getElementById(id).remove());
}
