# flux-lumines-demos

Some demos based on the [Lumines](https://github.com/tobice/flux-lumines) game written in 
JavaScript using **React.js**, **Flux** and **Immutable.js**.

To try out the demos, clone the repository and then install dependencies using `npm install`. 
Running `npm run` will give you the list of available demos. When you launch a demo, you can access 
it on [http://localhost:9090/](http://localhost:9090/).

### [default](./default) 
Just the game in default configuration.

Run `npm run default` to launch the demo.

### [recording](./recording) 
Record the game while playing and then replay it back. This demo shows how easy this is to 
achieve with the Flux pattern.

Run `npm run recording` to launch the demo.

### [save-state](./save-state) 
The game state is automatically saved to the Web Storage when you pause the game. If you 
reload the page (or access it from another window/tab), the state is loaded and you can 
continue the game. As the whole game state is one global immutable object, this is also 
super easy to implement.

Run `npm run save-state` to launch the demo.

### [share-state](./share-state) 
Share the same state across multiple instances of the game. One instance of the game is pushing
(*"broadcasting"*) the game state to the local web storage making it available for other instances 
that can consequently *mirror* the game play of the original instance. The instances can run in 
separated tabs or windows of the same web browser.

Run `npm run share-state` to launch the demo.

### [sockets](./sockets) 
In the previous demo, the game play is *mirrored* by sharing the global state. That's not exactly
efficient as we need to serialize/deserialize the state for every action dispatched. Isn't there 
a better way? Well actually, the state can be changed only through actions so all we need to do 
is to broadcast just the actions to other Lumines instances.

We'll use web sockets for that which means we need a server. Yes, Lumines can run (with a little 
work) on a server (in Node.js environment). One instance will be in the "broadcast" mode: sending
all actions to the server. The server will maintain another instance of Lumines that will be kept
up to date with the broadcasting instance. When a new client connects to the socket, it will 
first receive the current complete global state from the server instance and then it will start 
listening to the incoming actions.

More detailed description can be found
[here](https://github.com/tobice/flux-lumines/wiki/Making-of-Lumines#bonus-demo-running-lumines-on-the-server).
I also made a recording of this demo which you can find on 
[YouTube](https://www.youtube.com/watch?v=C4sE17kK2iM).

Running this demo is slightly more complicated. First, you need to build Lumines as a library 
that can be used in Node.js:

```
npm run build-lumines
```

You need to do this only once. After that, you just have to separately start the server and the 
client side of the demo:

```
npm run sockets-server
npm run sockets-client
```

Individual Lumines instances should run in separate browser windows, not tabs. JavaScript 
in an inactive tab is slowed down which breaks the synchronization.
