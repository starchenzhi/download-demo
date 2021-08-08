import axios from "axios";
import * as Sentry from "@sentry/react";

function App() {

  const downloadPDF = async () => {

    Sentry.captureMessage(window.navigator.userAgent);

    try {
      var apiURL = "https://download-demo.herokuapp.com/Consent.pdf";
      let getWHeadersConfig = { responseType: "arraybuffer" }
      let response = await axios.get(apiURL, getWHeadersConfig)
      if (response && response.data) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          const urlIE = new Blob([response.data], { type: "application/pdf" })
          window.navigator.msSaveOrOpenBlob(urlIE, "Consent.pdf")
        } else if (/iP(hone|od|ad)/.test(navigator.platform)) {
          const blob = new Blob([response.data], { type: "application/pdf" })
          const url = window.URL.createObjectURL(blob)
          window.open(url)
        } else {
          const a = document.createElement("a");
          const contentDisposition = "content-disposition"
          document.body.appendChild(a)
          a.style = "display: none"
          const blob = new Blob([response.data], { type: "application/pdf" })
          const url = window.URL.createObjectURL(blob)
          a.href = url
          if (response.headers && response.headers[contentDisposition]) {
            let downloadName = response.headers[contentDisposition]
            const searchString = "filename="
            downloadName = downloadName.substring(downloadName.length, downloadName.indexOf(searchString) + searchString.length)
            a.download = downloadName
          } else {
            a.download = "Consent.pdf"
          }

          a.click()
          window.URL.revokeObjectURL(url)
        }
      }

      console.log("##### the code to reproduce crash.")

    } catch (error) {
      console.log("GET PDF consents API Failed!", error.message);
    }


  }

  return (
    <>
      <div onClick={downloadPDF}>
        Download Authorization Form
      </div>
    </>
  );
}

export default App;
