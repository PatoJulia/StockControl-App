"use client";
import { useEffect, useState } from "react";

export default function MockPDF() {
  const [pdf, setPDF] = useState<ArrayBuffer>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4300/bill/65885638f1b71adf5d8c6ba7/pdf"
        );
        const data = await response.arrayBuffer();
        setPDF(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <object
      type="application/pdf"
      data={
        pdf && URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }))
      }
      width="100%"
      height="500px"
    >
      PDF Viewer not available. You can download the PDF{" "}
      <a
        href={
          pdf &&
          URL.createObjectURL(new Blob([pdf], { type: "application/pdf" }))
        }
        download
      >
        here
      </a>
      .
    </object>
  );
}
