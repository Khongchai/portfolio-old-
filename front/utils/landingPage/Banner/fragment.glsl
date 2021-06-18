precision mediump float;

varying float vElevation;

void main()
{
    float elevation = vElevation * 5.0;
    gl_FragColor = vec4(elevation, elevation, 1.0, 1.0);
}