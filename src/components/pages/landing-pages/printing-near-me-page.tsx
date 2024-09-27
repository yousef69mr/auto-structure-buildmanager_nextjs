
   import React from "react";
import { twoBanner } from "@/constants/pages/landing-pages/printing-near-me-page";

const PrintingNearMePage = () => {
  return (
    <>
      <h1>test test</h1>
      <section>
        {twoBanner.map((banner) => (
          <h2 key={banner.title}>{banner.title}</h2>
        ))}
      </section>
    </>
  );
};

export default PrintingNearMePage;

    