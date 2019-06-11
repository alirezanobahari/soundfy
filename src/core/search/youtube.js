import youtubeSearch from "youtube-search";
import { GOOGLE_API_KEY } from "../../common/keys";

const opts = {
  key: GOOGLE_API_KEY
};

export default (query, maxResults) =>
  youtubeSearch(query, { key: GOOGLE_API_KEY, maxResults });
