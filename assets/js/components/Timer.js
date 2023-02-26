'use strict'

export default class Timer {
    /**
     * Controla o timer.
     * 
     * @param {integer} seconds Segundos que o timer devee contar.
     * @param {HTMLElement} timerElement Elemento do timer.
     */
    constructor(seconds, timerElement) {
        this.originalSeconds = this.currentSeconds = seconds;
        this.timerElement = timerElement;

        this.timeout;
        this.timerEvent = new CustomEvent('timer.reset');
    }

    /**
     * Inicia o timer.
     */
    play() {
        if (this.status !== 'played') {
            this.status = 'played';

            this._controllerTimerSteps();
        }
    }

    /**
     * Pausa o timer.
     */
    pause() {
        clearTimeout(this.timeout);

        this.status = 'paused';
    }

    /**
     * Para o timer, resetando o tempo inicial.
     */
    stop() {
        this.pause();

        this.currentSeconds = this.originalSeconds;
        this.timerElement.innerText = this.currentSeconds;

        this.status = 'stopped';
    }

    /**
     * Controla os passos do timer.
     */
    _controllerTimerSteps() {
        if (this.status === 'played') {
            this.timeout = setTimeout(() => {
                this.currentSeconds -= 1;
                if (this.currentSeconds < 1) {
                    this.currentSeconds = this.originalSeconds;

                    this.timerElement.dispatchEvent(this.timerEvent);
                }

                this.timerElement.innerText = this.currentSeconds;

                this._controllerTimerSteps();
            }, 1000);
        }
    }
}