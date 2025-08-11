"use client";
import React, { useState, useRef, useTransition } from "react";
import ImageUpload from "./upload-image";
import { toast } from "sonner";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { keyBenefits, NutritionInformation } from "@/utils/DataSlice";
import { Trash2, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

export interface FileWithPreview {
  id: string;
  preview: string;
  progress: number;
  name: string;
  size: number;
  type: string;
  lastModified?: number;
  file?: File;
}

function AddProductSection() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const [nutritionInfo, setNutritionInfo] = useState<NutritionInformation[]>([
    { id: Date.now().toString(), nutrition: "", quantity: "" },
  ]);
  const [keyBenefits, setKeyBenefits] = useState<keyBenefits[]>([
    { id: Date.now().toString(), topic: "", description: "" },
  ]);

  const [productHightLights, setProductHighLights] = useState<string[]>([""]);
  const [isPending, startTransition] = useTransition();

  const BenefitSchema = z.object({
    id: z.string(),
    topic: z.string().min(1, { message: "Topic is required" }),
    description: z.string().min(1, { message: "Description is required" }),
  });

  const NutritionSchema = z.object({
    id: z.string(),
    nutrition: z.string().min(1, { message: "Nutrition name is required" }),
    quantity: z.string().optional(),
  });

  const ProductSchema = z.object({
    title: z.string().min(1, { message: "Product name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    keyBenefits: z
      .array(BenefitSchema)
      .min(1, { message: "At least one key benefit is required" }),
    productHighlights: z
      .array(
        z.object({
          value: z.string().min(1, { message: "Highlight is required" }),
        })
      )
      .min(1, { message: "At least one product highlight is required" }),
    nutritionInformation: z
      .array(NutritionSchema)
      .min(1, { message: "At least one nutrition item is required" }),
    energy: z.string().optional(),
    discountPrice: z
      .number()
      .min(0, { message: "Discount price cannot be negative" }),
    category: z.string().min(1, { message: "Category is required" }),
    stock: z.number().min(0, { message: "Stock cannot be negative" }),
    weight: z.string().optional(),
    flavor: z.string().optional(),
  });

  // useForm hook
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      keyBenefits: [
        { id: Date.now().toLocaleString(), topic: "", description: "" },
      ],
      productHighlights: [{ value: "" }],
      nutritionInformation: [
        { id: Date.now().toLocaleString(), nutrition: "", quantity: "" },
      ],
      energy: "",
      discountPrice: 0,
      category: "",
      stock: 0,
      weight: "",
      flavor: "",
    },
  });
  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  const CATEGORIES = [
    "Protine",
    "Ceratine",
    "Pre-Workout",
    "Multi-Vitamins",
    "Fish Oil",
  ];

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("/api/upload-image");
      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const addProduct = (values: z.infer<typeof ProductSchema>) => {
    let {
      title,
      description,
      category,
      discountPrice,
      keyBenefits,
      nutritionInformation,
      productHighlights,
      energy,
      stock,
      weight,
      flavor,
    } = values;
    startTransition(async () => {
      try {
        if (files.length === 0) {
          toast.error("Please add at least one product image", {
            position: "bottom-right",
            duration: 3000,
            className: "bg-red-700 text-white border border-red-600",
            style: {
              backgroundColor: "#C1292E",
              color: "white",
              border: "1px solid #3e5692",
            },
          });
          return;
        }

        const imageUrls = await Promise.all(
          files.map(async (imageFile) => {
            let file = imageFile.file as File;

            // Authenticate
            let authParams;
            try {
              authParams = await authenticator();
            } catch (authError) {
              console.error("Failed to authenticate for upload:", authError);
              return null;
            }

            const { signature, expire, token, publicKey } = authParams;

            // Upload
            try {
              const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                abortSignal: abortController.signal,
              });

              console.log("Upload response:", uploadResponse);
              return uploadResponse.url;
            } catch (error) {
              if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
              } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
              } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
              } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
              } else {
                console.error("Upload error:", error);
              }
              return null;
            }
          })
        );

        const filteredUrls = imageUrls.filter((url) => url !== null);

        const newProductHighlights = productHighlights.map(
          (highlight: any) => highlight.value
        );

        try {
          const req = await axios.post("/api/addProduct", {
            title,
            description,
            category,
            imageUrls: filteredUrls,
            price: 0,
            discountPrice,
            keyBenefits,
            nutritionInformation,
            productHighlights: newProductHighlights,
            energy,
            stock,
            weight,
            flavor,
          });
          const { success, message } = req.data;
          if (success) {
            toast.success(message, {
              position: "bottom-right",
              duration: 3000,
              className: "bg-green-700 text-white border border-green-600",
              style: {
                backgroundColor: "#285943",
                color: "white",
                border: "1px solid #3e5692",
              },
            });
            setFiles([]);
            form.reset();
          } else {
            toast.error(message, {
              position: "bottom-right",
              duration: 3000,
              className: "bg-red-700 text-white border border-red-800",
              style: {
                backgroundColor: "#7a1f1f",
                color: "white",
                border: "1px solid #a33d3d",
              },
            });
          }
        } catch (error) {
          console.error("Error adding product:", error);
          toast.error("Failed to add product", {
            description: "Please check your input and try again.",
            position: "bottom-right",
            duration: 3000,
            className: "bg-red-700 text-white border border-red-800",
            style: {
              backgroundColor: "#7a1f1f",
              color: "white",
              border: "1px solid #a33d3d",
            },
          });
        }
      } catch (err) {
        console.error("Unexpected error in product creation flow:", err);
        toast.error("Something went wrong", {
          description: "Unexpected error occurred. Try again later.",
          position: "bottom-right",
          duration: 3000,
          className: "bg-red-800 text-white border border-red-900",
          style: {
            backgroundColor: "#5e1a1a",
            color: "white",
            border: "1px solid #aa3d3d",
          },
        });
      }
    });
  };

  const {
    fields: nutritionFields,
    append: addNutrition,
    remove: removeNutrition,
  } = useFieldArray({
    control: form.control,
    name: "nutritionInformation",
  });
  const {
    fields: keyBenefitFeilds,
    append: addKeyBenefit,
    remove: removeKeyBenfit,
  } = useFieldArray({
    control: form.control,
    name: "keyBenefits",
  });

  const {
    fields: productHighlights,
    append: addHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: form.control,
    name: "productHighlights",
  });

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Add New Product
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(addProduct)}
                className="space-y-6"
              >
                {/* Product Name */}
                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Product Name
                        </FormLabel>
                        <Input
                          placeholder="Enter product name"
                          required
                          className="rounded-lg border-gray-300 bg-gray-50 focus:border-[#0047AB] focus:ring-[#0047AB]"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Description
                        </FormLabel>
                        <Textarea
                          rows={4}
                          placeholder="Enter product description"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Category
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              {field.value || "Select Category"}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CATEGORIES.map((category: string, index) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-1">
                  <Label>Product Images</Label>
                  <ImageUpload files={files} setFiles={setFiles} />
                </div>

                {/* Pricing and Inventory */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing & Inventory</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="discountPrice"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Discount Price ($)
                              </FormLabel>
                              <Input
                                placeholder="0.00"
                                type="number"
                                {...field}
                                onChange={(e) => {
                                  // Convert string input to number or empty string if invalid
                                  const value = e.target.value;
                                  const parsed =
                                    value === "" ? "" : Number(value);
                                  field.onChange(parsed);
                                }}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="stock"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Stock Quantity *
                              </FormLabel>
                              <Input
                                placeholder="0"
                                type="number"
                                {...field}
                                onChange={(e) => {
                                  // Convert string input to number or empty string if invalid
                                  const value = e.target.value;
                                  const parsed =
                                    value === "" ? "" : Number(value);
                                  field.onChange(parsed);
                                }}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="weight"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Weight
                              </FormLabel>
                              <Input
                                placeholder="e.g., 2 lbs, 1 kg"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="flavor"
                          render={({ field }) => (
                            <FormItem className="space-y-2">
                              <FormLabel className="text-sm font-medium text-gray-700">
                                Flavor
                              </FormLabel>
                              <Input
                                placeholder="e.g., Chocolate, Vanilla"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nutrition Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Nutrition Information
                      <Button
                        type="button"
                        onClick={() =>
                          addNutrition({
                            id: Date.now().toString(),
                            nutrition: "",
                            quantity: "",
                          })
                        }
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Nutrition
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {nutritionFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`nutritionInformation.${index}.nutrition`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <Input placeholder="e.g., Protein" {...field} />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`nutritionInformation.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem className="w-32">
                              <Input placeholder="e.g., 25g" {...field} />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {nutritionFields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeNutrition(index)}
                            className="mt-5 cursor-pointer bg-red-400 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Key Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Key Benefits
                      <Button
                        type="button"
                        onClick={() =>
                          addKeyBenefit({
                            id: Date.now().toString(),
                            topic: "",
                            description: "",
                          })
                        }
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Benefit
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {keyBenefitFeilds.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`keyBenefits.${index}.topic`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <Input
                                placeholder="Benefit topic (e.g., Muscle Growth)"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`keyBenefits.${index}.description`}
                          render={({ field }) => (
                            <FormItem className="w-64">
                              <Textarea
                                placeholder="Benefit description"
                                rows={2}
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {keyBenefitFeilds.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeKeyBenfit(index)}
                            className="mt-5 cursor-pointer bg-red-400 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Highlights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      Highlights
                      <Button
                        type="button"
                        onClick={() => addHighlight({ value: "" })}
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Highlight
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {productHighlights.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`productHighlights.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <Input
                                placeholder="Enter product highlight"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {productHighlights.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeHighlight(index)}
                            className="mt-5 cursor-pointer bg-red-400 text-white"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] w-32"
                  >
                    {isPending ? "Please Wait..." : "Add Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AddProductSection;
