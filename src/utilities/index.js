import './index.css'

export const Container = props => {
  const {children, className} = props
  return <div className={`container ${className}`}>{children}</div>
}

export const Card = props => {
  const {children, className} = props
  return <div className={`card ${className}`}>{children}</div>
}
