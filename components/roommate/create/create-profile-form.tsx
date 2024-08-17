"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormUserDetailSchema } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

const responseSchema = z.object({
  message: z.string().min(1),
  userDetail: z.string().min(1),
});

type TformSchema = z.infer<typeof FormUserDetailSchema>;
type TresponseSchema = z.infer<typeof responseSchema>;


export default function CreateProfileForm() {
  const [submitResponse, SetsubmitResponse] = useState<
    TresponseSchema | null | undefined
  >(null);
  const [responseError, setResponseError] = useState<String | null | undefined>(
    null
  );

  const form = useForm<TformSchema>({
    resolver: zodResolver(FormUserDetailSchema),
    defaultValues: {
      occupation: "",
      nationality: "",
      gender: "male",
      age: undefined,
      location: "",
      budget: undefined,
      lookingFor: "for-myself",
      moveDate: undefined,
      children: "no-children",
      preferences: [],
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (userDetail: TformSchema) => {
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

  const onSubmit = (data: TformSchema) => {
    console.log("submit fun triggered");

    mutation.mutate({
      occupation: data.occupation,
      age: data.age,
      gender: data.gender,
      nationality: data.nationality,
      userId: "clyres7uv0000602zppz7100y",
      location: data.location,
      budget: data.budget,
      lookingFor: data.lookingFor,
      moveDate: data.moveDate,
      children: data.children,
      preferences: data.preferences,
      description: data.description,
    });
  };

  const onNext = async () => {
    const firstStepFields = [
      "occupation",
      "nationality",
      "gender",
      "age",
      "location",
      "budget",
      "lookingFor"
    ] as const;

    const result = await form.trigger(firstStepFields);
    if (result) {
      setStep(2);
    }
  };

  const onPrevious = () => setStep(1);

  const [step, setStep] = useState(1);

  useEffect(() => {
    console.log(submitResponse);
  }, [submitResponse]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div
  className="absolute -z-10 inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
></div>
      <div className="w-full max-w-[650px] bg-white rounded-lg shadow-md">
        <div className="px-8 py-6 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Create a Profile</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about yourself
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <motion.div 
                className="bg-emerald-800 h-2.5 rounded-full"
                initial={{ width: "50%" }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="occupation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Occupation</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality</FormLabel>
                          <FormControl>
                            <Input placeholder="Canadian" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="24"
                              min={18}
                              {...field}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                field.onChange(value < 0 ? 0 : value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute text-sm left-3 top-1/2 transform -translate-y-1/2">AED</span>
                              <Input
                                type="number"
                                placeholder="1000"
                                className="pl-12 pr-20"
                                min={0}
                                {...field}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  field.onChange(value < 0 ? 0 : value);
                                }}
                              />
                              <span className="absolute text-sm right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                per month
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lookingFor"
                      render={({ field }) => (
                        <FormItem className="pb-5">
                          <FormLabel>I&apos;m looking...</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="for-myself">For myself</SelectItem>
                              <SelectItem value="as-a-couple">As a couple</SelectItem>
                              <SelectItem value="as-a-group">As a group of friends</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" onClick={onNext} variant="accent" className="w-full mt-6">
                      Next
                    </Button>
                  </motion.div>
                )}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-10"
                  >
                    <FormField
                      control={form.control}
                      name="moveDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred move date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full rounded-md pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value || new Date()}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Children</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no-children">No children</SelectItem>
                              <SelectItem value="visiting-children">Children that will visit</SelectItem>
                              <SelectItem value="living-children">Children that will live with me</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="preferences"
                      render={() => (
                        <FormItem>
                          <FormLabel>Preferences</FormLabel>
                          <div className="space-y-6">
                            {['🚭 Non smoker', '🐱 I have a pet', "👨‍🎓 I'm a student"].map((item) => (
                              <FormField
                                key={item}
                                control={form.control}
                                name="preferences"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          const updatedValue = checked
                                            ? [...field.value || [], item]
                                            : field.value?.filter((value) => value !== item);
                                          field.onChange(updatedValue);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item}</FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a bit about why you (and your roomies) would be great to live with."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex space-x-4 mt-6">
                      <Button type="button" onClick={onPrevious} variant="outline" className="w-1/2">
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        variant="accent"
                        disabled={mutation.isPending}
                        className="w-1/2"
                      >
                        Create Profile
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Form>

          {submitResponse && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h4 className="font-semibold mb-2">Response Results</h4>
              <p>Message: {submitResponse.message}</p>
              <p>ID: {submitResponse.userDetail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}