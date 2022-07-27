// Libraries
import Konva from 'konva';
// Components
import Stage from './Stage';
import TerrainMenu from '../terrain_menu/index';
// Styles
import * as css from './index.css';
// Assets
import { mapImg } from '../../utils/terrain';

export default class BattleMap {
    constructor(elem) {
      this.elem = elem;
      this.stage = new Konva.Stage({
        container: "battle-map",
        width: mapImg.width,
        height: mapImg.height,
      });
      this.layer = new Konva.Layer();

      this.battleMap = new Konva.Rect({
        x: 0,
        y: 0,
        width: mapImg.width,
        height: mapImg.height,
        fillPatternImage: mapImg,
      });
      this.tr = new Konva.Transformer();
    }

    renderInitalBattleMap () {
      this.layer.add(this.battleMap);
      this.layer.add(this.tr);
      this.layer.draw();
      this.stage.add(this.layer);
    }

    render () {
      this.renderInitalBattleMap();
      const stage = new Stage(this.stage, this.layer, this.tr, this.battleMap, document.getElementById('battle-map-container'))
      stage.render();
      const terrainMenu = new TerrainMenu(document.getElementById('terrain-menu'), this.layer);
      terrainMenu.render();
    }
}
