## Support and Issues

#### Scenario 1: When the template data has only one item in the list, the list doesn't shows up.

Current Data Loaded on template:

```
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
```

When Data changes to below, list doesn't shows up even if we have one object in the list.

```
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
        }
      ],
    },
  };
```

#### Scenario 2: We have image URL on the data for user signature, How can we render the signature image on the template?

We should be able to render image url from the docx template.

#### Scenario 3: Conditional statement works on the top level data fields but won't work inside the loop.

Based on the data given above, if the user has `approved: true` , signature should be displayed, otherwise, it should be empty. So conditional statement needs to be inside the #userList loop, which doesn't work as expected.

For reference, I have added a template file `template_with_condition.docx` under public folder. Use the commented document path.

```
        const parsedTemplate = await PSPDFKit.populateDocumentTemplate(
          {
            baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            // document: "/template_with_condition.docx"
            document: "/template.docx",
            licenseKey: null,
            disableWebAssemblyStreaming: false,
          },
          data
        );
```

## Getting Started

Install the project dependencies with npm:

```bash
npm install
```
