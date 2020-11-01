import { combineReducers } from "redux";
import BaiTapBaoBuaKeoReducer from "./BaiTapBaoBuaKeoReducer";

export const rootReducer = combineReducers({
  BaoBuaKeoReducer: BaiTapBaoBuaKeoReducer,
});
