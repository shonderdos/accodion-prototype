'use-strict';

class SHPane extends HTMLElement {

    get header() {
        if(!this._header) {
            this._header = this.querySelector('button[role="tab"]')
        }

        return this._header;
    }

    get content() {
        if(!this._content) {
            this._content = this.querySelector('.content')
        }

        return this._content;
    }

    attachedCallback() {
        this.header.addEventListener('click', () => {
            const customEvent = new CustomEvent('panel-change', {
                bubbles: true
            });

            this.dispatchEvent(customEvent);

        });
    }
}

document.registerElement('sh-pane', SHPane);