function webgl_scene(POST_NAME){

  var RETURN_PATH = "../../../assets/post_assets/"
  var REF_ASSETS_PATH = RETURN_PATH + POST_NAME
  var JSON_OBJ_PATH = REF_ASSETS_PATH + "/OBJ_files/obj.JSON"

  let canvas = document.querySelector('#glcanvas');
  console.log(canvas.clientWidth, canvas.clientHeight);
  // Create an empty scene
  var scene = new THREE.Scene();

  
  var camera = new THREE.PerspectiveCamera( 90, canvas.clientWidth/canvas.clientHeight, 0.1, 1000 );
  camera.position.z = 4;

  // Create a renderer with Antialiasing
  var renderer = new THREE.WebGLRenderer({antialias:true, canvas: glcanvas});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( canvas.clientWidth, canvas.clientHeight, false);

  // Append Renderer to DOM
  // console.log(renderer.domElement);
  // document.querySelector('#glcanvas').appendChild( renderer.domElement );

  // ------------------------------------------------
  // FUN STARTS HERE
  // ------------------------------------------------

  // Create a Cube Mesh with basic material
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: "#433F81" } );
  var cube = new THREE.Mesh( geometry, material );

  // Add cube to Scene
  scene.add( cube );

  // Render Loop
  var render = function () {
    requestAnimationFrame( render );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Render the scene
    renderer.render(scene, camera);
  };

  render();
}