const fs = require("fs");
const xlsx = require("xlsx");

const ROOT_DIR = __dirname.substring(0, __dirname.lastIndexOf("\\"));

const workbook = xlsx.readFile(
  ROOT_DIR.concat("/public/pages_generation_sample.xlsx")
);
const worksheet = workbook.Sheets["Sheet1"]; // Replace 'Sheet1' with your sheet name
let data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

// Remove blank rows
data = data.filter((row, index) => {

  if (index === 0) {
    return false;
  }

  return row.some((cell) => cell !== undefined && cell !== null && cell !== "");
});

// console.log(data.length)

const srcDirectory = ROOT_DIR.concat("/src");
const pagesRouterDirectory = srcDirectory.concat("/pages");
const mainComponentLandingPageDirectory = srcDirectory.concat(
  "/components/pages/landing-pages"
);
const constantLandingPageDirectory = srcDirectory.concat(
  "/constants/pages/landing-pages"
);

const componentFileExtension = ".tsx";
const fileExtension = ".ts";

const convertToCamelCase = (str) => {
  return str
    .replace(/-/g, " ")
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^\w/, (char) => char.toLowerCase());
};

/**
 *
 * @param {*} urlPath url pathname
 * @param componentName url page component name
 * @param pageFilename page files name
 */
const createUrlPathname = ({
  urlPath,
  componentName,
  pageFilename,
  meta,
}) => {
  try {
    // Create folder if it doesn't exist
    const routerFolderPath = `${pagesRouterDirectory}/${urlPath}`;
    if (!fs.existsSync(routerFolderPath)) {
      fs.mkdirSync(routerFolderPath, { recursive: true });
    }

    // Create file within the folder
    const filePath = `${routerFolderPath}/index${componentFileExtension}`;

    const componentFileTxt = `
    import React from "react";
import ${componentName} from "@/components/pages/landing-pages/${pageFilename}";

const Page = () => {

  return <>
  <p>${Object.values(meta).join(", ")}</p>
   <${componentName} />
  </>;
};

export default Page;
 
    `;
    fs.writeFileSync(filePath, componentFileTxt);
  } catch (error) {
    console.error(error);
  }
};

const createUrlMainPageComponent = ({
  title,
  componentName,
  pageFilename,
}) => {
  try {
    // Create folder if it doesn't exist
    // const routerFolderPath = `${mainComponentLandingPageDirectory}/${urlPath}`;
    // if (!fs.existsSync(routerFolderPath)) {
    //   fs.mkdirSync(routerFolderPath, { recursive: true });
    // }

    // Create file within the folder
    const filePath = `${mainComponentLandingPageDirectory}/${pageFilename}${componentFileExtension}`;

    const componentFileTxt = `
   import React from "react";
import { twoBanner } from "@/constants/pages/landing-pages/${pageFilename}";

const ${componentName} = () => {
  return (
    <>
      <h1>${title}</h1>
      <section>
        {twoBanner.map((banner) => (
          <h2 key={banner.title}>{banner.title}</h2>
        ))}
      </section>
    </>
  );
};

export default ${componentName};

    `;
    fs.writeFileSync(filePath, componentFileTxt);
  } catch (error) {
    console.error(error);
  }
};

const createPageConstants = ({
  twoTitles,
  secondSection,
  pageFilename,
}) => {
  try {
    // Create folder if it doesn't exist
    // const routerFolderPath = `${mainComponentLandingPageDirectory}/${urlPath}`;
    // if (!fs.existsSync(routerFolderPath)) {
    //   fs.mkdirSync(routerFolderPath, { recursive: true });
    // }

    // Create file within the folder
    const filePath = `${constantLandingPageDirectory}/${pageFilename}${fileExtension}`;

    const constantFileTxt = `
  export const twoBanner = [
  { title: "${twoTitles[0].trim()}", description: "" },
  { title: "${twoTitles[1].trim()}", description: "" },
];

export const evenOddList = [
  {
    id: 1,
    title: "${secondSection.title.trim()}",
    description: "${secondSection.description.trim()}",
  },
];

    `;
    fs.writeFileSync(filePath, constantFileTxt);
  } catch (error) {
    console.error(error);
  }
};

data.forEach((row) => {
  const url = row[0].trim();

  const pageFilename = url.concat("-page");
  const componentName = convertToCamelCase(pageFilename).replace(
    /^\w/,
    (char) => char.toUpperCase()
  );

  // console.log(url)
  createUrlPathname({
    meta: { title: row[1], description: row[2] },
    urlPath: url,
    componentName,
    pageFilename,
  });
  createUrlMainPageComponent({ title: row[3], pageFilename, componentName });
  createPageConstants({
    twoTitles: [row[4], row[5]],
    secondSection: { title: row[6], description: row[7] },
    pageFilename,
  });
});
