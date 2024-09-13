import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  /**
   * Uncomment the data below, it won't show the row
   * Scenario: When there is only one item in the list, the list doesn't shows up
   */

  // const data = {
  //   config: { delimiter: { start: "{{", end: "}}" } },
  //   model: {
  //     userList: [
  //       {
  //         name: "John Doe",
  //         date: "09/13/2024",
  //         department: "Engineering",
  //         signature: "https://signaturely.com/wp-content/uploads/2020/04/oprah-winfrey-signature-signaturely.png",
  //         approved: true,
  //       },
  //     ],
  //   },
  // };

  const data = {
    config: { delimiter: { start: "{{", end: "}}" } },
    model: {
      userList: [
        {
          name: "John Doe",
          date: "09/13/2024",
          department: "Engineering",
          signature:
            "https://signaturely.com/wp-content/uploads/2020/04/oprah-winfrey-signature-signaturely.png",
          approved: true,
        },
        {
          name: "John Doe",
          date: "09/13/2024",
          department: "Engineering",
          signature:
            "https://signaturely.com/wp-content/uploads/2020/04/oprah-winfrey-signature-signaturely.png",
          approved: false,
        },
      ],
    },
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;

    (async function () {
      PSPDFKit = await import("pspdfkit");
      try {
        const instance = await PSPDFKit.load({
          container,
          document: props.document,
          baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
        });

        const parsedTemplate = await PSPDFKit.populateDocumentTemplate(
          {
            baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            document: "/template_with_condition.docx",
            // document: "/template.docx",
            licenseKey: null,
            disableWebAssemblyStreaming: false,
          },
          data
        );

        const pdfBuffer = await PSPDFKit.convertToPDF(
          {
            baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            document: parsedTemplate,
            licenseKey: null,
            disableWebAssemblyStreaming: false,
          },
          PSPDFKit.Conformance.PDFA_1A
        );

        await instance.applyOperations([
          {
            type: "importDocument",
            beforePageIndex: 0,
            treatImportedDocumentAsOnePage: false,
            document: new Blob([pdfBuffer], { type: "application/pdf" }),
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
