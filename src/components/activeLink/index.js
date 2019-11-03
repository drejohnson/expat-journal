import { h } from 'preact'
import { useRoute, Link } from 'wouter-preact'
import style from './style'

export default function ActiveLink(props) {
  const [isActive] = useRoute(props.href)
  const s = isActive ? style.active : ''

  return (
    <Link {...props}>
      <a class={`${style.activeLink} ${s}`}>{props.children}</a>
    </Link>
  )
}
