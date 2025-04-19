import ImagePreviewer from "@/components/ui/core/ImageUploader/ImagePreview";
import { Form, FormItem, FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { uploadImageToCloudinary } from "@/services/Cloudinary";
import { TRentalHouse } from "@/types/RentalHouse.type";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ui/core/ImageUploader";
import NLButton from "@/components/ui/core/ImageUploader/NLButton";
import { separateImages } from "@/components/ui/core/ImageUploader/SeperateImages";
import { updateRentalHouse } from "@/services/ListingService";
import { zodResolver } from "@hookform/resolvers/zod";
import { rentalSchema } from "./rentalValidation";


export default function UpdateRentalForm({ rentalHouse }: { rentalHouse: TRentalHouse }) {
    const [imageFiles, setImageFiles] = useState<File[] | string[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);

    const form = useForm({
        resolver: zodResolver(rentalSchema),
        defaultValues: {
            location: "",
            rentAmount: "",
            bedrooms: "",
            amenities: "",
            description: "",
            // images: [],
        },
    });

    const {
        formState: { isSubmitting },
        reset
    } = form;


    useEffect(() => {
        reset(
            {
                location: rentalHouse?.location,
                rentAmount: rentalHouse?.rentAmount,
                bedrooms: rentalHouse?.bedrooms,
                amenities: rentalHouse?.amenities.join(", "),
                description: rentalHouse?.description,
            },
        );
        setImagePreview(rentalHouse?.images);
        setImageFiles(rentalHouse?.images);
    }, [rentalHouse, reset]);




    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log("data", data);
        const { previousImageUrls, newImageFiles } = separateImages(imageFiles);
        const updatedImages = [...previousImageUrls];

        try {

            if (newImageFiles.length > 0) {
                for (const image of newImageFiles) {
                    const res = await uploadImageToCloudinary(image);
                    console.log(res);
                    updatedImages.push(res?.url);
                }
            }
            
            if (updatedImages.length <= 0) {
                toast.error("Please upload at least one image");
                return;
            }

            const rentalHouseData: TRentalHouse = {
                ...data,
                amenities: data.amenities.split(",").map((amenity: string) => amenity.trim()),
                location: data.location,
                description: data.description,
                rentAmount: String(data.rentAmount),
                bedrooms: String(data.bedrooms),
                images: updatedImages,
            }
            console.log("rentalHouseData", rentalHouseData);
            const res = await updateRentalHouse(rentalHouse._id as string, rentalHouseData);
            console.log(res);
            if (res?.success) {
                toast.success(res?.message);
            } else {
                toast.error(res?.message);
            }
        } catch (error: any) {
            console.error(error);
        }

    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-center items-center">
                <div className="w-full">
                    <h1 className="text-2xl font-bold mb-4">Create Rental House</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <label className="text-md">Location</label>
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel />
                                        <Input {...field} value={field.value || ""} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <label className="text-md">Rent amount</label>
                            <FormField
                                control={form.control}
                                name="rentAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel />
                                        <Input {...field} value={field.value || ""} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <label className="text-md">Number of bedrooms</label>
                            <FormField
                                control={form.control}
                                name="bedrooms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel />
                                        <Input type="number" {...field} value={field.value || ""} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <label className="text-md">Amenities (comma separated)</label>
                            <FormField
                                control={form.control}
                                name="amenities"
                                render={({ field }) => (
                                    <FormItem>  
                                        <FormLabel />
                                        <Input placeholder="eg: wifi, parking, etc." {...field} value={field.value || ""} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />  



                            <div className="col-span-2">
                                <label className="text-md">Description</label>
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel />
                                            <Textarea className="h-24" {...field} value={field.value || ""} />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <div className="space-y-2">
                                <FormLabel className="text-md">Upload Images</FormLabel>
                                <ImageUploader
                                    setImageFiles={setImageFiles as React.Dispatch<React.SetStateAction<File[] | string[] | []>>}
                                    setImagePreview={setImagePreview}
                                    label="Upload Images"
                                />
                            </div>

                            <div>
                                {imagePreview?.length > 0 && (
                                    <ImagePreviewer
                                        setImageFiles={setImageFiles as React.Dispatch<React.SetStateAction<File[] | string[]>>}
                                        imagePreview={imagePreview}
                                        setImagePreview={setImagePreview}
                                        className=" flex flex-wrap gap-2"
                                    />
                                )}
                            </div>
                            <NLButton variant="primary" className="w-full" type="submit">
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </NLButton>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

