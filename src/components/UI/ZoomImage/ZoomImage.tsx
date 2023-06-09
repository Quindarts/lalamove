import "styles/components/UI/zoomImage.css";
type ImageZoomPropType = {
    srcImage: string;
};
const ImageZoom = (props: ImageZoomPropType) => {
    const { srcImage } = props;

    return (
        <div className="zoomImage-container">
            <img
                className="zoomImage"
                src={srcImage}
                alt="Zoomable zoomImage"
                width="100%"
                height="100%"
            />
            <div className="zoom_overlay" />
        </div>
    );
};

export default ImageZoom;
