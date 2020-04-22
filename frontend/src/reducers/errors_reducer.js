import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import EntitiesErrorsReducer from './entities_error_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    entities:EntitiesErrorsReducer,
});