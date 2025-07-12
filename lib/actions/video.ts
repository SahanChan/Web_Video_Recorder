"use server";

import { apiFetch, getEnv, withErrorHandling } from "@/lib/utils";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { BUNNY } from "@/constants";
import { db } from "@/drizzle/db";

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIBRARY_ID = getEnv("BUNNY_LIBRARY_ID");
const ACCESS_KEYS = {
  streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
  storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
};
const TRANSCRIPT_URL = BUNNY.TRANSCRIPT_URL;
const EMBED_URL = BUNNY.EMBED_URL;

//helper functions
const getSessionUserID = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new Error("Not logged in");
  }
  return session.user.id;
};

//server actions

export const getVideoUploadUrl = withErrorHandling(async () => {
  await getSessionUserID();

  const videoResponse = await apiFetch(
    `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/video`,
    {
      method: "POST",
      bunnyType: "stream",
      body: { title: "Temporary title", collectionId: "" },
    },
  );

  const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoResponse.guid}`;

  return {
    videoId: videoResponse.guid,
    uploadUrl,
    accessKey: ACCESS_KEYS.storageAccessKey,
  };
});

export const getThumbnailUploadUrl = withErrorHandling(
  async (videoId: string) => {
    const fileName = `${Date.now()}-${videoId}-thubmnail`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${fileName}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${fileName}`;

    return {
      uploadUrl,
      cdnUrl,
      accessKey: ACCESS_KEYS.storageAccessKey,
    };
  },
);

export const saveVideoDetails = withErrorHandling(
  async (videoDetails: VideoDetails) => {
    const userId = await getSessionUserID();
    await apiFetch(
      `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_ID}/videos/${videoDetails.videoId}`,
      {
        method: "POST",
        bunnyType: "stream",
        body: {
          title: videoDetails.title,
          description: videoDetails.description,
        },
      },
    );
    await db.insert(videos).values({});
  },
);
