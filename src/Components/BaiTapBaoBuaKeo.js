import React, { Component } from "react";
import "./buble.css";
import { connect } from "react-redux";

export class BaiTapBaoBuaKeo extends Component {
  renderBaoBuaKeo = () => {
    return this.props.mangBaoBuaKeo.map((item, i) => {
      return (
        <div className="col-4" key={i}>
          <button
            onClick={() => {
              this.props.youChoose(item.id);
            }}
          >
            <img
              src={item.hinhAnh}
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </button>
        </div>
      );
    });
  };

  render() {
    const { banThang, banChoi, mangBaoBuaKeo, computer, ketQua } = this.props;
    console.log(mangBaoBuaKeo);
    return (
      <div
        className="row text-center"
        style={{
          backgroundImage: "url(./img/baoBuaKeo/bgGame.png)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="col-4 playerBox">
          <div className="think">
            <img
              src={mangBaoBuaKeo.find((item) => item.datCuoc === true).hinhAnh}
              alt=""
              style={{ width: "200px", height: "200px", marginTop: "50px" }}
            />
          </div>
          <div className="speech-bubble"></div>
          <img src="./img/baoBuaKeo/player.png" alt="" />

          <div className="row mt-5">{this.renderBaoBuaKeo()}</div>
        </div>

        <div className="col-4">
          <h1>{ketQua}</h1>
          <div className="text">
            <h1>
              Số bàn thắng: <span>{banThang}</span>{" "}
            </h1>
            <h1>
              Số bàn chơi: <span>{banChoi}</span>{" "}
            </h1>

            <button onClick={() => this.props.playGame()}>Play game</button>
          </div>
        </div>

        <div className="col-4 playerBox">
          <div className="think" style={{ position: "relative" }}>
            <img
              src={computer.hinhAnh}
              alt=""
              style={{
                width: "200px",
                height: "200px",
                marginTop: "50px",
                animation: ".2s",
              }}
            />
          </div>
          <div className="speech-bubble"></div>
          <img src="./img/baoBuaKeo/playerComputer.png" alt="" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mangBaoBuaKeo: state.BaoBuaKeoReducer.mangBaoBuaKeo,
    banThang: state.BaoBuaKeoReducer.banThang,
    banChoi: state.BaoBuaKeoReducer.banChoi,
    computer: state.BaoBuaKeoReducer.computerChoose,
    ketQua: state.BaoBuaKeoReducer.ketQua,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    youChoose: (maCuoc) => {
      let action = {
        type: "CHOOSE",
        maCuoc,
      };
      dispatch(action);
    },

    playGame: () => {
      let n = 0;

      let autoRandom = setInterval(() => {
        let action = {
          type: "PLAY_GAME",
        };
        dispatch(action);
        n++;
        if (n === 5) {
          clearInterval(autoRandom);

          let action = {
            type: "END_GAME",
          };
          dispatch(action);
        }
      }, 500);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BaiTapBaoBuaKeo);
