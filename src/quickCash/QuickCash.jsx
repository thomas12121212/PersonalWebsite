import "./quickCash.css";

export default function QuickCash() {
  return (
      <>
          <div className="view">
              <h1>QuickCash</h1>
              <div className="qc-writeup">
                  <p>
                      QuickCash is a lightweight Android app that allows employees to submit job
                      applications instantly through a simple mobile form. I built the app in Java
                      using Android Studio, with Firebase Authentication and Firestore handling secure
                      data storage. The app sends a confirmation message to users after submission, and
                      all applications are stored in a structured Firestore collection for employers
                      to review.
                  </p>

                  <p>
                      This project demonstrates practical mobile development skills including
                      asynchronous Firestore reads/writes, secure database rules, responsive XML UI
                      design, and Activity lifecycle handling. I also implemented basic UI testing and
                      structured the project using clean, modular components to keep the codebase
                      maintainable.
                  </p>
              </div>

              <div className="qc-screenshots">
                  <img src="/path/to/screen1.png" alt="QuickCash Screen 1"/>
                  <img src="/path/to/screen2.png" alt="QuickCash Screen 2"/>
                  <img src="/path/to/screen3.png" alt="QuickCash Screen 3"/>
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