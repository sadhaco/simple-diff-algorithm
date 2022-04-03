import { ATTR, REMOVE, REPLACE, TEXT } from "./config/patchTypes";

let patches = {},
  vnIndex = 0;

function domDiff(oldVDom, newVDom) {
  let index = 0;
  vNodeWalk(oldVDom, newVDom, index);

  return patches;
}

// 遍历比较新旧 DOM 节点
function vNodeWalk(oldNode, newNode, index) {
  let vnPatch = [];

  if (!newNode) {
    vnPatch.push({
      type: REMOVE,
      index,
    });
  } else if (typeof oldNode === "string" && typeof newNode === "string") {
    if (oldNode !== newNode) {
      vnPatch.push({
        type: TEXT,
        text: newNode,
      });
    }
  } else if (oldNode.type === newNode.type) {
    const attrPatch = attrsWalk(oldNode.props, newNode.props);

    if (Object.keys(attrPatch).length > 0) {
      vnPatch.push({
        type: ATTR,
        attrs: attrPatch,
      });
    }

    childrenWalk(oldNode.children, newNode.children);
  } else {
    vnPatch.push({
      type: REPLACE,
      newNode: newNode,
    });
  }

  if (vnPatch.length > 0) {
    patches[index] = vnPatch;
  }
}

// 遍历比较新旧 DOM 节点的属性
function attrsWalk(oldAttrs, newAttrs) {
  let attrPatch = {};

  for (let key in oldAttrs) {
    // 修改属性
    if (oldAttrs[key] !== newAttrs[key]) {
      attrPatch[key] = newAttrs[key];
    }
  }

  for (let key in newAttrs) {
    // 新增属性
    if (!oldAttrs.hasOwnProperty(key)) {
      attrPatch[key] = newAttrs[key];
    }
  }

  return attrPatch;
}

// 遍历比较孩子节点
function childrenWalk(oldChildren, newChildren) {
  oldChildren.map((c, idx) => {
    // 深度优先遍历为节点排序，所以每遍历一个节点，全局 vnIndex + 1
    vNodeWalk(c, newChildren[idx], ++vnIndex);
  });
}

export default domDiff;
