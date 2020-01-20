const template = document.createElement('template');
template.innerHTML = `
<style>
.size
{
    width:100%;
    height:100%;
    background-color:#a0a0a0;
}
</style>
<canvas id="joystick"></canvas>
`;

class JoyStick extends HTMLElement
{
    constructor()
    {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback()
    {
        console.log('connected!');

        console.log(this.style.width);
        let joyCanvas = this._shadowRoot.getElementById("joystick");
        joyCanvas.style.width=this.style.width;
        joyCanvas.style.height=this.style.height;
    }

    disconnectedCallback()
    {
        console.log('disconnected!');
    }
}

window.customElements.define('wc-joystick', JoyStick);