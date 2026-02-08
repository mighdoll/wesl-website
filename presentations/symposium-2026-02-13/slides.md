---
theme: default
title: WESL - A Pioneer Language for WebGPU
info: Extensions to WGSL and WebGPU tool support
highlighter: shiki
shikiOptions:
  theme: github-light
drawings:
  persist: false
transition: none
---
<!--
TODO:
- add urls for wgsl-test, wgsl-studio, wgsl-analyzer, 
- add url to presentation
- much review/revise
- add speaker notes
- trim for time?

- runnable example for mandelbrot
- IDE demo
- wgsl-play demo
- wgsl-studio demo
- library demo with js and rust
- try jannik's doc generator. 
- static screen shots as demo placeholders

- extra slides for upcoming wgsl features 
  - [might be nice to get feedback on these outside/after the talk]
  - param const
  - wildcard imports
  - @publish
  - more?
-->

# WESL

A Pioneer Language for WebGPU


<div class="mt-12">

Lee Mighdoll

Stefan Brandmair

Mathis Brossier (in spirit)

</div>

<div class="absolute bottom-2 right-4 text-sm             
text-gray-400">                                           
Shader Languages Symposium<br>
February 2026
</div>                                                    
---

# Vision

<div class="mt-6 space-y-6">

### Empower a new generation of shader developers

### Integrate GPU programming into modern development

### Flourishing of GPU apps, big and small
</div>


<!--
A vision for WebGPU, we think WESL can help.
-->
---

# Why Extend WGSL/WebGPU?


### Pioneer new features with low risk

<div class="mt-2 ml-4">
Explore first 
</div>

<div class="mt-2 ml-4">
Browser changes are forever
</div>

<br/>

### Some features might not belong in browsers

<div class="mt-2 ml-4">
Load shader modules incrementally from external sources
</div>

<div class="mt-2 ml-4">
Hooks for test frameworks
</div>

<div class="mt-2 ml-4">
Shader library packaging formats
</div>

<!--
We actually started down the path of adding writing shader languages extensions because we were trying to fill some community needs for WebGPU tooling.

We discovered that we really wanted some language features to support tooling.

That's where we started. 

As we got going, we realized that

Extending the language outside the browser core makes sense for two reasons:
- it's easier to iterate: open source tools vs. multiple browsers.
- some features may never need to go into the browser core.
-->

---

# Support for WGSL/WebGPU

<div class="mt-8 space-y-6">

### WESL language features designed as potential WGSL features

### Collaborate on language experiments

### Support core WGSL/WebGPU development

</div>

<!--
We try to work closely with the WebGPU committee. 

WESL extensions are designed to be possible future WGSL features.

Our work is a support, not a substitute for WebGPU/WGSL.
-->

---

# WESL Language Aims


### Practical

Always driven by community needs

### Strict Superset of WGSL

<div class="ml-6 mt-4">
WGSL is WESL

WebGPU Conformance Test Suite (CTS)

</div>

### Support WebGPU Ecosystem

<!--
We drive language design from use cases from community shaders 
- and of course from tool development.

We want to help grow the ecosystem, not create a splinter language.

We maintain and test for strict upward compatibility with WGSL. Our tools run the same compatibility test suite as the browsers.

WGSL is WESL. 

All our tools support vanilla WGSL plus a sprinkling of extra features.
-->

---

# Power Features and Simple Users

<div>

<img src="/Power_Features.png" alt="Power Features" class="h-100" />

</div>

<!--
A thought on how we think about the **design center** for WebGPU/WGSL/WESL.

We expect that as WebGPU proliferates, there'll be a lot of small projects.
Lots of part time shader programmers. 
So there's a premium on **simplicity**.

Meanwhile we want to support useful libraries, and larger game engines,
like Bevy.  So we judiciously add power to the language.

Also, we're "blessed" with supporting multiple host languages. 

We try to chart a neutral path and not to match Rust or TypeScript or C++ 

or any other of our favorite languages like ocaml or scala or LEAN.
-->

---

# WESL Syntax

````md magic-move
```wgsl

alias Complex = vec2f;

fn mandelbrot(position: Complex) -> f32 { 
  .
  .
}

@fragment
fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let escaped = mandelbrot(uv * 3.0 - vec2f(2.0, 1.5));    
  let color = vec3f(escaped);
 
  return vec4(color, 1.0);
}
```
```wgsl
import super::graphics::mandelbrot;

@fragment
fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let escaped = mandelbrot(uv * 3.0 - vec2f(2.0, 1.5));    
  let color = vec3f(escaped);
 
  return vec4(color, 1.0);
}
```
```wgsl
import super::graphics::mandelbrot;
import lygia::color::palette::spectral::zucconi::zucconi6;

@fragment
fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let escaped = mandelbrot(uv * 3.0 - vec2f(2.0, 1.5));    
  let color = zucconi6(escaped);

  return vec4(color, 1.0);
}
```

```wgsl
import super::graphics::mandelbrot;
import lygia::color::palette::spectral::zucconi::zucconi6;

@fragment
fn main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let escaped = mandelbrot(uv * 3.0 - vec2f(2.0, 1.5));    

  @if(debug)
  let color = escaped;
  @else
  let color = zucconi6(escaped);

  return vec4(color, 1.0);
}
```

````

<!--
A peek at some of the extensions in WESL:

starts with WGSL

adds modules so people can split their shaders into separate files

adds packaged library support so people share the modules across organizations

adds conditionals so people can customize shaders at build or runtime
-->

---

# WESL Today

### Language Features
Import, conditional compilation

### Shader libraries for npm (JavaScript) and cargo (Rust)
Libraries of shader functions

<!--
Core feature set in our first release last year:

robust module system

conditional compilation

npm/cargo library support
-->

---

# WESL Tomorrow

### Module System Enhancements
<div class="mt-4 ml-6">
Wildcards

Visibility control
</div>

### Host / Shader Interface
<div class="mt-4 ml-6">
Parameterized modules 

Reflection

</div>

### Generics / Typeclasses
<br/>

<!--
There are a number of language features under way. Wildcards, visibility.

More attention on the shader/host interface in general.

Parameterized modules -> injected constants as conditions

Medium term, Reflection and Generics should enable a richer class of apps and libraries
-->

---

# WESL - a Shader Front End

```mermaid
flowchart LR

  W(WESL<br>WGSL):::data --> T

  T{{Transpiler}}:::transform

  T --> C(WGSL):::data
  --> D{{WebGPU}}:::transform
  --> E(SPIR-V<br>MSL<br>HLSL):::data

  classDef transform fill:#dbe9f2,stroke:#333;
  classDef data fill:#e3d5e3, stroke:#333;
```
<div class="mt-2 space-y-6">

### language ergonomics (modules, generics)

### shader/host code integration (reflection, injection)

</div>

<!--
Of course, there are limits to what we can do with WESL.

We a shader front end.

We can rewrite shader source code,

but the underlying vulkan/metal/D3D12 APIs are inaccessible to us. 

So we can try generics in WESL, but not bindless.
-->

---
layout: center
---

# Tools

---

# WESL Enables WebGPU Tooling

```mermaid
flowchart LR

  W(WESL<br>WGSL):::data --> T
  H(.ts<br>.rs):::data <--> T

  subgraph tools ["<br>WebGPU Tooling"]
   X{{"more tools"}}:::transform
   T{{Transpiler}}:::transform
  end

  style tools fill:#b5cbd2,stroke:#999

  T --> C(WGSL):::data
  --> D{{WebGPU}}:::transform
  --> E(SPIR-V<br>MSL<br>HLSL):::data

  classDef transform fill:#dbe9f2,stroke:#333;
  classDef data fill:#e3d5e3, stroke:#333;
```
<div class="mt-2 space-y-6">

### 2025 - Linking and Packaging Tools
### 2026 - Testing, Documentation, IDE tools

</div>

<!--
As mentioned, our goal has always been to enable WebGPU tools, 
not just language enhancements.

We started with linking and packaging tools.

More tools are coming. We'll show snapshots of those tools next.
-->

---

# WebGPU Tooling
For WESL and WGSL

<div class="grid grid-cols-2 gap-4 mt-4">

<div class="border rounded-lg p-4 bg-gray-50">

### Linking / Packaging
<div class="ml-4 mt-2">

wesl-plugin - vite/rollup/webpack 

build.rs - rust integration

wesl-cli - link or package from cli
</div>
</div>

<div class="border rounded-lg p-4 bg-green-50">

### Editor Support
<div class="ml-4 mt-2">

wgsl-analyzer - IDE Language Server

wgsl-edit - web editor

</div>

</div>

<div class="border rounded-lg p-4 bg-green-50">

### Documentation Tools 
<div class="ml-4 leading-8 mt-2">

wesl-doc - HTML documentation generator

wgsl-play - web samples

</div>
</div>


<div class="border rounded-lg p-4 bg-green-50">

### Test Tools
<div class="leading-8">

wgsl-test - native and vite/jest tests

wgsl-studio - IDE test runner

</div>

</div>

</div>

<!--
These are some of the needs we hear about from the community. 

Tools are underway for:

Editor support

Online documentation

Testing
-->

---

# Linking Shader Modules

<div class="grid grid-cols-2 gap-4 mt-8">

<div>


### TypeScript
```ts
import { link } from "wesl";
import appWesl from "./shaders/app.wesl?link";

const linked = await link(appWesl);

linked.createShaderModule(device);

```

**vite** / **webpack** / **rollup** plugins


</div>

<div>


### Rust
```rs
use wesl::Wesl;

let wgsl_str = Wesl::new("shaders")
    .compile("app.wesl")
    .unwrap()
    .to_string();
```

**build.rs** integration

</div>

</div>

<div class="space-y-6 mt-12">

### Transpile & link at build or runtime

### Cli linking tools available

</div>

<!--
A peek at what linking looks like for an app.

Our goal:

- very few lines of code to add WESL to a WebGPU project

- Meet developers where they are.
Enhance the tools/workflow they already use.

- so significant effort towards making e.g. JavaScript/TypeScript bundler plugins.

cli tools are also available for linking too, for users with more custom build setups

And a playground for people who want to view the WESL to WGSL transpilation.
-->

---

# npm and cargo Libraries

<div class="mt-8">

```mermaid
flowchart LR

  A(WGSL,WESL):::data
  --> B{{Packager}}:::process
  --> C(npm/cargo):::data
  --> D{{Transpiler}}:::process
  --> E{{WebGPU}}:::process
  
  F(App WESL):::data --> D

classDef process fill:#dbe9f2,stroke:#333;
classDef data fill:#e3d5e3, stroke:#333;

```
</div>

### Creating a Library
Package shaders for community sharing

### Tools are Library Aware
<div class="ml-4 mt-2">

- WGSL/WESL Language Server
- `wgsl-test`
- `<wgsl-play>`

</div>

<!--
-
-->

---

<img src="/lygia_npm.png" alt="Lygia npm pacakge" class="h-100" />

---

<img src="/lygia_cargo.png" alt="Lygia crate" class="h-100" />

---

# Designing a Library Format for WebGPU

<div class="mt-8 space-y-6">

### Text format for stability
Human-readable, diffable, versionable

### npm/cargo mappings
Don't reinvent package management

### Simple encoding = stable encoding
Minimize complexity for long-term compatibility

</div>

<!--
Zoom in on one issue that's been an ongoing interest for us: 

Enabling Libraries for WebGPU

The tools and extensions we've build are enough to now start a library ecosystem for WebGPU.

Chose to embed within existing packaging systems, not build a WebGPU specific one.

We've considered some compressed formats, but prefer text for stability.
-->

---

# JS Library Embedding
npm libraries are built by the package publisher

```ts
/// dist/weslBundle.js
import lygia_math_mod289 from "lygia/math/mod289";

export const weslBundle = {
  name: "lygia",
  edition: "2026_pre",
  modules: {
    "math/permute.wesl": `
      import lygia::math::mod289::mod289;
      fn permute(x: f32) -> f32 { return mod289(((x * 34.0) + 1.0) * x); }`
  },
  dependencies: [lygia_math_mod289],
};

export default weslBundle;
```

The js package format encodes shaders into JavaScript strings.

The library publisher builds the bundle.

<!--
The npm library bundle format looks like this:

mostly, just the shader text:
- plus a minimal set of metadata
- like the relative path, for module linking
- and dependencies to other bundles for inter-library references

-->

---

# Rust Library Embedding
cargo packages are built by the package user

<div class="grid grid-cols-2 gap-4 mt-4">
<div>

```rs
/// lib.rs
use wesl::wesl_pkg;

wesl_pkg!(random);
```
</div>

<div>
```rs
/// build.rs
fn main() {
  wesl::PkgBuilder::new("random")
    .scan_root("src/shaders").unwrap()
    .build_artifact().unwrap();
}
```

</div>
</div>

Rust packages contain shader sources plus build instructions.

The wesl_pkg macro loads the sources into Rust strings. 

The library user builds the bundle.

<!--
the rust format is similar internally

the rust build conventions are of course a bit different than JavaScript.
-->

---

# wgsl-test / wgsl-studio

```mermaid
flowchart LR

  A(WGSL,WESL):::data
  --> B{{Reflection}}:::process
  --> C{{Test Runner}}:::process
  --> D{{wgsl-studio}}:::process

  C --> E{{vitest}}:::process

classDef process fill:#dbe9f2,stroke:#333;
classDef data fill:#e3d5e3, stroke:#333;

```

<div class="space-y-4">

### Unit Testing
Test shader functions with assertions in WGSL or TypeScript

### Image Snapshot Testing
Visual regression testing with diff reports

### wgsl-studio
VS Code extension for running tests, previewing images

</div>

<!--
Goal: integrate with existing test frameworks and VSCode

- Unit testing (something increasingly important in the AI era)

- image snapshot testing

[add image snapshots:
- see src of unit and regression test
- vitest terminal runs test
- see image regression
- see wgsl-studio test runner / failure
- see wgsl-studio embedded player
]
-->

---


# wgsl-play / wgsl-edit

<div class="mt-8 space-y-6">

### Interactive Code Samples
Editable shader examples embedded in documentation

### Live Preview
See shader output in real-time as you edit

</div>

<!--
mandelbrot in player

mandelbrot, edit live

[embed in slidehow]
-->

---

# wgsl-analyzer

<div class="mt-8 space-y-6">

### Language Server for WGSL/WESL

- Syntax highlighting
- Error diagnostics
- Go to definition
- Autocomplete
- Hover information
- Formatter

</div>

<!--
TBD
-->

---
layout: center
---

# Closing Thoughts

---

# WESL for other Shader Languages?

<div>

### Lowest common denominator for WebGPU reuse:
<div class="mt-4 ml-6">
WGSL + modules

basic conditional compilation
</div>

### Define stable subset of WESL as target format?
<div class="mt-4 ml-6">
npm/cargo packaging for libraries

reuse the tool ecosystem 
</div>

</div>

<!--
As WebGPU grows in popularity, and 
especially if our tooling proves useful...

It might be helpful to define a stable subset of WESL for other languages to target. Arguably what you want is wgsl+modules and conditions.

After all, if you want to target WebGPU, you'll likely face the same ecosystem tooling integration issues that led us down this path.
-->

---

# Extension Language Roles

<div class="mt-8 space-y-6">

### Elm
A respected niche language in a divergent direction

### TypeScript
Transpiling becomes a permanent part of the ecosystem

### Scala
Pioneer features that often migrate to the base language

<v-click>

### WESL
We'll see!

</v-click>

</div>

<!--
We think WESL and its tooling can be an ongoing help for the WebGPU community. 

What role WESL will play is uncertain..
-->

---

# Advice Welcome
WESL has a lot to learn

We'd love to hear experiences from other shader communities.

### Current Discussions

- wildcard imports
- parameterized modules
- visibility: modules, libraries, and shader-to-host
- generics / typeclasses / context classes
- reflection

<!-- 
We'd love your advice on shader languages.

Really on any topic, but I've listed a few that we're currently talking about.
-->

---
layout: center
---

# Thank You

<div class="mt-12">

[wesl-lang.dev](https://wesl-lang.dev) 

[WESL discord](http://discord.gg/Ty7MjWVfvh)

</div>

---
layout: center
---

# Extras

---

# Extensions enable ecosystem tools

<div class="mt-4">

_\+ imports + std config_ <v-click><span>→ cli link, vite plugins, language server</span></v-click>

<v-click>

<v-click>

_\+ packaging format_ <v-click><span>→ npm/cargo libraries </span></v-click>
</v-click>

_\+ annotations + reflection_ <v-click><span>→ wgsl-test</span></v-click>

</v-click>

<v-click>

_\+ libraries_ <v-click><span>→ wgsl-play, wgsl-edit</span></v-click>
</v-click>

<v-click>

_\+ conditions + visibility + generics_ <v-click><span>→ richer libraries</span></v-click>
</v-click>

</div>

<!--
Pooling user requested extensions lets us make *shared tooling* to benefit many projects.

And tools themselves create new needs from the shader language. 

A virtuous cycle.
-->
