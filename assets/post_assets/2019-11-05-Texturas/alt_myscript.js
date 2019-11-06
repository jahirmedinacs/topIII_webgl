var cubeRotation = 0.0;

var RETURN_PATH = "../../../assets/post_assets/"
var POST_NAME = "2019-11-05-Texturas"

var REF_ASSETS_PATH = RETURN_PATH + POST_NAME

var RGB = [0.0, 0.0, 0.0]
var color_ratio = 0.1 // entre 0 y 1
var color_speed = 2
var changed = 0

var JSON_OBJ_PATH = REF_ASSETS_PATH + "/obj/obj.JSON"

loadJSON(main);

//
// Start here
//
function main(objDATA) {
  const canvas = document.querySelector('#altcanvas');
  const gl = canvas.getContext('webgl');

  objDATA = JSON.parse(objDATA)
  console.log(objDATA);
  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aTextureCoord and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl, objDATA);

  // ### CAMBIAR SOLO ../../../assets/post_assets/[AQUI]
  const texture = loadTexture(gl, REF_ASSETS_PATH + "/textures/barney.jpg");

  var then = 0;

  // Draw the scene repeatedly BUCLE
  function render(now) {
    now *= 0.001;  // convert to seconds

    // RAINBOW BEGINS
    var nowInt = Math.floor((now) % color_speed)
    if( nowInt === 0 && now >= 1 ){
      if(changed === 0){
        var refIdx = Math.floor(parseFloat(3 * Math.random()))

        if(RGB[refIdx] > 1){
          RGB[refIdx] -= 1
        }
        else{
          RGB[refIdx] += color_ratio
        }
      }
      changed += 1
    }
    else{
      changed = 0
    }
    // RAINBOW END

    const deltaTime = now - then;
    then = now;



    drawScene(gl, programInfo, buffers, texture, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl, objDATA) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.
  // const positions = objDATA.position // AQUI  SE INTENTO CARGAR DESDE JSON PERO DA UN ERROR DE INDICES
  const positions = [
  -1.411334, 3.199887, 0.000001,
 -0.705666, 3.199887, 1.222252,
 0.705666, 3.199887, 1.222252,
 1.411334, 3.199887, 0.000001,
// face 2
 0.705666, 3.199887, -1.222250,
 -0.705666, 3.199887, -1.222250,
 -2.553120, 2.385067, -0.155618,
 -2.989260, 1.570227, 0.911012,
// face 3
 -2.283580, 1.570227, 2.133254,
 -1.141792, 2.385067, 2.288874,
 -1.411334, 2.385067, -2.133266,
 -2.553120, 1.881465, -1.474048,
// face 4
 -0.705666, 1.570228, -3.044266,
 1.411334, 2.385067, -2.133266,
 0.705666, 1.570228, -3.044266,
 -1.141792, 0.251797, -3.296066,
// face 5
 -2.283580, -0.251797, -2.636866,
 -2.989260, 0.563037, -1.725844,
 0.000000, -0.563034, -3.451686,
 0.000000, -1.881465, -2.948087,
// face 6
 -1.141792, -2.385053, -2.288887,
 -2.283580, -1.570225, -2.133266,
 1.141792, 0.251797, -3.296066,
 2.283580, -0.251797, -2.636866,
// face 7
 2.283580, -1.570225, -2.133266,
 1.141792, -2.385053, -2.288887,
 2.553120, 1.881465, -1.474048,
 2.989260, 0.563037, -1.725844,
// face 8
 2.553120, 2.385067, -0.155618,
 2.989260, 1.570227, 0.911012,
 3.425380, 0.251797, 0.659216,
 3.425380, -0.251797, -0.659214,
// face 9
 1.141792, 2.385067, 2.288874,
 2.283580, 1.570227, 2.133254,
 0.000000, 1.881464, 2.948094,
 -2.283580, 0.251797, 2.636854,
// face 10
 -1.141792, -0.251798, 3.296074,
 0.000000, 0.563036, 3.451694,
 -3.425380, 0.251797, 0.659216,
 -2.989260, -0.563035, 1.725846,
// face 11
 -3.425380, -0.251797, -0.659214,
 -2.989260, -1.570225, -0.911010,
 -2.553120, -2.385053, 0.155620,
 -2.553120, -1.881465, 1.474048,
// face 12
 -0.705666, -3.199893, -1.222251,
 -1.411334, -3.199893, -0.000000,
 0.705666, -3.199893, -1.222251,
 2.989260, -1.570225, -0.911010,
// face 13
 2.553120, -2.385053, 0.155620,
 1.411334, -3.199893, -0.000000,
 2.989260, -0.563035, 1.725846,
 2.553120, -1.881465, 1.474048,
// face 14
 2.283580, 0.251797, 2.636854,
 1.141792, -0.251798, 3.296074,
 0.705666, -1.570226, 3.044274,
 1.411334, -2.385053, 2.133253,
// face 15
 -0.705666, -1.570226, 3.044274,
 -1.411334, -2.385053, 2.133253,
 -0.705666, -3.199893, 1.222251,
 0.705666, -3.199893, 1.222251,
// face 16
 0.000000, 1.000000, 0.000000,
 -0.577400, 0.745400, 0.333300,
 -0.525700, 0.794700, -0.303500,
 -0.000000, 0.745400, -0.666700,
// face 17
 -0.577400, 0.333300, -0.745400,
 -0.356800, -0.333300, -0.872700,
 0.356800, -0.333300, -0.872700,
 -0.000000, 0.187600, -0.982200,
// face 18
 0.577300, 0.333300, -0.745400,
 0.934200, 0.333300, -0.127300,
 0.525700, 0.794700, -0.303500,
 0.577400, 0.745400, 0.333300,
// face 19
 0.000000, 0.794700, 0.607100,
 -0.356800, 0.333300, 0.872700,
 -0.850600, 0.187600, 0.491100,
 -0.934200, 0.333300, -0.127300,
// face 20
 -0.934200, -0.333300, 0.127300,
 -0.577400, -0.745400, -0.333300,
 0.000000, -0.794700, -0.607100,
 0.577400, -0.745400, -0.333300,
// face 21
 0.934200, -0.333300, 0.127300,
 0.577300, -0.333300, 0.745400,
 0.356800, 0.333300, 0.872700,
 0.850600, 0.187600, 0.491100,
// face 22
 0.000000, -0.187600, 0.982200,
 -0.577300, -0.333300, 0.745400,
 0.000000, -0.745400, 0.666700,
 0.000000, -1.000000, 0.000000,
// face 23
 0.525700, -0.794700, 0.303500,
 -0.525700, -0.794700, 0.303500,
 0.850700, -0.187600, -0.491100,
 -0.850600, -0.187600, -0.491100,
// face 24
 -0.577300, 0.745400, 0.333300,
 -0.577300, 0.333300, -0.745400,
 0.577400, 0.333300, -0.745400,
 0.577300, 0.745400, 0.333300,
// face 25
 -0.577300, -0.745400, -0.333300,
 0.577300, -0.745400, -0.333300,
 0.577400, -0.333300, 0.745400,
 0.850700, 0.187600, 0.491100,
// face 26
 -0.577400, -0.333300, 0.745400,
 0.850600, -0.187600, -0.491100,
 -0.850700, -0.187600, -0.491100,
  ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Now set up the texture coordinates for the faces.

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  // const textureCoordinates = objDATA.textureCoordinates // AQUI  SE INTENTO CARGAR DESDE JSON PERO DA UN ERROR DE INDICES
  const textureCoordinates = [
    // FACE 1
    -1.41133, 3.19989, 0.0, -0.70567, 3.19989, 1.22225, 
    // FACE 2
    3.19989, -1.41133, 0.70567, 3.19989, 1.22225, 1.41133, 
    // FACE 3
    1.22225, 3.19989, 0.0, 0.70567, -1.41133, 
    // FACE 4
    0.70567, 3.19989, 1.22225, 3.19989, 3.19989, -1.22225, 
    // FACE 5
    -0.70567, 3.19989, -1.22225, 0.0, 3.19989, 0.70567, 
    // FACE 6
    -2.55312, 2.38507, -0.15562, -2.98926, 3.19989, -0.70567, 
    // FACE 7
    2.38507, -2.55312, 1.57023, 0.91101, -2.28358, 1.57023, 
    // FACE 8
    0.70567, -1.22225, 1.57023, -2.55312, -0.70567, 
    // FACE 9
    2.13325, -1.14179, 0.91101, 1.57023, -1.22225, 3.19989, 
    // FACE 10
    -1.14179, 2.13325, 2.38507, 2.28887, -1.41133, 2.38507, 
    // FACE 11
    3.19989, 3.19989, -0.70567, 2.38507, 2.13325, 
    // FACE 12
    2.28887, 2.38507, -0.70567, 0.0, -2.13327, -2.55312, 
    // FACE 13
    -2.13327, 0.0, 3.19989, 1.41133, 1.88146, 
    // FACE 14
    1.41133, 1.22225, -1.47405, -0.70567, 1.57023, 1.88146, 
    // FACE 15
    3.19989, -3.04427, 1.41133, -1.47405, 1.22225, 
    // FACE 16
    2.38507, -3.04427, 3.19989, 0.70567, 0.0, -1.22225, 
    // FACE 17
    -2.13327, 0.70567, 1.57023, 1.41133, -3.04427, 2.38507, 
    // FACE 18
    -2.98926, -0.15562, -3.04427, -1.14179, 0.70567, -2.13327, 
    // FACE 19
    -0.15562, 2.38507, 1.57023, 0.2518, -3.04427, 
    // FACE 20
    -3.29607, -2.28358, -0.2518, 0.2518, 1.57023, -2.28358, 
    // FACE 21
    -2.63687, -2.98926, -2.28358, -3.29607, 2.38507, -1.41133, 
    // FACE 22
    0.56304, -1.72584, 0.0, -0.56303, -2.98926, -2.63687, 
    // FACE 23
    -1.72584, 0.56304, -2.55312, -2.13327, 1.88146, 1.57023, 
    // FACE 24
    -1.41133, 2.28887, -2.55312, 0.56304, -2.63687, 
    // FACE 25
    0.0, -1.72584, 1.57023, -0.70567, -3.45169, 
    // FACE 26
    0.0, -3.45169, -0.70567, -1.47405, 1.41133, 1.57023, 
    // FACE 27
    -1.88146, -2.94809, -0.56303, 0.0, -3.45169, 0.0, 
    // FACE 28
    0.2518, -0.2518, -2.94809, -1.88146, -1.14179, -3.04427, 
    // FACE 29
    -2.98926, -0.56303, -2.94809, -0.2518, -2.28358, 
    // FACE 30
    -1.88146, 0.0, 1.57023, 0.70567, -1.14179, 
    // FACE 31
    -2.28358, 0.91101, -1.14179, 2.38507, -3.29607, 
    // FACE 32
    -1.22225, 3.19989, -2.98926, -2.13327, 2.38507,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  // const indices = objDATA.indices // AQUI  SE INTENTO CARGAR DESDE JSON PERO DA UN ERROR DE INDICES
  const indices = [
    4, 5, 1, 8, 9, 0, 6, 5, 11, 4, 13, 14,
// face 2
 11, 10, 12, 21, 16, 15, 23, 24, 25, 14, 22, 18,
// face 2
 22, 14, 26, 29, 30, 31, 4, 28, 26, 2, 32, 33,
// face 3
 2, 1, 9, 36, 37, 34, 38, 35, 8, 17, 7, 11,
// face 4
 38, 40, 42, 45, 42, 21, 19, 46, 44, 48, 46, 24,
// face 4
 47, 31, 30, 55, 51, 52, 34, 37, 52, 33, 52, 50,
// face 5
 53, 36, 56, 35, 39, 43, 54, 56, 57, 58, 45, 44,
// face 6
 55, 49, 48, 57, 42, 45, 27, 31, 47, 41, 17, 21,
// face 6
 5, 0, 1, 1, 2, 3, 3, 4, 1, 9, 1, 0,
// face 7
 0, 6, 8, 6, 7, 8, 0, 5, 6, 5, 10, 11,
// face 8
 14, 12, 4, 12, 10, 5, 4, 12, 5, 12, 15, 11,
// face 8
 15, 16, 11, 16, 17, 11, 15, 18, 19, 19, 20, 15,
// face 9
 20, 21, 15, 25, 19, 18, 18, 22, 25, 22, 23, 25,
// face 10
 15, 12, 18, 12, 14, 18, 13, 26, 14, 26, 27, 23,
// face 10
 22, 26, 23, 31, 27, 29, 27, 26, 29, 26, 28, 29,
// face 11
 26, 13, 4, 4, 3, 28, 33, 29, 28, 28, 3, 33,
// face 12
 3, 2, 33, 34, 32, 9, 32, 2, 9, 34, 9, 8,
// face 12
 8, 35, 34, 35, 36, 34, 8, 7, 38, 38, 39, 35,
// face 13
 17, 40, 38, 38, 7, 17, 7, 6, 11, 40, 41, 42,
// face 14
 42, 43, 39, 39, 38, 42, 41, 21, 42, 21, 20, 45,
// face 14
 20, 44, 45, 44, 20, 19, 19, 25, 46, 24, 47, 48,
// face 15
 48, 49, 46, 46, 25, 24, 30, 50, 51, 51, 48, 30,
// face 16
 48, 47, 30, 50, 52, 51, 52, 53, 55, 53, 54, 55,
// face 16
 37, 53, 52, 52, 33, 34, 33, 32, 34, 50, 30, 29,
// face 17
 29, 33, 50, 56, 54, 53, 53, 37, 36, 43, 57, 35,
// face 18
 57, 56, 35, 56, 36, 35, 57, 58, 54, 58, 59, 54,
// face 18
 59, 55, 54, 44, 46, 58, 46, 49, 58, 49, 59, 58,
// face 19
 48, 51, 55, 55, 59, 49, 45, 58, 57, 57, 43, 42,
// face 20
 47, 24, 27, 24, 23, 27, 40, 17, 41, 17, 16, 21,
// face 20
  ];
  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

//
// Draw the scene.
//

function drawScene(gl, programInfo, buffers, texture, deltaTime) {
  gl.clearColor(RGB[0], RGB[1], RGB[2], 1.0);  // Clear to black, fully opaque

  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 0.0, -6.0]);  // amount to translate
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation * .7,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  // Specify the texture to map onto the faces.

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = 348;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  // Update the rotation for the next draw

  cubeRotation += deltaTime;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}


// JSON LOADER
function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', JSON_OBJ_PATH , true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}
