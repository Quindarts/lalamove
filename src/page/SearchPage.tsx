import useMusic from "hooks/useMusic";
import { MusicItemType } from "types/musicType";
import MusicGridItem from "components/UI/Music/MusicGridItem";

function SearchPage() {
    const { musics } = useMusic();
    const { data } = musics.search || {};
    return (
        <>
            <h1 className="my-1 font-bold text-[25px] text-white mx-5 px-5">
                Kết quả tìm kiếm
            </h1>
            {data?.length === 0 && (
                <h1 className="text-center text-[#40d195] font-bold p-5 text-[20px]">
                    Thật trống trải, không tìm thấy bài hát nào ...
                </h1>
            )}
            <div className="m-[1rem] pb-4 flex flex-wrap gap-2">
                {data?.map((item: MusicItemType, index: number) => (
                    <MusicGridItem key={index} music={item} />
                ))}
            </div>
        </>
    );
}

export default SearchPage;
