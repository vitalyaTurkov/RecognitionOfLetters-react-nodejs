import React from 'react'
import PropTypes from 'prop-types'

import { RADIUS, WIDTH, HEIGHT } from "./constants";

import './main.css'
import Button from '@material-ui/core/Button'

export default class MyCanvas extends React.Component {

    static propTypes = {
        sendImage: PropTypes.func
    };

    constructor() {
        super();
        this.isMouseDown = false;
    }

    componentDidMount() {
        this.ctx = this.mCanvas.getContext('2d');
        this.clearCanvas();
    }

    render() {
        return (
            <div className="canvasForm">
                <div className="btnGroup">
                    <Button
                        variant={"contained"}
                        color={"primary"}
                        onClick={this.onSendClick}>
                        Отправить
                    </Button>
                    <div className="btn-wrap">
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            className="clearBtn"
                            onClick={this.clearCanvas}>
                            Очистить
                        </Button>
                    </div>
                </div>
                <canvas width={WIDTH}
                        height={HEIGHT}
                        ref={this.setCanvas}
                        onMouseMove={this.mouseMove}
                        onMouseDown={this.mouseDown}
                        onMouseUp={this.mouseUp}
                        onMouseOut={this.mouseOut}>your browser not supported canvas</canvas>
            </div>
        );
    }

    //Очистка холста канвас
    clearCanvas = () => {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, window.innerHeight, window.innerWidth);
        this.ctx.fillStyle = 'black';
        this.props.changeWord('');
    };

    //Обработка события нажатия на кнопку отправки изображения на сервер
    onSendClick = () => {
        this.props.sendImage(this.mCanvas);
    };

    //ref, инициализируем канвас в параметры обьекта application
    setCanvas = (canvas) => {
        this.mCanvas = canvas;
    };

    //Событие движения мышки по канвасу
    mouseMove = (e) => {
        if(!this.isMouseDown) {
            return;
        }
        const { ctx } = this;

        ctx.lineWidth = 5;
        ctx.lineTo(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop);
        ctx.stroke();

        ctx.moveTo(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop);
        ctx.arc(e.clientX - ctx.canvas.offsetLeft, e.clientY - ctx.canvas.offsetTop, RADIUS, 0, Math.PI * 2);
        ctx.fill();
    };

    //Событие нажатия на кнопку мыши
    mouseDown = () => {
        this.isMouseDown = true;
    };

    //Событие отпускания кнопки мыши
    mouseUp = () => {
        this.isMouseDown = false;
        this.ctx.beginPath();
    };

    //События выхода за пределы канвас
    mouseOut = () => {
        this.isMouseDown = false;
        this.ctx.beginPath();
    };
}
