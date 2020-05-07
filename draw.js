class Draw {
  static circle(value, node_level, leftPos, topPos) {
    var svgArea = document.getElementById("svgArea");
    svgArea.innerHTML += `
    <circle
      cx="${leftPos}"
      cy="${topPos}"
      r="40"
      stroke="black"
      stroke-width="3"
      fill="green"
      class="node node_level${node_level}"
      id = "node${value}"
    />

    <text 
      x="${leftPos - 5}" 
      y="${topPos + 2}" 
      fill="yellow"
      class="txt"
      >
      ${value}
    </text>`;
  }

  static drawNodes() {
    var topPos = 100;
    for (let i = 0; i < nodesInEachLevel.size; i++) {
      var arr = nodesInEachLevel.get(i);
      var leftPos = 0;
      var nodeWidth = maxWidth / (arr.length + 1);
      var radius = 40;
      for (let j = 0; j < arr.length; j++) {
        leftPos += nodeWidth;
        this.circle(arr[j], i, leftPos, topPos);
      }
      topPos += 150;
    }
  }

  static drawCurvedLines(node1, node2, dist) {
    node1 = document.getElementById(`node${node1}`);
    node2 = document.getElementById(`node${node2}`);
    const X1 = node1.getAttribute("cx") * 1;
    const Y1 = node1.getAttribute("cy") * 1;
    const X2 = node2.getAttribute("cx") * 1;
    const Y2 = node2.getAttribute("cy") * 1;
    const r = node1.getAttribute("r") * 1;
    const Xmid = (X1 + X2) / 2;
    const Ymid = Y1 + (dist + 1) * r;

    var svgArea = document.getElementById("svgArea");
    svgArea.innerHTML += `<path d="M ${X1} ${Y1} Q ${Xmid} ${Ymid} ${X2} ${Y2}" class="line" stroke="black" fill="transparent" />`;
  }
  static drawLines(node1, node2) {
    node1 = document.getElementById(`node${node1}`);
    node2 = document.getElementById(`node${node2}`);
    const X1 = node1.getAttribute("cx") * 1;
    const Y1 = node1.getAttribute("cy") * 1;
    const X2 = node2.getAttribute("cx") * 1;
    const Y2 = node2.getAttribute("cy") * 1;
    var svgArea = document.getElementById("svgArea");
    svgArea.innerHTML += `<line x1="${X1}" y1="${Y1}" x2="${X2}" y2="${Y2}" class="line" fill="black"/>`;
  }

  static drawEdges(uv) {
    var svgArea = document.getElementById("svgArea");
    // svgArea.innerHTML = "";
    var nodes = document.getElementsByClassName("node");
    for (let i = 0; i < uv.length; i++) {
      let u = uv[i][0],
        v = uv[i][1];
      if (u == 0 || v == 0) {
        return;
      }
      if (level[u] == level[v]) {
        let curved = true;
        for (let j = 0; j < bfsPath.length - 1; j++) {
          if (
            (bfsPath[j] == u && bfsPath[j + 1] == v) ||
            (bfsPath[j] == v && bfsPath[j + 1] == u)
          ) {
            curved = false;
            break;
          }
        }
        if (curved) {
          let idxU, idxV;
          for (let j = 0; j < bfsPath.length; j++) {
            if (bfsPath[j] == u) {
              idxU = j;
            } else if (bfsPath[j] == v) {
              idxV = j;
            }
          }
          let dist = Math.abs(idxU - idxV);
          this.drawCurvedLines(u, v, dist);
        } else {
          this.drawLines(u, v);
        }
      } else {
        this.drawLines(u, v);
      }
    }
  }

  static deleteAllNodes() {
    var nodes = document.getElementsByClassName("node");
    let sz = nodes.length;
    for (let i = 1; i <= sz; i++) {
      document.getElementById(`node${i}`).remove();
    }
  }

  static deleteEdge(x) {}
}
