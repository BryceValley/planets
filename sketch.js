function setup() {
	createCanvas(1170, 2532);
	let backColor = color(225, 198, 153);
	background(backColor);

	var vOffset = 300;
	let activeHeight = height - vOffset * 2;

	let planets = floor(random(5, 7));

	for (let y = 0; y < planets; y++) {
		//planet itself
		fill(0);
		let rad = random(100, 300);
		let surrounder = random(0, 6);
		let yAmount = vOffset + ((y + 0) * activeHeight) / (planets - 1);
		let orbits = [];

		if (surrounder < 3) {
			for (let i = 0; i < random(1, 3); i++) {
				orbits.push(new orbit(rad));
			}
		}

		translate(width / 2, yAmount);
		for (let i = 0; i < orbits.length; i++) {
			orb = orbits[i];
			halfEllipse(orb, 0);
		}
		for (let i = 0; i < orbits.length; i++) {
			orb = orbits[i];
			if (orb.moonLoc > PI) {
				drawMoon(orb);
			}
		}
		translate(-width / 2, -yAmount);

		noStroke();
		fill(0);
		circle(width / 2, yAmount, rad);

		// ring
		if (false) {
			noStroke();
			translate(width / 2, yAmount);
			rotate(HALF_PI / 3);
			for (let factor = 1; factor > 0.5; factor -= 0.1) {
				// noFill();
				// strokeWeight(30);
				fill(random(255));
				// stroke(155);
				arc(
					0,
					0,
					2 * rad * 1.1 * factor,
					2 * rad * 0.3 * factor,
					0,
					PI,
					OPEN
				);
				factor -= random(0, 0.1);
			}
			fill(backColor);
			arc(0, 0, rad * 1.3, rad * 0.3, 0, PI, OPEN);
			fill(0);
			arc(0, 0, rad, rad * 2 * 0.1, 0, PI, OPEN);

			stroke(backColor);
			strokeWeight(0.3);
			line(-rad * 0.65, 0, rad * 0.65, 0);

			stroke(0);
			strokeWeight(0.5);
			line(-rad / 2, 0, rad / 2, 0);

			rotate(-HALF_PI / 3);
			translate(-width / 2, -yAmount);
		}
		// Planetary arc
		else if (surrounder < 3) {
			// let rotAmount = random(PI);
			translate(width / 2, yAmount);
			for (let i = 0; i < orbits.length; i++) {
				orb = orbits[i];
				halfEllipse(orb, 1);
			}

			for (let i = 0; i < orbits.length; i++) {
				orb = orbits[i];
				if (orb.moonLoc < PI) {
					drawMoon(orb);
				}
			}

			translate(-width / 2, -yAmount);
		}

		// translate(width / 2, height / 2);
	}

	// translate(500, 500);
}

function halfEllipse(orb, backHalf) {
	noFill();
	stroke(255);
	strokeWeight(3);
	rotate(orb.rotation);
	arc(0, 0, orb.xSize, orb.ySize, PI * backHalf, PI * (backHalf + 1));
	rotate(-orb.rotation);
}

function drawMoon(orb) {
	noStroke();
	fill(255);
	rotate(orb.rotation);
	circle(
		(orb.xSize * sin(orb.moonLoc)) / 2,
		(orb.ySize * cos(orb.moonLoc)) / 2,
		orb.moonSize
	);
	rotate(-orb.rotation);
}

function draw() {
	// background(220);
}

class orbit {
	constructor(coreRadius) {
		this.xSize = random(coreRadius * 1.2, coreRadius * 3);
		this.ySize = random(coreRadius);
		this.moonLoc = random(TWO_PI);
		this.moonSize = random(10, coreRadius * 0.6);
		this.moonColor = 200;
		this.rotation = random(PI);
	}
}

class planet {
	constructor(height) {
		this.y = height;
		this.orbits = generateOrbits(random(1, 3));
	}

	generateOrbits(numOrbits) {
		let surrounder = random(3);
		let orbits = [];
		let rad = random(100, 300);

		if (surrounder < 3) {
			for (let i = 0; i < numOrbits; i++) {
				orbits.push(new orbit(rad));
			}
		}

		return orbits;
	}
}
