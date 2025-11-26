import "./quickCash.css";
import "./quickCash.css";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";


export default function QuickCash() {
  return (
      <>
          <div className="view">
              <h1>QuickCash</h1>
              <div className="qc-writeup">
                  <p>
                      QuickCash is a lightweight Android app that allows employees to submit job
                      applications instantly through a mobile form. We built the app in Java
                      using Android Studio, with Firebase Authentication and Firestore handling secure
                      data storage. The app sends a confirmation message to users after submission, and
                      all applications are stored in a structured Firestore collection for employers
                      to review.
                  </p>

                  <p><br></br>
                        This project demonstrates practical mobile development skills including
                      asynchronous Firestore reads/writes, secure database rules, responsive XML UI
                      design, and Activity lifecycle handling. We also implemented basic UI testing and
                      structured the project using modular components to keep the codebase maintainable.
                  </p>
              </div>

              <div className="qc-screenshots">
                  <img src={image1} alt="QuickCash Screen 1"/>
                  <img src={image2} alt="QuickCash Screen 2"/>
                  <img src={image3} alt="QuickCash Screen 3"/>
                  <img src={image4} alt="QuickCash Screen 4"/>
                  <img src={image5} alt="QuickCash Screen 5"/>
              </div>

              {/* Video */}
              <div className="qc-video">
                  <iframe
                      src="https://www.youtube.com/embed/T6bnnNfbwEs"
                      allowFullScreen
                  ></iframe>
              </div>
          </div>
      </>
  );
}