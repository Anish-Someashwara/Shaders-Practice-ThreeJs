import ThreeJsEnvSetup from  "./ThreejsEnvSetup.js";

// HTML Elements
const canvas = document.getElementById("webgl");

init();

function init(){

    // ThreeJs Scene Setup
    const ThreeJsEnvSetupIns = new ThreeJsEnvSetup(canvas);
    const scene = ThreeJsEnvSetupIns.scene;
    

}


