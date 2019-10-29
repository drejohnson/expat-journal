import { h } from 'preact'
import { useContext } from 'preact/hooks'

import { AuthContext } from '../context/Auth'

const useAuth = () => useContext(AuthContext)

export default useAuth
