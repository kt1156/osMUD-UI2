"use client";

const MudJSONKey = "mud-json-store";

class MudStore {
  ClearJson() {
    localStorage.removeItem(MudJSONKey);
  }

  StoreJson(obj: string) {
    let jsonObject = JSON.stringify(JSON.parse(obj));
    localStorage.setItem(MudJSONKey, jsonObject);
  }

  LoadJson(): any | null {
    let fetchedItem = localStorage.getItem(MudJSONKey);
    if (fetchedItem == null) return null;

    return JSON.parse(fetchedItem);
  }
}

export default new MudStore();
