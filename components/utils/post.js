import { APIRequest } from "./api";
import { API } from "../../constants";

export async function getPosts(offset = 0, count = 20, archive = false, id) {
  const json = await APIRequest.get(`posts/${id ? id + "/" : ""}`, {
    offset: offset,
    count: count,
    archive: archive,
  });
  if (!json) return null;
  if (json.success) {
    return json.data.posts;
  }
}

export async function getComments(postId, offset = 0, count = 20) {
  const json = await APIRequest.get("post/" + postId + "/comments/", {
    offset: offset,
    count: count,
  });
  if (!json) return null;
  if (json.success) {
    return json.data.comments;
  }
}

export function getPostPictureURL(uri) {
  return API.URL + uri.slice(1);
}
