"use client";
import { useRouter } from "next/router";

export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
}
