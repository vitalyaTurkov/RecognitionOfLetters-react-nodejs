import React from 'react'
import PropTypes from 'prop-types'

import { RADIUS, WIDTH, HEIGHT } from "./constants";

import './main.css'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

export default class MyCanvas extends React.Component {

    static propTypes = {
        sendImage: PropTypes.func,
        newWord: PropTypes.func,
        changeWord: PropTypes.func
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
                        onMouseOut={this.mouseOut}>your browser not supported canvas
                </canvas>
                <div className="form-new-word">
                    <TextField
                        inputRef={this.newWordMount}
                        placeholder={"Буква"}
                    />
                    <div className="btn-new-word">
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            onClick={this.handleNewWord}>
                            Научить
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    newWordMount = input => this.newWordInput = input;
    setCanvas = canvas => this.mCanvas = canvas;

    clearCanvas = () => {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, window.innerHeight, window.innerWidth);
        this.ctx.fillStyle = 'black';
        this.props.changeWord('');
    };

    onSendClick = () => this.props.sendImage(this.mCanvas);

    handleNewWord = () => {
        if(this.newWordInput.value !== '' && this.newWordInput.value.length === 1)
            this.props.newWord(this.mCanvas, this.newWordInput.value);
    };

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

    mouseDown = () => {
        this.isMouseDown = true;
    };

    mouseUp = () => {
        this.isMouseDown = false;
        this.ctx.beginPath();
    };

    mouseOut = () => {
        this.isMouseDown = false;
        this.ctx.beginPath();
    };
}
