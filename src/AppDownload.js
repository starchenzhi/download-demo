import axios from "axios";
import { useState } from "react";
import "./App.css";


function AppDownload() {

  const [errorInfo, setErrorInfo] = useState('');
  const [stackInfo, setStackInfo] = useState('');
  const [actionType, setActionType] = useState('');
  const [isShowPdf, setIsShowPdf] = useState(false);
  const [isDisplayPdf, setIsDisplayPdf] = useState(false);
  const apiURL = "https://download-demo.herokuapp.com/Consent.pdf";

  const downloadPDF = async () => {
    try {
      if (navigator.userAgent.includes("Walgreens") && navigator.userAgent.includes("Android")) {
        window.open(apiURL);
        setActionType("open in a new window. (new code)");
        return
      }

      let getWHeadersConfig = { responseType: "arraybuffer" }
      let response = await axios.get(apiURL, getWHeadersConfig)
      if (response && response.data) {

        // the page is opened by Web View.
        if (/wv/.test(navigator.userAgent)) {
          window.open(apiURL);
          setActionType("open in a new window.")
          return;
        }

        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //   const urlIE = new Blob([response.data], { type: "application/pdf" })
        //   window.navigator.msSaveOrOpenBlob(urlIE, "Consent.pdf")
        //   setActionType("msSaveOrOpenBlob")
        // }
        // // else if (/iP(hone|od|ad)/.test(navigator.platform)) {
        // //   const blob = new Blob([response.data], { type: "application/pdf" })
        // //   const url = window.URL.createObjectURL(blob)
        // //   window.open(url)
        // // } 

        else {
          setActionType("Download with blob.")
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
      setErrorInfo(error.message);
      setStackInfo(error.toString());
    }


  }

  const showPDF = () => {
    setIsShowPdf(!isShowPdf);
  }

  const displayPdf = () => {
    setIsDisplayPdf(!isDisplayPdf);
  }

  return (
    <>
      <p>this is my latest code (Aug 25 7:08PM)</p>
      <div>
        <button className="button" onClick={displayPdf}>View PDF (Third-party library)</button>
        {isDisplayPdf &&
          <iframe
            title="pdf"
            width="100%"
            height="500px"
            src={`/pdfjs-2.9.359-dist/web/viewer.html?file=https://download-demo.herokuapp.com/Consent.pdf`}
          />
        }
      </div>

      <button className="button" onClick={showPDF} style={{ marginTop: "10px" }}>View PDF (Embed)</button>
      <div>* Work on desktop browsers, but on mobile browsers have issues (toolbar is not showing)</div>
      {isShowPdf &&
        <div>
          <embed
            alt="a PDF file"
            aria-label="label"
            src="https://download-demo.herokuapp.com/Consent.pdf#toolbar=1&statusbar=1&navpanes=1&scrollbars=1&view=fit"
            type="application/pdf"
            style={{ width: "100%", height: "500px" }} />
        </div>
      }

      <div onClick={downloadPDF} className="button" style={{ marginTop: "10px" }}>
        Download Authorization Form
      </div>
      <div>Agent: {navigator.userAgent}</div>
      <div>Platform: {navigator.platform}</div>
      <div>Blob: {navigator.msSaveOrOpenBlob}</div>
      <div>ActionType: {actionType}</div>


      <div id="errorInfo">
        Error:  {errorInfo}
      </div>

      <div id="stack">
        Stack:  {stackInfo}
      </div>
    </>
  );
}

export default App;
