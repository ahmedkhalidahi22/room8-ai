"use client";
import Link from "next/link";
import { userDetailSchema, FormUserDetailSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

const responseSchema = z.object({
  message: z.string().min(1),
  userDetail: z.string().min(1),
});

type TformSchema = z.infer<typeof FormUserDetailSchema>;
type TresponseSchema = z.infer<typeof responseSchema>;
type TuserDetailSchema = z.infer<typeof userDetailSchema>;

export default function CreateRoommate() {
  const [submitResponse, SetsubmitResponse] = useState<
    TresponseSchema | null | undefined
  >(null);
  const [responseError, setResponseError] = useState<String | null | undefined>(
    null
  );

  const { register, handleSubmit, formState } = useForm<TformSchema>({
    resolver: zodResolver(FormUserDetailSchema),
  });

  const mutation = useMutation({
    mutationFn: (userDetail: TuserDetailSchema) => {
      return axios.post("/api/profile", userDetail);
    },
    onSuccess: (data) => {
      const parsedResponeData = responseSchema.safeParse(data.data);

      if (!parsedResponeData.success) {
        console.log(parsedResponeData.error);
        setResponseError("sorry, user detials cannot be retrieved");
      }
      SetsubmitResponse(parsedResponeData.data);
    },
    onError: () => {
      setResponseError("sorry, user detials cannot be retrieved");
    },
  });

  const onSubmit: SubmitHandler<TformSchema> = (data) => {
    console.log("submit fun triggered");

    mutation.mutate({
      occupation: data.occupation,
      age: data.age,
      gender: data.gender,
      nationality: data.nationality,
      userId: "clyres7uv0000602zppz7100y",
    });
  };

  useEffect(() => {
    console.log(submitResponse);
  }, [submitResponse]);

  const { errors } = formState;

  return (
    <div className="mx-auto text-center  pt-4 ">
      <div className="text-left px-8 bg-white py-8 mx-auto max-w-[500px] w-full rounded-lg mt-16 ">
        <div className="space-y-3 mb-10 ">
          <h1 className="text-4xl font-bold ">
            Create your profile
          </h1>
          <p className="text-xl font-medium text-foreground">
            Some info about yourself
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1">
              <div className="space-y-2 flex flex-col ">
                <label htmlFor="name">Occupation</label>
                <input
                  placeholder="John Doe"
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("occupation")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.occupation?.message}
                </p>
              </div>
              <div className="space-y-2 flex flex-col ">
                <label htmlFor="name">Nationality</label>
                <input
                  placeholder="John Doe"
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("nationality")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.nationality?.message}
                </p>
              </div>
              <div className="space-y-2 flex flex-col ">
                <label htmlFor="name">Gender</label>
                <input
                  placeholder="John Doe"
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("gender")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.gender?.message}
                </p>
              </div>
              <div className="space-y-2  flex flex-col ">
                <label htmlFor="name">Age</label>
                <input
                  placeholder="24"
                  type="number"
                  className="border border-emerald-200 py-3 px-2 rounded-lg focus:outline-emerald-500 focus:outline-2"
                  {...register("age")}
                />

                <p className=" w-full py-2 px-2  text-red-700">
                  {errors.age?.message}
                </p>
              </div>
            </div>
            <div className="w-full text-right">
              <button
                disabled={mutation.isPending}
                className="w-fit px-6 py-3 bg-emerald-800 text-white rounded-md hover:bg-emerald-700 disabled:0"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>

        <div className="mt-10">
          {submitResponse && (
            <div>
              <h4>Respone Results</h4>
              <p>Message: {submitResponse.message} </p>
              <p>id: {submitResponse.userDetail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
