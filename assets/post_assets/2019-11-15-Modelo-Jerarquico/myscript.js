function webgl_scene(POST_NAME){
  let REF_ASSETS_PATH = "../../../assets/post_assets/" + POST_NAME + "/";
  let JSON_OBJ_PATH = REF_ASSETS_PATH + "/OBJ_files/obj.JSON"
  let canvas = document.querySelector('#glcanvas');

  let perspectiveCamera, controls, scene, renderer, stats;


  init();
  animate();

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth/canvas.clientHeight, 1, 20000 );
    camera.position.set(0, 100, 200);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer({antialias:true, canvas: glcanvas});
    renderer.setSize( canvas.clientWidth, canvas.clientHeight, false);
    renderer.setClearColor("#000000");

    //SCENE

    let axes = new THREE.AxesHelper(100);
    scene.add(axes);

    floor();
    skyBox();


    // objects

    let material = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(REF_ASSETS_PATH + 'textures/crate.jpg') });
    let geometry = new THREE.CubeGeometry(50, 50, 50);
    let cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 25, 0);
    scene.add(cube);

    // controlls

    createControls( perspectiveCamera );

    // stats

    stats = new Stats();
    canvas.appendChild( stats.dom );
  }

  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  function render() {
    let camera = perspectiveCamera;
    renderer.render(scene, camera);
  }

    //////////////////////////// Functions


  function skyBox() {
    let materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( REF_ASSETS_PATH + 'textures/dawnmountain-xpos.png' ) }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( REF_ASSETS_PATH + 'textures/dawnmountain-xneg.png' ) }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( REF_ASSETS_PATH + 'textures/dawnmountain-ypos.png' ) }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( REF_ASSETS_PATH + 'textures/dawnmountain-yneg.png' ) }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( REF_ASSETS_PATH + 'textures/dawnmountain-zpos.png' ) }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load( REF_ASSETS_PATH + 'textures/dawnmountain-zneg.png' ) }));
    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
    let skyboxMaterial = materialArray;
    let skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
    let skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
    scene.add( skybox );
  }

  function floor() {
    let floorTexture = new new THREE.TextureLoader().load( REF_ASSETS_PATH + 'textures/checkerboard.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 10, 10 );
    let floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    let floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);
  }

  function createControls( camera ) {
    controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );
  }
}
  