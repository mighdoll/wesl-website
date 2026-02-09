import test::Uniforms;
@group(0) @binding(0) var<uniform> u: Uniforms;

@fragment
fn fs_main(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let uv = pos.xy / u.resolution;
  let c = vec2f(uv.x * 3.5 - 2.5, uv.y * 2.0 - 1.0);
  var z = vec2f(0.0);
  var count = 0u;
  for (var i = 0u; i < 100u; i = i + 1u) {
    if (length(z) > 2.0) { break; }
    z = vec2f(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);
    count = count + 1u;
  }
  let t = f32(count) / 100.0;
  return vec4f(vec3f(t * 0.8, t * 0.4, t), 1.0);
}
