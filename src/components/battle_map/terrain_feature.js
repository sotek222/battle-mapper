// Libraries
import Konva from 'konva';
// Styles
import * as css from './index.css';
// Assets
import { 
  rockImg, 
  rocksImg,
  treeImg,
  treesImg,
  cornerHillAImg,
  doubleHillImg,
  hillImg,
  houseAImg,
  cornerWallImg, 
  pondAImg,
  roadAImg,
  towerImg
} from '../../utils/terrain';
// Utils
import { TERRAIN_TYPES } from '../../utils/constants';
const { 
  ROCK, ROCKS, HILL, DOUBLE_HILL,
  TREE, TREES, HOUSE_A, CORNER_WALL,
  CORNER_HILL_A, POND_A, ROAD_A, TOWER
} = TERRAIN_TYPES;
const terrainMap = {
  [ROCK]: rockImg,
  [ROCKS]: rocksImg,
  [HILL]: hillImg,
  [DOUBLE_HILL]: doubleHillImg,
  [TREE]: treeImg,
  [TREES]: treesImg,
  [HOUSE_A]: houseAImg,
  [CORNER_HILL_A]: cornerHillAImg,
  [CORNER_WALL]: cornerWallImg,
  [POND_A]: pondAImg,
  [ROAD_A]: roadAImg,
  [TOWER]: towerImg
}

export default class TerrainFeature {
    constructor(layer, type = TERRAIN_TYPES.ROCK) {
      this.layer = layer;
      const img = terrainMap[type];

      this.terrain = new Konva.Rect({
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
        fillPatternImage: img,
        name: 'rect',
        draggable: true,
      })
    }

    render () {
      this.layer.add(this.terrain);
    }
}
