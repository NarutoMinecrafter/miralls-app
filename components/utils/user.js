import { APIRequest } from "./api"
import { deleteTokens } from "./jwt"
import { API, DEFAULT_USER_PICTURE } from "../../constants"


export async function logOut() {
    await deleteTokens()
}

export async function getUserData() {
    const json = await APIRequest.get('user/')
    if (!json) return null
    if (json.success) {
        json.data.picture = getUserPictureURL(json.data.picture)
        return json.data
    }
}

export function getUserPictureURL(uri) {
    if (!uri) return DEFAULT_USER_PICTURE
    else return API.URL + uri.slice(1)
}