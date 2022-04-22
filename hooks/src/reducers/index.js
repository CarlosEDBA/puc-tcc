import { combineReducers } from 'redux'

import Auth from './Auth'
import Modal from './Modal'
import Forms from './Forms'
import Network from './Network'
import Preferencias from './Preferencias'

const reducer = combineReducers({
  Auth,
  Modal,
  Forms,
  Network,
  Preferencias,
})

export default reducer

