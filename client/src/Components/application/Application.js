import React from "react";
import PropTypes from "prop-types";

import Card from "@material-ui/core/Card/Card";
import Typography from "@material-ui/core/Typography/Typography";

import MyCanvas from "../canvas";
import About from "../about";

import "./main.css"

export default class Application extends React.Component {

    static propTypes = {
        word: PropTypes.string
    };

    render() {

        let header;
        if(!(this.props.word === '')) {
            header = `Это буква ${this.props.word}`;
        } else {
            header = 'Нарисуйте букву ^-^';
        }

        return (
            <div>
                <div className="header">
                    <Card className="canvas-wrap">
                        <Typography variant="h5" component="h3">
                            { header }
                        </Typography>
                        <MyCanvas
                            changeWord={this.props.changeWord}
                            sendImage={ this.sendImage }
                            newWord={this.newWord}
                        />
                    </Card>
                </div>
                <About/>
            </div>

        )
    }
    sendImage = (canvas) => this.props.changeWordAsync(canvas);
    newWord = (canvas, word) => this.props.newWordAsync(canvas, word);
}
