"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { UploadDropzone } from "@/utils/uploadthing";

export default function UploadButtonPopover({
    fetchData,
}: {
    fetchData: () => void;
}) {
    return (
        <Dialog>
            <DialogTrigger className="bg-blue-600 p-2 text-white rounded-md">
                Change Picture
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Profile Picture</DialogTitle>
                    <DialogDescription>
                        This action will change your profile pic
                    </DialogDescription>
                    <UploadDropzone
                        endpoint="imageUploader"
                        onClientUploadComplete={async (res) => {
                            // Do something with the response
                            // console.log("Files: ", res);

                            await fetch(
                                "/api/employee/update/profile-picture",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        profilePictureUrl: [res[0].url],
                                    }),
                                }
                            ).then(() => fetchData());

                            // alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            // alert(`ERROR! ${error.message}`);
                            console.error(error);
                        }}
                    />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
