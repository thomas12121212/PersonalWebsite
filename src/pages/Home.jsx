import { Link } from "react-router-dom";
export default function Home() {
  return (
      <>
          <div className="view">
              <div className="paragraph">
                  <p> Welcome, <br></br><br></br>
                      My name is Thomas Watchman, and this is my personal site. I am a computer scientist with interest
                      in cybersecurity, machine learning and quantitative analysis Here I have documented projects,
                      interests, and personal achievements. Read <Link to="./projects">what I'm up to</Link>, browse <Link to="./projects">what I'm working on</Link>,
                      or get to <Link to="./personal">know me better</Link><br></br>
                      <br></br> Thanks for visiting, <br></br> - Thomas
                  </p>
                  <div className="sectionTitle">
                      <a>Connect with me here</a>
                  </div>
                  <div className="icon-row">
                      <a className="fa-solid fa-envelope" href="mailto:thomas@watchmans.com"></a>
                      <a className="fa-brands fa-github" href="https://github.com/thomas12121212" target="_blank" rel="noopener noreferrer"></a>
                      <a className="fa-brands fa-linkedin"  href="https://linkedin.com/in/thomas-watchman-003841238" target="_blank"
                         rel="noopener noreferrer"></a>
                      <a className="fa-brands fa-instagram" href="https://www.instagram.com/thomaswatchman" target="_blank"></a>
                  </div>
              </div>
          </div>
      </>
  )
}
