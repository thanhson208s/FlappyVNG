#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

void main(void)
{
	vec4 base = texture2D(CC_Texture0, v_texCoord);
    vec4 dst = base;
	vec4 blend = vec4(%r%,%g%,%b%,1.0);
    if(base.r > 0.5){  
                dst.r = 1.0 - 2.0 * (1.0 - base.r) * (1.0 - blend.r);
            }
            else{
                dst.r = 2.0 * base.r * blend.r;
            }
            
            //green
            if(base.g > 0.5){
                dst.g = 1.0 - 2.0 * (1.0 - base.g) * (1.0 - blend.g);
            }
            else{
                dst.g = 2.0 * base.g * blend.g;
            }
            
            //blue
            if(base.b > 0.5){
                dst.b = 1.0 - 2.0 * (1.0 - base.b) * (1.0 - blend.b);
            }
            else{
                dst.b = 2.0 * base.b * blend.b;
            }
			
	gl_FragColor = dst*v_fragmentColor;
}