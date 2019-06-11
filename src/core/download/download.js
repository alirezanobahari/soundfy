import { YOUTUBE } from "../../common/services";
import youtubeDownloader from "../download/youtube";

export default async (videoId, serviceType = YOUTUBE) => {
  switch (serviceType) {
    // Download from Youtube
    case YOUTUBE: {
      return youtubeDownloader(videoId);
    }
  }
};
