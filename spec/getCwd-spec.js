/** @babel */

import { getCwd } from "../commons-atom/getCwd.js"

describe("getCwd", () => {
  it("returns current directory given the current file", async function () {
    expect(await getCwd(__filename)).toBe(__dirname)
  })

  it("returns current directory given the current directory", async function () {
    expect(await getCwd(__dirname)).toBe(__dirname)
  })

  it("returns undefined when no project paths set", async function () {
    expect(await getCwd()).toBe(undefined)
  })

  it("returns first current project path", async function () {
    atom.project.setPaths([__dirname])
    expect(await getCwd()).toBe(__dirname)
  })

  it("reurns current project path when previous active item that has no getPath() method", async () => {
    atom.project.setPaths([__dirname])
    spyOn(atom.workspace, "getActivePaneItem").and.returnValue({})
    expect(await getCwd()).toBe(__dirname)
  })

  it("reurns current project path when previous active item that has getPath() method", async () => {
    const previousActiveItem = jasmine.createSpyObj("previousActiveItem", ["getPath"])
    previousActiveItem.getPath.and.returnValue(__dirname)
    spyOn(atom.workspace, "getActivePaneItem").and.returnValue(previousActiveItem)
    expect(await getCwd()).toBe(__dirname)
  })

  it("reurns current project path when previous active item that has getPath() method returns file path", async () => {
    const previousActiveItem = jasmine.createSpyObj("previousActiveItem", ["getPath"])
    previousActiveItem.getPath.and.returnValue(__filename)
    spyOn(atom.workspace, "getActivePaneItem").and.returnValue(previousActiveItem)
    expect(await getCwd()).toBe(__dirname)
  })

  it("reurns current project path when previous active item which exists in project path", async () => {
    const previousActiveItem = jasmine.createSpyObj("previousActiveItem", ["getPath"])
    previousActiveItem.getPath.and.returnValue("/some/dir/file")
    spyOn(atom.workspace, "getActivePaneItem").and.returnValue(previousActiveItem)
    const expected = ["/some/dir", null]
    spyOn(atom.project, "relativizePath").and.returnValue(expected)
    expect(await getCwd()).toBe(expected[0])
  })
})
