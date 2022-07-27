// Styles
import * as css from './index.css';
// Components
import TerrainFeature from '../battle_map/terrain_feature';
// Assets
import { 
  rockImg,
  rocksImg,
  treeImg,
  treesImg,
  doubleHillImg,
  cornerHillAImg,
  hillImg,
  houseAImg,
  cornerWallImg,
  pondAImg,
  roadAImg, 
  towerImg
} from '../../utils/terrain';
// Utils
import { TERRAIN_TYPES } from '../../utils/constants';

export default class TerrainMenu {
    constructor (elem, layer) {
      if (!elem) return
      this.elem = elem;
      this.layer = layer;
      const { 
        ROCK, ROCKS, HILL, DOUBLE_HILL,
        TREE, TREES, HOUSE_A, CORNER_WALL,
        CORNER_HILL_A, POND_A, ROAD_A, TOWER
      } = TERRAIN_TYPES;

      this.terrain = [
        { img: rockImg, name: ROCK }, { img: rocksImg, name: ROCKS},
        { img: treeImg, name: TREE }, { img: cornerHillAImg, name: CORNER_HILL_A },
        { img: treesImg, name: TREES }, { img: doubleHillImg, name: DOUBLE_HILL },
        { img: hillImg, name: HILL }, { img: houseAImg, name: HOUSE_A },
        { img: cornerWallImg, name: CORNER_WALL }, { img: pondAImg, name: POND_A },
        { img: roadAImg, name: ROAD_A }, { img: towerImg, name: TOWER }
      ]
    }

    render () {
        if (this.elem) { 
          this.elem.insertAdjacentHTML(
            'beforeend', 
            `
              <ul id="menu-item-list"></ul>
            `
          );

          this.terrain.forEach(({img, name}, idx) => {
            const HTML = `
              <li class="menu-item-list-item" data-menu-item="item-${idx}">
                <img src=${img.src} alt="terrain" width="100" height="100" />
                <p>${name.charAt(0).toUpperCase() + name.slice(1)}</p>
              </li>
            `
            document.getElementById('menu-item-list').insertAdjacentHTML('beforeend', HTML)
            const terrainItem = document.querySelector(`[data-menu-item='item-${idx}']`);
            terrainItem.addEventListener('click', (e) => {
              const feature = new TerrainFeature(this.layer, name);
              feature.render();
            });
          });


        } else {
          return null;
        }
    }
}
