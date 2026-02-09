import "wgsl-edit"
import "wgsl-play"
import mandelbrotSrc from "./mandelbrot.wesl?raw"
import graphicsSrc from "./graphics.wesl?raw"
import gradientSrc from "./gradient.wesl?raw"

export const mandelbrotProject = {
  weslSrc: {
    "main.wesl": mandelbrotSrc,
    "graphics.wesl": graphicsSrc,
  },
}

export const gradientProject = {
  weslSrc: {
    "main.wesl": gradientSrc,
  },
}

/** Stop keyboard events from bubbling to Slidev navigation */
function trapKeys(el: HTMLElement) {
  for (const evt of ["keydown", "keyup", "keypress"] as const) {
    el.addEventListener(evt, (e) => e.stopPropagation())
  }
}

export function initPlayer(id: string, project: Record<string, unknown>) {
  const el = document.getElementById(id)
  if (!el) return
  trapKeys(el)
  ;(el as any).project = project
}

export function initEditor(id: string, project: Record<string, unknown>) {
  const el = document.getElementById(id)
  if (!el) return
  trapKeys(el)
  ;(el as any).project = project
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
