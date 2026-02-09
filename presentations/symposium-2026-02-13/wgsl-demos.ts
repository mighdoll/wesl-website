import "wgsl-edit"
import "wgsl-play"
import mandelbrotSrc from "./mandelbrot.wesl?raw"
import gradientSrc from "./gradient.wesl?raw"

export { mandelbrotSrc, gradientSrc }

/** Stop keyboard events from bubbling to Slidev navigation */
function trapKeys(el: HTMLElement) {
  for (const evt of ["keydown", "keyup", "keypress"] as const) {
    el.addEventListener(evt, (e) => e.stopPropagation())
  }
}

export function initPlayer(id: string, src: string) {
  const el = document.getElementById(id)
  if (!el) return
  trapKeys(el)
  const trySet = () => { (el as any).source = src }
  // Set source after WebGPU is ready, or retry if not yet initialized
  el.addEventListener("ready", trySet, { once: true })
  // Also try immediately in case it's already ready
  trySet()
}

export function initEditor(id: string, src: string) {
  const el = document.getElementById(id)
  if (!el) return
  trapKeys(el)
  ;(el as any).source = src
}

export function connectPlayerToEditor(playerId: string, editorId: string) {
  const player = document.getElementById(playerId)
  if (player) {
    trapKeys(player)
    player.setAttribute("source", editorId)
  }
  const editor = document.getElementById(editorId)
  if (editor) {
    editor.setAttribute("lint-from", playerId)
  }
}
