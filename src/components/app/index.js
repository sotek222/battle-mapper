// Components
import BattleMap from '../battle_map/index';
// Styles
import * as css from './index.css';

export default class App {
    constructor (elem) {
      if (!elem) return
      this.elem = elem;

      this.battleMap = new BattleMap(document.getElementById('battle-map-container'));
    }

    render () {
        if (this.elem) { 
          this.battleMap.render();
        } else {
          return null;
        }
    }
}
