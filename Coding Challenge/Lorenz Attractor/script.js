// three.js animataed line using BufferGeometry
var canvascontainer = document.getElementById("Canvas");
var renderer, scene, camera, controls;

var line;
var MAX_POINTS = 50000;
var drawCount;

// attractor's initials
var x = -12.1;
var y = -22;
var z = 0;

var a = 10; // sigma
var b = 28; // beta
var c = 8/3; // rho

var dt, dx, dy, dz;

init();
animate();

function init() {

	// info
	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '30px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	info.style.color = '#fff';
	info.style.fontWeight = 'bold';
	info.style.backgroundColor = 'transparent';
	info.style.zIndex = '1';
	info.style.fontFamily = 'Monospace';
	info.innerHTML = "three.js animataed line using BufferGeometry";
  canvascontainer.appendChild( info );

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	canvascontainer.appendChild( renderer.domElement );

	// scene
	scene = new THREE.Scene();

	// camera
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 0, 0, 80 );

  // controls
  controls = new THREE.TrackballControls(camera, renderer.domElememnt);

	// geometry
	var geometry = new THREE.BufferGeometry();

	// attributes
	var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

	// drawcalls
	drawCount = 2; // draw the first 2 points, only
	geometry.setDrawRange( 0, drawCount );

	// material
	var material = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 2 } );

	// line
	line = new THREE.Line( geometry,  material );
	scene.add( line );

	// update positions
	updatePositions();

}

// update positions
function updatePositions() {

	var positions = line.geometry.attributes.position.array;

	var index = 0;

	for ( var i = 0, l = MAX_POINTS; i < l; i ++ ) {

		positions[ index ++ ] = x;
		positions[ index ++ ] = y;
		positions[ index ++ ] = z;

    // attractor is here
		dt = 0.01;
    dx = (a * (y - x)) * dt;
    dy = (x * (b - z) - y) * dt;
    dz = (x * y - c * z) * dt;

    x = x + dx;
    y = y + dy;
    z = z + dz;

	}

}

// render
function render() {

	renderer.render( scene, camera );

}

// animate
function animate() {

	requestAnimationFrame( animate );

	drawCount = ( drawCount + 1 ) % MAX_POINTS;

	line.geometry.setDrawRange( 0, drawCount );

	if ( drawCount === 0 ) {

		// periodically, generate new data

		updatePositions();

		line.geometry.attributes.position.needsUpdate = true; // required after the first render

		line.material.color.setHSL( Math.random(), 1, 0.5 );
	}
	controls.update();
	render();

}
