const addEventListeners = (el, events, handler) =>
  events.map(event => el.addEventListener(event, handler));

const removeEventListeners = (el, events, handler) =>
  events.map(event => el.removeEventListener(event, handler));

const START_EVENTS = ["mousedown", "touchstart"];
const MOVE_EVENTS = ["mousemove", "touchmove"];
const END_EVENTS = ["mouseup", "touchend"];

export default {
  inserted(el, binding) {
    let dragged;

    if (!document) return;

    function onPointerStart({ clientX, clientY }) {
      el.lastCoords = el.firstCoords = { x: clientX, y: clientY };
      binding.value({ el, first: true, clientX, clientY });
      dragged = el;
    }
    function onPointerEnd(e) {
      if (el !== dragged) return;
      e.preventDefault();
      el.lastCoords = null;
      binding.value({
        el,
        last: true,
        clientX: e.clientX,
        clientY: e.clientY
      });
      dragged = null;
    }
    function onPointerMove(e) {
      if (el !== dragged) return;
      e.preventDefault();
      if (el.lastCoords) {
        binding.value({
          el,
          deltaX: e.clientX - el.lastCoords.x,
          deltaY: e.clientY - el.lastCoords.y,
          offsetX: e.clientX - el.firstCoords.x,
          offsetY: e.clientY - el.firstCoords.y,
          clientX: e.clientX,
          clientY: e.clientY
        });

        el.lastCoords = { x: e.clientX, y: e.clientY };
      }
    }
    addEventListeners(el, START_EVENTS, onPointerStart);
    addEventListeners(document.documentElement, END_EVENTS, onPointerEnd);
    addEventListeners(document.documentElement, MOVE_EVENTS, onPointerMove);
  },

  unbind(el) {
    removeEventListeners(el, START_EVENTS);
    removeEventListeners(document.documentElement, END_EVENTS);
    removeEventListeners(document.documentElement, MOVE_EVENTS);
  }
};
