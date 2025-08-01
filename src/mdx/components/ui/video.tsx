import { CDN_URL, DIRECTORIES } from "@/lib/constants";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/ui/kibo-ui/video-player";

const Video = ({
  baseRoute,
  baseSlug,
  pathname,
  src,
}: {
  baseRoute: string;
  baseSlug: string;
  pathname: string;
  src: string;
}) => {
  let path = pathname + "/" + src;

  if (!DIRECTORIES.includes(baseRoute)) {
    path =
      baseRoute + "/" + baseSlug + "/" + (src as string).replaceAll("../", "");
  }

  return (
    <VideoPlayer className="aspect-video overflow-hidden rounded-lg border">
      <VideoPlayerContent
        muted
        preload="auto"
        slot="media"
        src={CDN_URL + path || ""}
      />
      <VideoPlayerControlBar>
        <VideoPlayerPlayButton />
        <VideoPlayerSeekBackwardButton />
        <VideoPlayerSeekForwardButton />
        <VideoPlayerTimeRange />
        <VideoPlayerTimeDisplay showDuration />
        <VideoPlayerMuteButton />
        <VideoPlayerVolumeRange />
      </VideoPlayerControlBar>
    </VideoPlayer>
  );
};

export default Video;
