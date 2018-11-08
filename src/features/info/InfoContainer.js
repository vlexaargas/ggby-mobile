import React from "react";
import PDFReader from "rn-pdf-reader-js";
import { Asset } from "expo";
// import InfoView from "./InfoView";

const pdfAsset = Asset.fromModule(
  require("../../../assets/ggby-volunteer-guide.pdf")
);

const pdfUri = pdfAsset.localUri || pdfAsset.uri;

class InfoContainer extends React.Component {
  render() {
    // return <InfoView />;
    return <PDFReader source={{ uri: pdfUri }} />;
  }
}

export default InfoContainer;
