"use client";
import { signupFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Sumana } from "next/font/google";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string().min(1),
});

type TresponseSchema = z.infer<typeof responseSchema>;
type TformSchema = z.infer<typeof signupFormSchema>;

export default function Home() {
  const [submitResponse, SetsubmitResponse] = useState<
    TresponseSchema | null | undefined
  >(null);
  const [responseError, setResponseError] = useState<String | null | undefined>(
    null
  );

  const { register, handleSubmit, formState } = useForm<TformSchema>({
    resolver: zodResolver(signupFormSchema),
  });
  const onSubmit: SubmitHandler<TformSchema> = (data) => {
    console.log("mutation triggered");

    mutation.mutate({
      email: data.email,
      name: data.name,
      phone: data.phone,
      password: data.password,
    });
  };

  //set useMutation and pass mutation function that performs the post request
  const mutation = useMutation({
    mutationFn: (userInformation: TformSchema) => {
      return axios.post("/api/signup", userInformation);
    },
    onSuccess: (data) => {
      const responseData: TresponseSchema = data.data;
      const parsedResponeData = responseSchema.safeParse(responseData);

      if (!parsedResponeData.success) {
        console.log(parsedResponeData.error);
        setResponseError("sorry, username cannot be retrieved");
      }
      SetsubmitResponse(parsedResponeData.data);
    },
  });

  useEffect(() => {
    console.log(submitResponse);
  }, [submitResponse]);

  const { errors } = formState;

  return (
    <div className="mx-auto text-center  pt-4  bg-emerald-50 h-screen">
      <div className="text-left px-8 bg-white py-8 mx-auto max-w-[500px] w-full rounded-lg mt-16 ">
        {" "}
        <div className="space-y-3 mb-5 ">
          <h1 className="text-4xl font-bold text-emerald-900">Sign up</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1">
              <div className="space-y-2 flex flex-col ">
                <label htmlFor="name">Name</label>
                <input
                  placeholder="John Doe"
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("name")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.name?.message}
                </p>
              </div>
              <div className="space-y-2 flex flex-col ">
                <label htmlFor="name">Email</label>
                <input
                  placeholder="example@email.com"
                  type="email"
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("email")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.email?.message}
                </p>
              </div>

              <div className="space-y-2 flex flex-col ">
                <label htmlFor="name">Password</label>
                <input
                  placeholder="*******"
                  type="password"
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("password")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.password?.message}
                </p>
              </div>
            </div>
            <div className="w-full text-right">
              <button
                className="w-full px-6 py-3 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 disabled:bg-emerald-300"
                type="submit"
                disabled={mutation.isPending}
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
        {submitResponse && (
          <div className="mt-10">
            <div>
              <h4>Respone Results</h4>
              <p>Message: {submitResponse.message} </p>
            </div>
          </div>
        )}
        {responseError && (
          <div>
            <p className="text-red-700">{responseError}</p>
          </div>
        )}
      </div>
    </div>
  );
}
