/**
 * @class StartMenu
 * @extends {SettingAffectingMenu}
 * 
 */

require('./Overlay');

import SettingAffectingMenu from './SettingAffectingMenu';

export default class StartMenu extends SettingAffectingMenu{
    constructor(renderTarget){
        super(renderTarget);
    }
}