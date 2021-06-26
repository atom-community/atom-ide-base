"use babel"
import { StyleReader } from "../commons-ui/dom-style-reader"

const styles = `
  atom-text-editor {
    position: relative;
  }

  atom-text-editor-minimap[stand-alone] {
    width: 100px;
    height: 100px;
  }

  atom-text-editor {
    line-height: 17px;
  }

  atom-text-editor atom-text-editor-minimap {
    background: rgba(255,0,0,0.3);
  }

  atom-text-editor atom-text-editor-minimap .minimap-scroll-indicator {
    background: rgba(0,0,255,0.3);
  }

  atom-text-editor atom-text-editor-minimap .minimap-visible-area {
    background: rgba(0,255,0,0.3);
    opacity: 1;
  }

  atom-text-editor atom-text-editor-minimap .open-minimap-quick-settings {
    opacity: 1 !important;
  }
`

describe("StyleReader", () => {
  const styleReader = new StyleReader()

  let body: HTMLElement
  let targetElement: HTMLElement

  beforeEach(async () => {
    body = atom.workspace.getElement()
    jasmine.attachToDOM(body)
    targetElement = (await atom.workspace.open(__filename)).getElement()

    const styleNode = document.createElement("style")
    styleNode.textContent = styles
    body.appendChild(styleNode)
  })

  it("can get the color of the text", () => {
    expect(styleReader.retrieveStyleFromDom([".editor"], "color", targetElement, true)).toEqual(`rgb(157, 165, 180)`)
  })

  describe("color rotation", () => {
    let additionnalStyleNode

    function setup(color = "read") {
      styleReader.invalidateDOMStylesCache()

      additionnalStyleNode = document.createElement("style")
      additionnalStyleNode.textContent = `
        atom-text-editor .editor, .editor {
          color: ${color};
          -webkit-filter: hue-rotate(180deg);
        }
      `

      body.appendChild(additionnalStyleNode)
    }

    it("when a hue-rotate filter is applied to a rgb color computes the new color by applying the hue rotation", () => {
      setup("red")
      expect(styleReader.retrieveStyleFromDom([".editor"], "color", targetElement, true)).toEqual(`rgb(0, 109, 109)`)
    })

    it("computes the new color by applying the hue rotation", () => {
      setup("rgba(255, 0, 0, 0)")
      expect(styleReader.retrieveStyleFromDom([".editor"], "color", targetElement, true)).toEqual(
        `rgba(0, 109, 109, 0)`
      )
    })
  })
})
