import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import RenderTag from "../tag/RenderTag";
import { Badge } from "@/components/ui/badge";

interface Prop {
  user: {
    id: string;
    name: string;
    clerkId: string;
    picture: string;
    username: string;
  };
}

const UserCard = async ({ user }: Prop) => {
  const interactedTags = await getTopInteractedTags({ userId: user.id });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[382px]"
    >
      <section className=" background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className=" light-border size-[100px] rounded-full border object-cover"
        />
        <div className=" mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className=" body-regular text-dark500_light500 mt-2 line-clamp-1">
            @{user.username}
          </p>
        </div>
        <div className="mt-5">
          {interactedTags && interactedTags.length > 0 ? (
            <div className=" flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTag key={tag._id} id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </section>
    </Link>
  );
};

export default UserCard;
