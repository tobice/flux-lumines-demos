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
