alias Complex = vec2f;

fn mandelbrot(c: Complex) -> f32 {
  var z = vec2f(0.0);
  var count = 0u;
  for (var i = 0u; i < 100u; i = i + 1u) {
    if (length(z) > 2.0) { break; }
    z = vec2f(z.x * z.x - z.y * z.y + c.x, 2.0 * z.x * z.y + c.y);
    count = count + 1u;
  }
  return f32(count) / 100.0;
}
