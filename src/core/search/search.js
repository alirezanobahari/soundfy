import { YOUTUBE } from "../../common/services";
import youtubeSearch from "./youtube";

export default (query, maxResult = 10, serviceType = YOUTUBE) => {
  switch (serviceType) {
    // Search from Youtube
    case YOUTUBE:
      return youtubeSearch(query, maxResult);
  }
};
