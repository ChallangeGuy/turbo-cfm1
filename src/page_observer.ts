export interface PageObserverDelegate {
  pageBecameInteractive(): void
  pageLoaded(): void
  pageInvalidated(): void
}

export enum PageStage {
  initial,
  loading,
  interactive,
  complete,
  invalidated
}

export class PageObserver {
  readonly delegate: PageObserverDelegate
  stage = PageStage.initial
  started = false

  constructor(delegate: PageObserverDelegate) {
    this.delegate = delegate
  }

  start() {
    if (!this.started) {
      if (this.stage == PageStage.initial) {
        this.stage = PageStage.loading
      }
      document.addEventListener("readystatechange", this.interpretReadyState, false)
      this.started = true
    }
  }

  stop() {
    if (this.started) {
      document.removeEventListener("readystatechange", this.interpretReadyState, false)
      this.started = false
    }
  }

  invalidate() {
    if (this.stage != PageStage.invalidated) {
      this.stage = PageStage.invalidated
      this.delegate.pageInvalidated()
    }
  }

  interpretReadyState = () => {
    const { readyState } = this
    if (readyState == "interactive") {
      this.pageIsInteractive()
    } else if (readyState == "complete") {
      this.pageIsComplete()
    }
  }

  pageIsInteractive() {
    if (this.stage == PageStage.loading) {
      this.stage = PageStage.interactive
      this.delegate.pageBecameInteractive()
    }
  }

  pageIsComplete() {
    this.pageIsInteractive()
    if (this.stage == PageStage.interactive) {
      this.stage = PageStage.complete
      this.delegate.pageLoaded()
    }
  }

  get readyState() {
    return document.readyState
  }
}
