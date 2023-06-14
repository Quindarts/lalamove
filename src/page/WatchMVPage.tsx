import React from "react";

function WatchMVPage() {
    const embedUrl = `https://www.youtube.com/embed/60ItHLz5WEA`;
    return (
        <div className="flex justify-center align-middle">
            <iframe
                width="1000px"
                height="600px"
                src={embedUrl}
                title="Music Video"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default WatchMVPage;
