function webgl_scene(POST_NAME){

  var RETURN_PATH = "../../../assets/post_assets/"
  var REF_ASSETS_PATH = RETURN_PATH + POST_NAME
  var JSON_OBJ_PATH = REF_ASSETS_PATH + "/OBJ_files/obj.JSON"
  
  // var cubeRotation = 0.0;

  // var RGB = [0.0, 0.0, 0.0]
  // var color_ratio = 0.1 // entre 0 y 1
  // var color_speed = 2
  // var changed = 0

  // var scaleRatio = 0.5

  // loadJSON(main, JSON_OBJ_PATH);

  //
  // Start here
  //
// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------
  
  let canvasWidth = document.querySelector('#glcanvas').width
  let canvasHeight = document.querySelector('#glcanvas').height


  // Create an empty scene
  var scene = new THREE.Scene();

  // Create a basic perspective camera
  var camera = new THREE.PerspectiveCamera( 90, canvasWidth/canvasHeight, 0.1, 1000 );
  camera.position.z = 4;

  // Create a renderer with Antialiasing
  var renderer = new THREE.WebGLRenderer({antialias:true, canvas: glcanvas});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( canvasWidth, canvasHeight );

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