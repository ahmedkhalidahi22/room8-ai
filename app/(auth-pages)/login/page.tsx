"use client";
import { login } from "@/actions/login";
import { LoginFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Sumana } from "next/font/google";
import { useEffect, useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string().min(1),
});

type TresponseSchema = z.infer<typeof responseSchema>;
type TloginFormSchema = z.infer<typeof LoginFormSchema>;

export default function Home() {
  const [submitResponse, SetsubmitResponse] = useState<
    TresponseSchema | null | undefined
  >(null);

  const [responseError, setResponseError] = useState<String | null | undefined>(
    null
  );

  const [pending, startTransition] = useTransition();

  const { register, handleSubmit, formState } = useForm<TloginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit: SubmitHandler<TloginFormSchema> = (data) => {
    //mutation.mutate({ email: data.email, password: data.password });

    startTransition(() => {
      login(data);
    });
  };

  //set useMutation and pass mutation function that performs the post request
  // const mutation = useMutation({
  //   mutationFn: (userInformation: TloginFormSchema) => {
  //     return axios.post("/api/login", userInformation);
  //   },
  //   onSuccess: (data) => {
  //     const responseData: TresponseSchema = data.data;
  //     const parsedResponeData = responseSchema.safeParse(responseData);

  //     if (!parsedResponeData.success) {
  //       console.log(parsedResponeData.error);
  //       setResponseError("sorry, username cannot be retrieved");
  //     }
  //     SetsubmitResponse(parsedResponeData.data);
  //   },
  // });

  useEffect(() => {
    console.log(submitResponse);
  }, [submitResponse]);

  const { errors } = formState;

  return (
    <div className="mx-auto text-center  pt-4  bg-emerald-50 h-screen">
      <div className="text-left px-8 bg-white py-8 mx-auto max-w-[500px] w-full rounded-lg mt-16 ">
        {" "}
        <div className="space-y-3 mb-5 ">
          <h1 className="text-4xl font-bold text-emerald-900">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1">
              <div className="space-y-2 flex flex-col ">
                <label htmlFor="name">Email</label>
                <input
                  placeholder="example@email.com"
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
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("password")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.email?.message}
                </p>
              </div>
            </div>
            <div className="w-full text-right">
              <button
                className="w-full px-6 py-3 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 disabled:bg-emerald-500"
                type="submit"
                disabled={pending}
              >
                Sign In
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
