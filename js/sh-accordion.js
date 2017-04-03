'use-strict';

class SHAccordion extends HTMLElement {

    static get KEY_LEFT(){
        return 37;
    }

    static get KEY_UP(){
        return 38;
    }

    static get KEY_RIGHT(){
        return 39;
    }

    static get KEY_DOWN(){
        return 40;
    }

    createdCallback(){
        this._panes = null;
    }

    attachedCallback(){
        this._panes = this.querySelectorAll('sh-pane');
        this._calculateGeometries();
        this._movePanels();
        this._addEventListeners();

        requestAnimationFrame(() => this.setAttribute('active', ''));
    }

    detachedCallback(){

    }

    _addEventListeners() {
        this.addEventListener('panel-change', this._onPanelChange);
        this.addEventListener('keydown', this._onKeyDown);
    }

    _onKeyDown(evt){

        const panesArray = Array.from(this._panes);
        const selectedItem = this.querySelector('sh-pane [role="tab"]:focus');
        let index = panesArray.indexOf(selectedItem.parentNode);

        switch (evt.keyCode){
            case SHAccordion.KEY_LEFT:
            case SHAccordion.KEY_UP:
                index--;
                break;
            case SHAccordion.KEY_RIGHT:
            case SHAccordion.KEY_DOWN:
                index++;
                break;

            default: break;
        }

        if(index < 0){
            index = 0;
        } else if( index >= this._panes.length){
            index = this._panes.length - 1;
        }

        panesArray[index].header.focus();
    }

    _onPanelChange(evt) {
        this._panes.forEach(pane => {
            pane.setAttribute('aria-expended', 'false');
        });
        evt.target.setAttribute('aria-expended', 'true');

        requestAnimationFrame(() => this._movePanels());
    }

    _calculateGeometries(){
        if(this._panes.length === 0) {
            return;
        }

        this._headerHeight = this._panes[0].header.offsetHeight;
        this._availableHeight =  this.offsetHeight - (this._panes.length * this._headerHeight);
    }

    _movePanels(){
        let baseY = 0;

        this._panes.forEach((pane,index) => {

            pane.style.transform = `translateY(${baseY + (this._headerHeight * index)}px)`;
            pane.content.style.height = `${this._availableHeight}px`;

            if(pane.getAttribute('aria-expended') === 'true') {
                baseY = this._availableHeight;
            }
        });
    }
}

document.registerElement('sh-accordion', SHAccordion);