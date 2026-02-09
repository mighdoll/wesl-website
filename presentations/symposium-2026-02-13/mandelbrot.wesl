import test::Uniforms;
import package::graphics::mandelbrot;

@group(0) @binding(0) var<uniform> u: Uniforms;

@fragment
fn fs_main(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = pos.xy / u.resolution;
  let c = vec2f(uv.x * 3.5 - 2.5, uv.y * 2.0 - 1.0);
  let t = mandelbrot(c);
  return vec4f(vec3f(t * 0.8, t * 0.4, t), 1.0);
}
