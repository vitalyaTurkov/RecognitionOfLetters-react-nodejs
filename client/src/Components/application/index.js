import React from 'react'
import MyCanvas from '../canvas'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeWord, changeWordAsync } from '../../store/actions/actions'
import PropTypes from 'prop-types'
import './main.css'

class Application extends React.Component {

    static propTypes = {
        word: PropTypes.string
    };

    render() {
        let header = '';
        if(!(this.props.word === '')) {
            header = `Это буква ${this.props.word}`;
        }
        else {
            header = 'Привет!';
        }

        return (
            <div className="header">
                <div className="canvas-wrap">
                    <h1 className="figureName">{ header }</h1>
                    <MyCanvas sendImage={ this.sendImage }/>
                </div>
            </div>
        )
    }

    //Отправка холста канвас на сервер
    sendImage = (canvas) => {
        this.props.changeWord(canvas);
    };

}

const mapStateToProps = state => {
    return {
        word: state.word
    };
};

const mapActionsToProps = dispatch => {
    return {
        changeWord: bindActionCreators(changeWordAsync, dispatch)
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Application)