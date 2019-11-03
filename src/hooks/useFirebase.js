import { h } from 'preact'
import { useContext } from 'preact/hooks'

import { FirebaseContext } from '../context/Firebase'

const useFirebase = () => useContext(FirebaseContext)

export default useFirebase
