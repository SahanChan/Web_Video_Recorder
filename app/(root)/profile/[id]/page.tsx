import React from "react";
import Header from "@/components/Header";
import { dummyCards } from "@/constants";
import VideoCard from "@/components/VideoCard";
import { images } from "@/constants/images";

const ProfileDetails = async ({ params }: ParamsWithSearch) => {
  const { id } = await params;
  return (
    <div className="wrapper page">
      <Header
        subHeader="sahan@sahanchan.com"
        title="Sahan | JS"
        userImg={images.dummy}
      />

      <section className="video-grid">
        {dummyCards.map((card) => (
          <VideoCard key={card.id} {...card} />
        ))}
      </section>
    </div>
  );
};
export default ProfileDetails;
