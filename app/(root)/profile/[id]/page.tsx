import React from "react";
import Header from "@/components/Header";
import { dummyCards } from "@/constants";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants/images";
import { getAllVideosByUser } from "@/lib/actions/video";
import { redirect } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import { icons } from "@/constants/icons";

const ProfileDetails = async ({ params, searchParams }: ParamsWithSearch) => {
  const { id } = await params;
  const { query, filter } = await searchParams;
  const { user, videos } = await getAllVideosByUser(id, query, filter);

  if (!user) redirect("/404");

  return (
    <div className="wrapper page">
      <Header
        subHeader={user?.email}
        title={user?.name}
        userImg={user?.image ?? ""}
      />

      <section>
        {videos?.length > 0 ? (
          <section className="video-grid">
            {videos.map(({ video, user }) => (
              <VideoCard
                key={video.id}
                {...video}
                thumbnail={video.thumbnailUrl}
                userImg={user?.image || ""}
                username={user?.name || "Guest"}
              />
            ))}
          </section>
        ) : (
          <EmptyState
            icon={icons.video}
            title="No Videos available yet"
            description="Videos will show up once you upload"
          />
        )}
      </section>
    </div>
  );
};
export default ProfileDetails;
