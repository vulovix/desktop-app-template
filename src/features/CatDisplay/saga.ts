import { makeGetReq, request } from "packages/request";

import { call, put, takeLatest } from "redux-saga/effects";
import { actions } from "./slice";
import { isElectron } from "utils";

export function* handleGetCatImage(): any {
  const url = "/catapi/v1/images/search";

  let catImages: Array<{ url: string }>;

  try {
    if (isElectron()) {
      catImages = yield call(() => window.api.getCats(url));
    } else {
      catImages = yield call(request, url, makeGetReq());
    }
    yield put(actions.setCatImageUrl(catImages[0].url));
  } catch (error) {
    console.error("Failed to fetch cat image:", error);
    yield put(actions.setCatImageUrl(null));
  }
}

export default function* saga() {
  yield takeLatest(actions.getCatImage.type, handleGetCatImage);
}
