import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone } =
  generateReactHelpers<OurFileRouter>();