// Mock the browser to get Lumines working in Node environment
import mockBrowser from 'mock-browser'
const MockBrowser = mockBrowser.mocks.MockBrowser;
GLOBAL.window = MockBrowser.createWindow();
GLOBAL.document = MockBrowser.createDocument();
const abstractBrowser = new mockBrowser.delegates.AbstractBrowser({window});
GLOBAL.navigator = abstractBrowser.getNavigator();
GLOBAL.localStorage = abstractBrowser.getLocalStorage();

import Lumines from '../build/lumines.js'
import {Server} from 'ws'

const lumines = new Lumines();
const server = new Server({port: 9091});

server.on('connection', client => {
    client.on('message', data => {
        const {action, payload} = JSON.parse(data);
        lumines.dispatch(action, payload);
        server.clients.forEach(client => client.send(data));
    });

    // Send the current state to every client that connects
    client.send(JSON.stringify(lumines.getState()));
});
