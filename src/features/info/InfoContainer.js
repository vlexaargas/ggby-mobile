import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { Asset } from "expo";
import { rawGuide } from "./rawGuide";
// import bas64Pdf from "base64Pdf";
// import InfoView from "./InfoView";

// openssl base64 < path/to/file.pdf | tr -d '\n' | pbcopy
// ON MacOS: encodes the pdf to base64 and copies it to your clipboard. Just paste it here.
const base64Pdf = `data:application/pdf;base64,${rawGuide}`;

class InfoContainer extends React.Component {
  render() {
    // return <InfoView />;
    return <PDFReader source={{ base64: base64Pdf }} />;
  }
}

export default InfoContainer;
