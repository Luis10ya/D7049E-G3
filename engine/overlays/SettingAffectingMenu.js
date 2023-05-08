import Overlay from './Overlay';
import FullscreenMenu from './FullscreenMenu';
import Setting from './Setting';

/**
 * @class SettingAffectingMenu
 * @extends {FullscreenMenu}
 * 
 */
export default class SettingAffectingMenu extends FullscreenMenu{

    constructor(renderTarget){
        super(renderTarget);
        this.affectableSettings = new Array();
    }
    

    /**
     * 
     * @param {Setting} setting 
     */
    addAffectableSetting(setting){
        this.affectableSettings.push(setting);

        renderable = new Element(setting.getDisplayName());
        renderable.createTextNode(setting.getDisplayName());
        slider = new Element();
        slider.innerHTML = '< input type="range" min="0" max="100" class="Slider" >';
        slider.addEventListener("onmouseup", function() {
            this.setting.setValue(slider.value);
            this.setting.sendMessage();
        });
        
        this.addElement();
    }


}