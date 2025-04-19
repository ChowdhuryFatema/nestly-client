import { Dispatch } from "react";
import { Input } from "../../input";
import { cn } from "@/lib/utils";
import { CloudUpload } from "lucide-react";

type TImageUploaderProps = {
  setImageFiles: Dispatch<React.SetStateAction<File[] | string[]>>;
  setImagePreview: Dispatch<React.SetStateAction<string[]>>;
  label: string;
  className?: string;
};

const ImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploaderProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setImageFiles((prev) => [...prev, ...fileArray] as File[] | string[]);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    event.target.value = "";
  };

  return (
    <div className={cn("w-full lg:w-1/2", className)}>
      <Input
        onChange={handleImageChange}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      />
      <label htmlFor="image-uploader" className="w-full  h-28 gap-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition">
        <CloudUpload></CloudUpload>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default ImageUploader;
  