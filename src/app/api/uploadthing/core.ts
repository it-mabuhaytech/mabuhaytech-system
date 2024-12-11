import { db } from "@/db/db";
import { employeesTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
const f = createUploadthing();
// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
        // Set permissions and file types for this FileRoute
        .middleware(async ({}) => {
            // This code runs on your server before upload
            const cookiesStore = await cookies();

            const id = cookiesStore.get("userid")?.value;

            if (!id) throw new UploadThingError("Unauthorized");

            const user = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.id, parseInt(id)));
            // If you throw, the user will not be able to upload
            if (!user) throw new UploadThingError("Unauthorized");
            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user[0].id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);

            const cookiesStore = await cookies();

            const id = cookiesStore.get("userid")?.value;

            if (id) {
                await db
                    .update(employeesTable)
                    .set({
                        employeeImage: [file.url],
                    })
                    .where(eq(employeesTable.employeeid, id));
            }

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
