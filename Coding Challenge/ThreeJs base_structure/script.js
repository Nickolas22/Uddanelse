var viewportHeight = document.documentElement.clientHeight;
var viewportWidth = document.documentElement.clientWidth;
var canvas = document.getElementById("Canvas");
var keepaspectratio = true;

// // get object left/top position
var offset = (el) => {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}// get object left/top position

// Slider
var sliderwidth = document.getElementById("myWidth");
var sliderheight = document.getElementById("myHeight");

sliderwidth.oninput = () =>{
  if (keepaspectratio == true) {
    sliderheight.value = sliderwidth.value;
    canvas.children[0].style.height = sliderheight.value + "px";
  }
  // canvas.children[0].width = sliderwidth.value;
  canvas.children[0].style.width = sliderwidth.value + "px";
  // drawCanvas(sliderwidth.value, sliderheight.value);
};
sliderheight.oninput = () => {
  if (keepaspectratio == true) {
    sliderwidth.value = sliderheight.value;
    canvas.children[0].style.width = sliderwidth.value + "px";
  }
  canvas.children[0].style.height = sliderheight.value + "px";
};

document.body.onresize = () => {
  viewportHeight = document.documentElement.clientHeight;
  viewportWidth = document.documentElement.clientWidth;
  sliderwidth.max = viewportWidth - 30;
  sliderheight.max = viewportHeight - offset(canvas).top - 20;
};

var bindRatio = () => {
  var fa_bind = document.getElementById("bind-fa");
  keepaspectratio = !keepaspectratio;
  fa_bind.classList.toggle("fa-chain-broken");
  fa_bind.classList.toggle("fa-link");
}

sliderwidth.max = viewportWidth - 30;
if (keepaspectratio == true) {
  sliderheight.max = sliderwidth.max;
} else {
  sliderheight.max = viewportHeight - offset(canvas).top - 20;
}// Slider X

//Three.js
var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera( 70, sliderwidth.value / sliderheight.value, 0.01, 10 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setSize( sliderwidth.value, sliderheight.value );
  renderer.setClearColor( 0x0000, 0.3); //transparent background (alpha: true rquired)
	canvas.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	renderer.render( scene, camera );

}

document.getElementById("refresh-btn").addEventListener("click", function(){
  cancelAnimationFrame( animate );
  scene.remove(mesh);
  mesh.geometry.dispose();
  mesh.material.dispose();
  mesh = undefined;
  canvas.innerHTML = '';
    init();
    animate();
});
