import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MyCanvas from '../canvas'
import { changeWordAsync, changeWord } from '../../store/actions/actions'

import './main.css'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

class Application extends React.Component {

    static propTypes = {
        word: PropTypes.string
    };

    render() {
        let header;
        if(!(this.props.word === '')) {
            header = `Это буква ${this.props.word}`;
        }
        else {
            header = 'Нарисуйте букву ^-^';
        }
        return (
            <div className="header">
                <Card className="canvas-wrap">
                    <Typography variant="h5" component="h3">
                        { header }
                    </Typography>
                    <MyCanvas changeWord={this.props.changeWord} sendImage={ this.sendImage }/>
                </Card>
            </div>
        )
    }

    //Отправка холста канвас на сервер
    sendImage = (canvas) => {
        this.props.changeWordAsync(canvas);
    };

}

const mapStateToProps = state => {
    return {
        word: state.word
    };
};

const mapActionsToProps = dispatch => {
    return {
        changeWordAsync: bindActionCreators(changeWordAsync, dispatch),
        changeWord: bindActionCreators(changeWord, dispatch)
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Application)
