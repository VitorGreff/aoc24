type Point = {
  symbol: string;
  x: number;
  y: number;
};

const create2DArray = (input: string) => {
  const lines = input.split("\n");
  const grid: string[][] = [];
  for (let i = 0; i < lines.length; i++) grid.push(lines[i].split(""));
  return grid;
};

const gatherAllAntennas = (grid: string[][]) => {
  const antennas: Point[] = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] !== "." && !grid[i][j].includes("#"))
        antennas.push({ symbol: grid[i][j], x: i, y: j });
    }
  }
  return antennas;
};

const calculateEuclidianDistance = (P: Point, P2: Point) => {
  return Math.sqrt(Math.pow(P2.x - P.x, 2) + Math.pow(P2.y - P.y, 2));
};

const checkRequirements = (P: Point, antennas: Point[]) => {
  // check if points are aligned (collinear)
  const areCollinearByArea = (p1: Point, p2: Point, p3: Point) => {
    // Calculate triangle area by 2
    // if it is zero, then the points are collienar
    const areaTimes2 =
      p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    return areaTimes2 === 0;
  };

  for (const A1 of antennas) {
    const rest = [
      ...antennas.slice(0, antennas.indexOf(A1)),
      ...antennas.slice(antennas.indexOf(A1) + 1),
    ];
    for (const A2 of rest) {
      if (A2.symbol !== A1.symbol) continue;
      if (areCollinearByArea(P, A1, A2)) {
        if (
          calculateEuclidianDistance(P, A1) ===
            calculateEuclidianDistance(P, A2) * 2 ||
          calculateEuclidianDistance(P, A1) * 2 ===
            calculateEuclidianDistance(P, A2)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

const checkRequirements2 = (P: Point, antennas: Point[]) => {
  // check if points are aligned (collinear)
  const areCollinearByArea = (p1: Point, p2: Point, p3: Point) => {
    // Calculate triangle area by 2
    // if it is zero, then the points are collienar
    const areaTimes2 =
      p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
    return areaTimes2 === 0;
  };

  for (const A1 of antennas) {
    const rest = [
      ...antennas.slice(0, antennas.indexOf(A1)),
      ...antennas.slice(antennas.indexOf(A1) + 1),
    ];
    for (const A2 of rest) {
      if (A2.symbol !== A1.symbol) continue;
      if (areCollinearByArea(P, A1, A2)) return true;
    }
  }
  return false;
};

export const day08a = () => {
  let counter = 0;
  const grid = create2DArray(input);
  const antennas = gatherAllAntennas(grid);

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (checkRequirements({ symbol: grid[r][c], x: r, y: c }, antennas)) {
        if (grid[r][c] === ".") grid[r][c] = "#";
        else grid[r][c] = "#" + grid[r][c];
        counter++;
      }
    }
  }

  return counter;
};

export const day08b = () => {
  let counter = 0;
  const grid = create2DArray(input);
  const antennas = gatherAllAntennas(grid);

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (checkRequirements2({ symbol: grid[r][c], x: r, y: c }, antennas)) {
        if (grid[r][c] === ".") grid[r][c] = "#";
        else grid[r][c] = "#" + grid[r][c];
        counter++;
      }
    }
  }

  return counter;
};

const input = `..................................3.........H.....
..............F............................CK.....
..................F...e...m..........C.Ki.........
......1..................m........................
.........F.1......................................
.......1.....W...........3..Z............i........
...........W...m....1.............................
......W...........m..............N..C.............
E............2................Z.K.......p.........
.....Y.........4....i.........N...................
..............W.Y....................3..9....i....
.................................h........9.......
.........................................Z.......H
2...............................3.......H9........
..2..........4T...................................
...2..............Y...4........Z..................
.........E.........................N...5..........
.......................................e..........
..............................C...................
..E..................P.....................p.H....
......4............................IN......h.p....
..........................T....M.........K..p.....
..........................G.......................
..................................................
...................................M..............
.5.............G..............M...................
.............Y..........................M.........
.................E8...0.........................h.
.............................P............g.......
......5...........................................
.............n.................................c..
...............................g....f.......c.....
.y..............8...t....T........................
..7..F.............T........R..........f........u.
.kz.......7..R....................................
.........8..................U.........P...........
......U.............wG....v.....P.............c...
...0.....R..........g.............................
.....7.....8.........g.............f..............
....z...........G................7................
........5........6.v.....U..f.......u........e....
.........V....v........6......t...................
......6..0..y.....R........V...........r..........
...........v.......we..U.............c..r.........
................................r.......Iu........
k............y6..........t.................r...I..
........k............t...........w................
.............z....n.................I.............
..0.................n.............................
...............n..........V...........y........u..`;
