/**
 * @class PauseMenu
 * @extends {SettingAffectingMenu}
 * 
 */

require('./Overlay');

import SettingAffectingMenu from './SettingAffectingMenu';

export default class PauseMenu extends SettingAffectingMenu{
    constructor(renderTarget){
        super(renderTarget);
    }
}