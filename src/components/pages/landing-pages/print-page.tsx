import React from "react";
import { twoBanner } from "@/constants/pages/landing-pages/print-page";

const PrintPage = () => {
  return (
    <>
      <h1>Print title h1</h1>
      <section>
        {twoBanner.map((banner) => (
          <h2 key={banner.title}>{banner.title}</h2>
        ))}
      </section>
    </>
  );
};

export default PrintPage;
