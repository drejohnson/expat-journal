import { h } from 'preact'
import { useContext } from 'preact/hooks'

import { FirebaseContext } from '../context/firebaseContext'

const useFirebase = () => useContext(FirebaseContext)

export default useFirebase
