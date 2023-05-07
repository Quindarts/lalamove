import React from "react";
import { useState } from "react";
import useMusic from "../../../../hooks/useMusic";
import { MusicItemType } from "../../../../store/useMusic.slice";
import MusicGridItem from "../../../UI/Music/MusicGridItem";

function SearchDetail() {
    const { musics } = useMusic();
    const { data } = musics.search?.data || {};
    return (
        <>
            {data?.length > 0 ? (
                <h1 className="my-1 font-bold text-[25px] text-white mx-5 px-5">
                    SEARCHING
                </h1>
            ) : (
                <></>
            )}
            <div
                // style={{ borderBottom: "0.1px solid gray" }}
                className="m-[1rem] pb-4 flex flex-wrap gap-2"
            >
                {data?.map((item: MusicItemType, index: number) => (
                    <MusicGridItem key={index} music={item} />
                ))}
            </div>
        </>
    );
}

export default SearchDetail;
