import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeWordAsync, changeWord, newWordAsync } from '../../store/actions/actions'
import Application from './Application'

const mapStateToProps = state => {
    return {
        word: state.word
    };
};

const mapActionsToProps = dispatch => {
    return {
        changeWordAsync: bindActionCreators(changeWordAsync, dispatch),
        newWordAsync: bindActionCreators(newWordAsync, dispatch),
        changeWord: bindActionCreators(changeWord, dispatch)
    };
};

export default connect(mapStateToProps, mapActionsToProps)(Application)
