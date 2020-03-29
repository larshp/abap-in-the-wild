class Grass {
  constructor(divName) {
    this.configuration = {
      leafCountFactor: 5,
      minWidth: 25,
      maxWidth: 50,
      minHeight: 50,
      topRadius: 40,
      colorMax: 200,
      colorMin: 100,
      grey: false,
    };

    this.draw = undefined;
    this.width = 0;
    this.height = 0;
    this.divName = "";

    this.divName = divName;
    this.registerEvents();
  }

  randomGreenGardient() {
    var a = (Math.random() * (this.configuration.colorMax - this.configuration.colorMin)) + this.configuration.colorMin;
    var b = (Math.random() * (this.configuration.colorMax - this.configuration.colorMin)) + this.configuration.colorMin;

    if (a < b) {
      [a, b] = [b, a];
    }
    let color1, color2;
    if (this.configuration.grey === true) {
      color1 = new SVG.Color({ r: a, g: a, b: a });
      color2 = new SVG.Color({ r: b, g: b, b: b });
    } else {
      color1 = new SVG.Color({ r: 0, g: a, b: 0 });
      color2 = new SVG.Color({ r: 0, g: b, b: 0 });
    }

    return this.draw.gradient('linear', function(add) {
      add.stop(0, color1);
      add.stop(1, color2);
    }).from(0, 0).to(0, 1);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  randomLeafs() {
    let leafs = [];

    const count = ( this.width / this.configuration.maxWidth ) * this.configuration.leafCountFactor;

    for (let i = 0; i < count; i++) {
      leafs.push({
        left: Math.floor(Math.random() * this.width),
        width: this.random(this.configuration.minWidth, this.configuration.maxWidth),
        height: this.random(this.configuration.minHeight, this.height),
        gradient: this.randomGreenGardient()});
    }

    return leafs;
  }

  drawGrass() {
    const leafs = this.randomLeafs();
    for (const leaf of leafs) {
      const bottomLeft = [leaf.left, this.height];
      const bottomRight = [leaf.left + leaf.width, this.height];

      const top = [leaf.left + (leaf.width / 2), this.height - leaf.height];
      top[0] = top[0] + this.random(-this.configuration.topRadius, this.configuration.topRadius);

      const vector1 = [bottomLeft[0], bottomLeft[1] - (leaf.height / 2)];
      const vector2 = [bottomRight[0], bottomRight[1] - (leaf.height / 2)];

      const path1 = "M" + bottomLeft[0] + " " + bottomLeft[1] +
        " C " + bottomLeft[0] + " " + bottomLeft[1] + " " + vector1[0] + " " + vector1[1] + " " + top[0] + " " + top[1] +
        " C " + top[0] + " " + top[1] + " " + vector2[0] + " " + vector2[1] + " " + bottomRight[0] + " " + bottomRight[1];

      this.draw.path(path1).fill("red").fill(leaf.gradient);
    }
  }

  run() {
    const div = document.getElementById(this.divName);
    this.width = div.offsetWidth;
    this.height = div.offsetHeight;
    div.innerHTML = "";
    this.draw = SVG().addTo('#' + this.divName).size(this.width, this.height);
    this.drawGrass();

    return this;
  }

  registerEvents() {
    window.addEventListener("resize", this.run.bind(this));
  }
}

let green;
let grey;

function initGreen() {
  green = new Grass("grass_green");
  document.getElementById("grass_green").style.height = "60vh";
  green.configuration = {
    leafCountFactor: 5,
    minWidth: 25,
    maxWidth: 40,
    minHeight: 60,
    topRadius: 80,
    colorMax: 200,
    colorMin: 100,
    grey: false,
  };
  green.run();
}

function initGrey() {
  grey = new Grass("grass_grey");
  document.getElementById("grass_grey").style.height = "10vh";
  grey.configuration = {
    leafCountFactor: 5,
    minWidth: 15,
    maxWidth: 20,
    minHeight: 10,
    topRadius: 40,
    colorMax: 130,
    colorMin: 30,
    grey: true,
  };
  grey.run();
}

function showGreen() {
  document.getElementById("grass_green").style.visibility = "visible";
  document.getElementById("grass_grey").style.visibility = "hidden";
}

function hideGreen() {
  document.getElementById("grass_green").style.visibility = "hidden";
  document.getElementById("grass_grey").style.visibility = "visible";
}

function squaresSlideReady(e) {
  initGreen();
  initGrey();

  if (e.indexh === 0) {
    showGreen();
  } else {
    hideGreen();
  }
}

function squaresSlideChanged(e) {
  if (e.indexh === 0) {
    showGreen();
  } else {
    hideGreen();
  }
}