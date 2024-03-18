"use client";
import { Bill } from "@/interfaces/Bill";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormValues {
  id: string;
  producto: string;
  cliente: string;
  valorDolar: number;
}

export default function RegisterBill({ params }: { params: { id: string } }) {
  const [bill, setBill] = useState<Bill>();
  const ref = useRef();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  //const onSubmit: SubmitHandler<FormValues> = (data) => handleSendRequest(data);
}
