// Libraries
import Konva from "konva";
// Constants
import { KEYS } from "../../utils/constants";

import TerrainFeature from "./terrain_feature";

export default class Stage {
  constructor(stage, layer, tr, battleMap, elem) {
    this.elem = elem;
    this.stage = stage;
    this.layer = layer;
    this.tr = tr;
    this.battleMap = battleMap;
    this.selectionRectangle = new Konva.Rect({
      fill: "rgba(0,0,0,0.5)",
      visible: false,
    });
    this.layer.add(this.selectionRectangle);

    // For controlling position of items
    this.x1 = undefined;
    this.y1 = undefined;
    this.x2 = undefined;
    this.y2 = undefined;

    // For Controlling c/p
    this.copies = [];
  }

  initializeEventHandlers() {
    this.stage.on("mousedown", (e) => {
      // do nothing if we mousedown on any shape
      if (e.target !== this.battleMap) {
        return;
      }
      e.evt.preventDefault();
      this.x1 = this.stage.getPointerPosition().x;
      this.y1 = this.stage.getPointerPosition().y;
      this.x2 = this.stage.getPointerPosition().x;
      this.y2 = this.stage.getPointerPosition().y;

      this.selectionRectangle.visible(true);
      this.selectionRectangle.width(0);
      this.selectionRectangle.height(0);
    });

    this.stage.on("mousemove", (e) => {
      // do nothing if we didn't start selection
      if (!this.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      this.x2 = this.stage.getPointerPosition().x;
      this.y2 = this.stage.getPointerPosition().y;

      this.selectionRectangle.setAttrs({
        x: Math.min(this.x1, this.x2),
        y: Math.min(this.y1, this.y2),
        width: Math.abs(this.x2 - this.x1),
        height: Math.abs(this.y2 - this.y1),
      });
    });

    this.stage.on("mouseup", (e) => {
      // do nothing if we didn't start selection
      if (!this.selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        this.selectionRectangle.visible(false);
      });

      const shapes = this.stage.find(".rect");
      const box = this.selectionRectangle.getClientRect();
      const selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      this.tr.nodes(selected);
    });

    this.stage.on("click tap", (e) => {
      // if we are selecting with rect, do nothing
      if (this.selectionRectangle.visible()) {
        return;
      }

      // if click on empty area - remove all selections
      if (e.target === this.stage) {
        this.tr.nodes([]);
        return;
      }

      // do nothing if clicked NOT on our rectangles
      if (!e.target.hasName("rect")) {
        return;
      }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = this.tr.nodes().indexOf(e.target) >= 0;

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        this.tr.nodes([e.target]);
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = this.tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        this.tr.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = this.tr.nodes().concat([e.target]);
        this.tr.nodes(nodes);
      }
    });

    this.elem.addEventListener("keydown", (e) => {
      if (e.key === KEYS.backspace) {
        this.tr.nodes().forEach((node) => node.destroy());
        this.tr.nodes([]);
      }

      //it was Ctrl + C (Cmd + C)
      if (e.key === KEYS.c && (e.ctrlKey || e.metaKey)) {
        this.copies = this.tr.nodes().map((node) => node.clone());
      }

      if (e.key === KEYS.v && (e.ctrlKey || e.metaKey)) {
        this.copies.forEach((copy) => this.layer.add(copy));
        this.copies = [];
      }
    });

    this.elem.querySelector("#save-map").addEventListener("click", () => {
      function downloadURI(uri, name) {
        let link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link = null;
      }
      const dataURL = this.stage.toDataURL();
      downloadURI(dataURL, "stage.png");
    });
  }

  render() {
    this.initializeEventHandlers();
  }
}
