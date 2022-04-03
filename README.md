### diff 算法的用处

对比两个虚拟节点，找到他们的差异，再对应到真实 DOM 上去打补丁的过程，目的是为了找到这些差异，以最小的代价去操作 DOM（因为操作 DOM 代价很高）

### diff 算法流程

1. index.js 包含了两个待比较的虚拟 DOM，先使用 render 函数将虚拟 DOM 渲染为真实 DOM，再将真实 DOM 渲染到页面上
2. 使用 domDiff 算法对两个虚拟 DOM 进行节点遍历比较，然后计算出新旧虚拟 DOM 的差异 patches
3. 使用 doPatch 对页面上的真实 DOM 以最小代价打补丁

### 文件含义

- domDiff.js diff 算法遍历对比新旧虚拟 DOM 计算出补丁 patches
- doPatches.js 打补丁，将计算出的 patches 以最小代价渲染到页面上
- Element.js 将虚拟 DOM 转化为 Element 对象
- test.js patches 的格式举例
- virtualDom.js 将虚拟 DOM 转化为 Element 对象，构造虚拟节点并渲染
- utils.js 存放设置属性函数
- config 存放四种情况：节点属性改变、节点为文本替换、节点替换、节点移除
