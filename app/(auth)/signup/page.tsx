"use client";
import { formSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Sumana } from "next/font/google";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

type TformSchema = z.infer<typeof formSchema>;

export default function Home() {
  const [submitResponse, SetsubmitResponse] = useState(null);

  const { register, handleSubmit, formState } = useForm<TformSchema>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<TformSchema> = (data) => {
    mutation.mutate({ email: data.email, name: data.name, phone: data.phone });
  };

  //set useMutation and pass mutation function that performs the post request
  const mutation = useMutation({
    mutationFn: (userInformation: TformSchema) => {
      return axios.post("/api/user", userInformation);
    },
    onSuccess: (data) => {
      SetsubmitResponse(data.data);
    },
  });

  useEffect(() => {
    console.log(submitResponse);
  }, [submitResponse]);

  const { errors } = formState;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Personal Information</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Please fill out the form with your personal details.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name">Name</label>
              <input placeholder="John Doe" {...register("name")} />

              <p className=" w-full py-2 px-2  text-red-700">
                {errors.name?.message}
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <input placeholder="example@email.com" {...register("email")} />
              <p className=" w-full py-2 px-2  text-red-700">
                {errors.email?.message}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="phone">Phone Number</label>
              <input placeholder="+1 (123) 456-7890" {...register("phone")} />
              <p className=" w-full py-2 px-2  text-red-700">
                {errors.phone?.message}
              </p>
            </div>
          </div>
          <button
            disabled={mutation.isPending}
            className="w-full"
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </form>
      <div className="mt-10">
        {submitResponse && <h4>Results: {submitResponse}</h4>}
      </div>
    </div>
  );
}
