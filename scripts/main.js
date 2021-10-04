import { Application } from "./Application.js";
import { CustomItem } from "./items/CustomItem.js";
import { Style } from "./Stype.js";
import { Vec2 } from "./Vec2.js";

console.log('hello world');

const app = new Application();

console.log(app.canvas.elem.width);

app.bus.pointerDown$.on(() => { console.log('down'); });
app.bus.pointerDrag$.on(() => { console.log('drag'); });
app.bus.pointerUp$.on(() => { console.log('up'); });

let time = 0;
let dur = 0;
const next = () => (time += dur);

// setTimeout(
//   () => app.history.commit(app.commands.addItem(app.items.custom((ctx) => {
//     ctx.beginPath();
//     ctx.strokeStyle = app.color.primary;
//     ctx.moveTo(0, 0);
//     ctx.lineTo(100, 75);
//     ctx.stroke();
//   }))),
//   next(),
// );

// setTimeout(
//   () => app.history.commit(app.commands.addItem(app.items.custom((ctx) => {
//     ctx.beginPath();
//     ctx.strokeStyle = app.color.primary;
//     ctx.moveTo(0, 0);
//     ctx.lineTo(100, 50);
//     ctx.stroke();
//   }))),
//   next(),
// )

// setTimeout(() => app.history.undo(), next());
// setTimeout(() => app.history.undo(), next());
// setTimeout(() => app.history.redo(), next());

setTimeout(
  () => app.history.commit(app.commands.addItem(app.items.bezierCurve(
    app.canvas.vec2(0, 0),
    app.canvas.vec2(20, 10),
    app.canvas.vec2(90, 80),
    app.canvas.vec2(100, 100),
    new Style({ stroke: app.color.red })
  ))),
  next(),
)