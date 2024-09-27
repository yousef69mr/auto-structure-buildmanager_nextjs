
   import React from "react";
import { twoBanner } from "@/constants/pages/landing-pages/printing-services-near-me-nyc-page";

const PrintingServicesNearMeNycPage = () => {
  return (
    <>
      <h1>Premium Printing Services Near You
</h1>
      <section>
        {twoBanner.map((banner) => (
          <h2 key={banner.title}>{banner.title}</h2>
        ))}
      </section>
    </>
  );
};

export default PrintingServicesNearMeNycPage;

    