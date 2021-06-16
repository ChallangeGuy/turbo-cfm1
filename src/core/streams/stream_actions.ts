import { StreamElement } from "../../elements/stream_element"

export const StreamActions: { [action: string]: (this: StreamElement) => void } = {
  after() {
    this.targetElement?.parentElement?.insertBefore(this.templateContent,this.targetElement.nextSibling)
  },

  append() {
    this.removeDuplicateTargetChildren()
    this.targetElements?.forEach(e => e.append(this.templateContent))
  },

  before() {
    this.targetElement?.parentElement?.insertBefore(this.templateContent,this.targetElement)
  },

  prepend() {
    this.removeDuplicateTargetChildren()
    this.targetElements?.forEach(e => e.prepend(this.templateContent))
  },

  remove() {
    this.targetElements?.forEach(e => e.remove())
  },

  replace() {
    this.targetElements?.forEach(e => e.replaceWith(this.templateContent))
  },

  update() {
    if (this.targetElements) {
      this.targetElements.forEach(e => e.innerHTML = "")
      this.targetElements.forEach(e => e.append(this.templateContent))
    }
  }
}
