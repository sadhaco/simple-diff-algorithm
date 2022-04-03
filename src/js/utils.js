function setAttrs(node, prop, value) {
  switch (prop) {
    case "value":
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.value = value;
      } else {
        node.setAttribute(prop, value);
      }
      break;
    case "style":
      node.style.cssText = value;
      break;
    default:
      node.setAttribute(prop, value);
      break;
  }
}

export { setAttrs };
