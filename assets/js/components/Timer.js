'use strict'

export default class Timer {
    /**
     * Controla o timer.
     * 
     * @param {integer} seconds Segundos que o timer devee contar.
     * @param {HTMLElement} timerElement Elemento do timer.
     */
    constructor(seconds, timerElement) {
        this.originalSeconds = this.currentSeconds = timerElement.innerText = seconds;
        this.timerElement = timerElement;

        this.timeout;
        this.timerEvent = new CustomEvent('timer.reset');
    }

    /**
     * Inicia o timer.
     */
    play() {
        this.timeout = setTimeout(() => {
            this.currentSeconds -= 1;
            if (this.currentSeconds < 0) {
                this.currentSeconds = this.originalSeconds;

                this.timerElement.dispatchEvent(this.timerEvent);
            }

            this.timerElement.innerText = this.currentSeconds;
            
            this.play();
        }, 1000);
    }

    /**
     * Pausa o timer;
     */
    pause() {
        clearTimeout(this.timeout);
    }
}