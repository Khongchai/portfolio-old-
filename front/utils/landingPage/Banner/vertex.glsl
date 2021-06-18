uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;

uniform float uTime;

varying float vElevation;

void main()
{
    //Reminder: this is a normalized coordinate from -.5 to .5
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    //Transform
    float elevation = sin(modelPosition.x * 10.0 + uTime) / 20.0 ;
    modelPosition.z += elevation;

    vElevation = modelPosition.z;
    
    
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
}