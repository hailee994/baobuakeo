const initialState = {
  computerChoose: { id: "bao", hinhAnh: "./img/baoBuaKeo/bao.png" },
  mangBaoBuaKeo: [
    { id: "bao", hinhAnh: "./img/baoBuaKeo/bao.png", datCuoc: true },
    { id: "bua", hinhAnh: "./img/baoBuaKeo/bua.png", datCuoc: false },
    { id: "keo", hinhAnh: "./img/baoBuaKeo/keo.png", datCuoc: false },
  ],
  banThang: 0,
  banChoi: 0,
  ketQua: "JackPot!!!",
};

const BaiTapBaoBuaKeoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHOOSE": {
      console.log(action);
      let mangBaoBuaKeoUpdate = [...state.mangBaoBuaKeo];
      mangBaoBuaKeoUpdate = mangBaoBuaKeoUpdate.map((item) => {
        if (item.id === action.maCuoc) {
          return { ...item, datCuoc: true };
        }
        return { ...item, datCuoc: false };
      });

      state.mangBaoBuaKeo = mangBaoBuaKeoUpdate;

      return { ...state };
    }

    case "PLAY_GAME": {
      let chonNgauNhien = Math.floor(Math.random() * 3);
      let quanNgauNhien = state.mangBaoBuaKeo[chonNgauNhien];

      state.computerChoose = quanNgauNhien;
      return { ...state };
    }

    case "END_GAME": {
      let playerChoose = state.mangBaoBuaKeo.find(
        (item) => item.datCuoc === true
      );
      let computer = state.computerChoose;

      switch (playerChoose.id) {
        case "keo":
          if (computer.id === "keo") {
            state.ketQua = "Draw Play Againt!!!";
          } else if (computer.id === "bua") {
            state.ketQua = "LOSSER!!!";
          } else {
            state.ketQua = "JackPot!!!";
            state.banThang += 1;
          }
          break;
        case "bua":
          if (computer.id === "keo") {
            state.ketQua = "JackPot!!!";
            state.banThang += 1;
          } else if (computer.id === "bua") {
            state.ketQua = "Draw Play Againt!!!";
          } else {
            state.ketQua = "LOSSER!!!";
          }
          break;
        case "bao":
          if (computer.id === "keo") {
            state.ketQua = "LOSSER!!!";
          } else if (computer.id === "bua") {
            state.ketQua = "JackPot!!!";
            state.banThang += 1;
          } else {
            state.ketQua = "Draw Play Againt!!!";
          }
          break;
        default:
          state.ketQua = "JackPot!!!";
          break;
      }

      state.banChoi += 1;
      return { ...state };
    }

    default:
      return state;
  }
};

export default BaiTapBaoBuaKeoReducer;
