let animateDfs, animateBfs;
class Animate {
  static initialize() {
    clearTimeout(animateDfs);
    clearTimeout(animateBfs);
    visited = [];
  }
  static dfs(idx) {
    if (idx == dfsPath.length) {
      clearTimeout(animateDfs);
      return;
    }
    var node = document.getElementById(`node${dfsPath[idx]}`);
    node.setAttribute("fill", "rgb(0, 153, 255)");
    node.style.color = "white";
    animateDfs = setTimeout(Animate.dfs, 1000, idx + 1);
  }
  static bfs(idx) {
    if (idx == bfsPath.length) {
      clearTimeout(animateBfs);
      return;
    }
    var node = document.getElementById(`node${bfsPath[idx]}`);
    node.setAttribute("fill", "rgb(0, 153, 255)");
    node.style.color = "white";
    animateBfs = setTimeout(Animate.bfs, 1000, idx + 1);
  }
}
