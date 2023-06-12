import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer flex-col gap-1">
      <h1 className="logo-text">COVID19INDIA</h1>
      <p>we stand with everyone fighting on the front lines</p>

      <VscGithubAlt className="icon" />

      <FiInstagram className="icon" />

      <FaTwitter className="icon" />
    </div>
  )
}
