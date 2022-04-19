import client from "@/api/umi-request";

export function GetCategoryInfo() {
    return client.get('/category')
}
