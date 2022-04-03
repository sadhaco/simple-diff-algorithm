import Element from "./Element";
import { setAttrs } from "./utils";

function createElement(type, props, children) {
  return new Element(type, props, children);
}

function render(vDom) {
  const { type, props, children } = vDom,
    el = document.createElement(type);

  for (let key in props) {
    setAttrs(el, key, props[key]);
  }

  children.map((c) => {
    c = c instanceof Element ? render(c) : document.createTextNode(c);
    el.appendChild(c);
  });

  return el;
}

function renderDOM(rDom, rootEl) {
  rootEl.appendChild(rDom);
}

export { createElement, render, renderDOM };
