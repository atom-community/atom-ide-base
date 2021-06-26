"use strict"

/**
 * This class is used to read the styles informations (e.g. color and background-color) from the DOM to use when
 * rendering canvas. This is used in Minimap and Terminal It attaches a dummyNode to the targetNode, renders them, and
 * finds the computed style back.
 */
export class StyleReader {
  /** The cache object */
  private domStylesCache = new Map<string, Record<string, string | undefined>>()

  private dummyNode?: HTMLElement

  /** Used to check if the dummyNode is on the current targetNode */
  private targetNode?: HTMLElement

  /** Set to true once tokenized */
  // private hasTokenizedOnce = false

  /**
   * Returns the computed values for the given property and scope in the DOM.
   *
   * This function insert a dummy element in the DOM to compute its style, return the specified property, and clear the
   * content of the dummy element.
   *
   * @param scopes A list of classes reprensenting the scope to build
   * @param property The name of the style property to compute
   * @param targetNode
   * @param getFromCache Whether to cache the computed value or not
   * @returns The computed property's value used in CanvasDrawer
   */
  retrieveStyleFromDom(
    scopes: string[],
    property: string,
    targetNode: HTMLElement,
    getFromCache: boolean = true
  ): string {
    if (scopes.length === 0) {
      return ""
    } // no scopes
    const key = scopes.join(" ")
    let cachedData = this.domStylesCache.get(key)

    if (cachedData !== undefined) {
      if (getFromCache) {
        // if should get the value from the cache
        const value = cachedData[property]
        if (value !== undefined) {
          // value exists
          return value
        } // value not in the cache - get fresh value
      } // don't use cache - get fresh value
    } else {
      // key did not exist. create it
      cachedData = {}
    }

    this.ensureDummyNodeExistence(targetNode)
    const dummyNode = this.dummyNode as HTMLElement

    let parent = dummyNode
    for (let i = 0, len = scopes.length; i < len; i++) {
      const scope = scopes[i]
      const node = document.createElement("span")
      node.className = scope.replace(dotRegexp, " ") // TODO why replace is needed?
      parent.appendChild(node)
      parent = node
    }

    const style = window.getComputedStyle(parent)
    let value = style.getPropertyValue(property)

    // rotate hue if webkit-filter available
    const filter = style.getPropertyValue("-webkit-filter")
    if (filter.includes("hue-rotate")) {
      value = rotateHue(value, filter)
    }

    if (value !== "") {
      cachedData[property] = value
      this.domStylesCache.set(key, cachedData)
    }

    dummyNode.innerHTML = ""
    return value
  }

  /**
   * Creates a DOM node container for all the operations that need to read styles properties from DOM.
   *
   * @param targetNode
   */
  private ensureDummyNodeExistence(targetNode: HTMLElement) {
    if (this.targetNode !== targetNode || this.dummyNode === undefined) {
      this.dummyNode = document.createElement("span")
      this.dummyNode.style.visibility = "hidden"

      // attach to the target node
      targetNode.appendChild(this.dummyNode)
      this.targetNode = targetNode
    }
  }

  /** Invalidates the cache by emptying the cache object. used in MinimapElement */
  invalidateDOMStylesCache() {
    this.domStylesCache.clear()
  }

  /** Invalidates the cache only for the first tokenization event. */
  /*
  private invalidateIfFirstTokenization () {
    if (this.hasTokenizedOnce) {
      return
    }
    this.invalidateDOMStylesCache()
    this.hasTokenizedOnce = true
  }
  */
}

//    ##     ## ######## ##       ########  ######## ########   ######
//    ##     ## ##       ##       ##     ## ##       ##     ## ##    ##
//    ##     ## ##       ##       ##     ## ##       ##     ## ##
//    ######### ######   ##       ########  ######   ########   ######
//    ##     ## ##       ##       ##        ##       ##   ##         ##
//    ##     ## ##       ##       ##        ##       ##    ##  ##    ##
//    ##     ## ######## ######## ##        ######## ##     ##  ######

const dotRegexp = /\.+/g
const rgbExtractRegexp = /rgb(a?)\((\d+), (\d+), (\d+)(, (\d+(\.\d+)?))?\)/
const hueRegexp = /hue-rotate\((-?\d+)deg\)/

/**
 * Computes the output color of `value` with a rotated hue defined in `filter`.
 *
 * @param value The CSS color to apply the rotation on
 * @param filter The CSS hue rotate filter declaration
 * @returns The rotated CSS color
 */
function rotateHue(value: string, filter: string): string {
  const match = value.match(rgbExtractRegexp)
  if (match === null) {
    return ""
  }
  const [, , rStr, gStr, bStr, , aStr] = match

  const hueMatch = filter.match(hueRegexp)
  if (hueMatch === null) {
    return ""
  }

  const [, hueStr] = hueMatch

  let [r, g, b, a, hue] = [rStr, gStr, bStr, aStr, hueStr].map(Number)
  ;[r, g, b] = rotate(r, g, b, hue)

  if (isNaN(a)) {
    return `rgb(${r}, ${g}, ${b})`
  } else {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  }
}

/**
 * Computes the hue rotation on the provided `r`, `g` and `b` channels by the amount of `angle`.
 *
 * @param r The red channel of the color to rotate
 * @param g The green channel of the color to rotate
 * @param b The blue channel of the color to rotate
 * @param angle The angle to rotate the hue with
 * @returns The rotated color channels
 */
function rotate(r: number, g: number, b: number, angle: number): number[] {
  const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1]
  const lumR = 0.2126
  const lumG = 0.7152
  const lumB = 0.0722
  const hueRotateR = 0.143
  const hueRotateG = 0.14
  const hueRotateB = 0.283
  const cos = Math.cos((angle * Math.PI) / 180)
  const sin = Math.sin((angle * Math.PI) / 180)

  matrix[0] = lumR + (1 - lumR) * cos - lumR * sin
  matrix[1] = lumG - lumG * cos - lumG * sin
  matrix[2] = lumB - lumB * cos + (1 - lumB) * sin
  matrix[3] = lumR - lumR * cos + hueRotateR * sin
  matrix[4] = lumG + (1 - lumG) * cos + hueRotateG * sin
  matrix[5] = lumB - lumB * cos - hueRotateB * sin
  matrix[6] = lumR - lumR * cos - (1 - lumR) * sin
  matrix[7] = lumG - lumG * cos + lumG * sin
  matrix[8] = lumB + (1 - lumB) * cos + lumB * sin

  return [
    clamp(matrix[0] * r + matrix[1] * g + matrix[2] * b),
    clamp(matrix[3] * r + matrix[4] * g + matrix[5] * b),
    clamp(matrix[6] * r + matrix[7] * g + matrix[8] * b),
  ]
}

function clamp(num: number) {
  return Math.ceil(Math.max(0, Math.min(255, num)))
}
