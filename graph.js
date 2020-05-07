class Graph {
  constructor(vertices, root) {
    this.vertices = vertices;
    parent[root] = 0;
  }
  addVertex(v) {
    adj.set(v, []);
  }
  addEdge(u, v) {
    adj.get(u).push(v);
    adj.get(v).push(u);
  }
  printGraph() {
    for (let i = 1; i <= this.vertices; i++) {
      console.log(i + ":");
      var nodes = this.adj.get(i);
      for (let j in nodes) {
        console.log(nodes[j]);
      }
    }
  }
  dfs(src) {
    visited = [];
    level[src] = 0;
    this.DfsUtil(src);
  }

  DfsUtil(src) {
    dfsPath.push(src);
    visited[src] = true;
    let allChild = adj.get(src);
    for (let i in allChild) {
      let child = allChild[i];
      if (!visited[child]) {
        parent[child] = src;
        this.DfsUtil(child);
      }
    }
  }
  bfs(src) {
    visited = [];
    this.BfsUtil(src);
  }
  BfsUtil(src) {
    let q = [];
    q.push(src);
    visited[src] = true;
    level[src] = 0;

    while (q.length > 0) {
      let parent_node = q.shift();
      bfsPath.push(parent_node);
      let allChild = adj.get(parent_node);
      for (let i in allChild) {
        if (!visited[allChild[i]]) {
          let curr_node = allChild[i];
          q.push(curr_node);
          level[curr_node] = level[parent_node] + 1;
          visited[allChild[i]] = true;
        }
      }
    }
  }
  getNodesInEachLevel(root) {
    console.log(this.vertices);
    for (let i = 1; i <= this.vertices; i++) {
      maxLevel = Math.max(maxLevel, level[i]);
    }
    for (let i = 0; i <= maxLevel; i++) {
      nodesInEachLevel.set(i, []);
    }

    let q = [];
    visited = [];

    q.push(root);
    visited[root] = true;
    nodesInEachLevel.get(0).push(root);

    while (q.length > 0) {
      let parent_node = q.shift();
      let allChild = adj.get(parent_node);
      for (let i in allChild) {
        if (!visited[allChild[i]]) {
          let curr_node = allChild[i];
          q.push(curr_node);
          nodesInEachLevel.get(level[curr_node]).push(curr_node);
          visited[allChild[i]] = true;
        }
      }
    }
  }

  getLeafNodes() {
    for (let i = 1; i <= this.vertices; i++) {
      var allChild = adj.get(i);
      if (allChild.size == 1) {
        leafNodes.push(i);
      }
    }
  }

  printParents() {
    for (let i = 1; i <= this.vertices; i++) {
      console.log(i, parent[i]);
    }
  }
}
