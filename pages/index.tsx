import type { NextPage } from "next";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import Arrow from "../icons/arrow.svg";
import Finish from "../icons/finish.svg";
import Reload from "../icons/reload.svg";

import frontendImage from "../icons/frontend.png";
import backendImage from "../icons/backend.png";
import databaseImage from "../icons/database.png";
import cloudImage from "../icons/cloud.png";
import notfoundImage from "../icons/notfound.png";

const dataBase = {
  cloud: { value: "cloud", img: cloudImage, width: "235px", height: "235px" },
  frontend: {
    value: "frontend",
    img: frontendImage,
    width: "235px",
    height: "235px",
  },
  backend: {
    value: "backend",
    img: backendImage,
    width: "226px",
    height: "226px",
  },
  database: {
    value: "banco de dados",
    img: databaseImage,
    width: "197px",
    height: "197px",
  },
  404: {
    value: "não encontrado",
    img: notfoundImage,
    width: "235px",
    height: "235px",
  },
} as {
  [key: string]: {
    value: string;
    img: StaticImageData;
    width: string;
    height: string;
  };
};

const Home: NextPage = () => {
  const [step, setStep] = useState<number>(1);
  const [isDemo, setIsDemo] = useState(true);
  const saveName = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      name: { value: string };
    };
    const nameSaved = localStorage.getItem("name");
    if (target.name.value) {
      localStorage.setItem("name", target.name.value);
      setStep(2);
      return;
    } else if (!target.name.value && nameSaved) {
      setStep(2);
    }
  };
  const saveQuestion1 = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      fav_language: { value: string };
    };
    localStorage.setItem("fav_language", target.fav_language.value);
    setStep(3);
  };

  const reset = () => {
    setIsDemo(false);
    setStep(1);
  };

  const changeColor = (id: string) => {
    const element = document.getElementById(`${id}Container`);
    const radios = document.getElementsByClassName("radioContainer");

    [].forEach.call(radios, function (el: HTMLElement) {
      el.classList.remove("containerSelected");
    });

    if (!element) return;
    element.classList.add("containerSelected");
  };

  return (
    <div className={`home${!isDemo ? " homeRender" : ""}`}>
      <h2>
        Teste para saber sua <b>trilha</b>
      </h2>
      {step === 1 && (
        <div className={!isDemo ? "step1Render" : "step1"}>
          <form onSubmit={saveName} className="login">
            {!isDemo && localStorage.getItem("name") !== "" ? (
              <div className="welcome">
                <b>Bem vindo</b>
                <small>{localStorage.getItem("name")}</small>
              </div>
            ) : (
              <>
                {!isDemo && <h2>Qual é o seu nome?</h2>}
                <input type="text" placeholder="Nome" id="name" name="name" />
              </>
            )}
            <button
              type="submit"
              className={`button ${!isDemo ? " buttonRender" : ""}`}
            >
              {isDemo ? "Continuar" : "Começar"}
              {!isDemo && <Image src={Arrow} alt="Seta para direita" />}
            </button>
          </form>
        </div>
      )}
      {step === 2 && (
        <div className={`questions${!isDemo ? " questionsRender" : ""}`}>
          <h4>O que você mais gosta?</h4>
          <form onSubmit={saveQuestion1}>
            <div className="radioContainer" id="backendContainer">
              <input
                type="radio"
                className={!isDemo ? "removeCircle" : ""}
                onChange={() => !isDemo && changeColor("backend")}
                id="backend"
                name="fav_language"
                value="backend"
              />
              <label htmlFor="backend">
                Toda a parte logica por tras de um aplicativo
              </label>
            </div>
            <div className="radioContainer" id="frontendContainer">
              <input
                type="radio"
                className={!isDemo ? "removeCircle" : ""}
                onChange={() => !isDemo && changeColor("frontend")}
                id="frontend"
                name="fav_language"
                value="frontend"
              />
              <label htmlFor="frontend">
                Toda a parte de experiencia do usuário
              </label>
            </div>
            <div className="radioContainer" id="databaseContainer">
              <input
                type="radio"
                className={!isDemo ? "removeCircle" : ""}
                onChange={() => !isDemo && changeColor("database")}
                id="database"
                name="fav_language"
                value="database"
              />
              <label htmlFor="database">
                Toda a parte que envolve o armazenamento de dados junto com sua
                perfomace
              </label>
            </div>
            <div className="radioContainer" id="cloudContainer">
              <input
                type="radio"
                className={!isDemo ? "removeCircle" : ""}
                onChange={() => !isDemo && changeColor("cloud")}
                id="cloud"
                name="fav_language"
                value="cloud"
              />
              <label htmlFor="cloud">
                Toda a parte que envolve a maquina e seus requisitos para rodar
                o aplicativo
              </label>
            </div>
            <button
              type="submit"
              className={`button ${!isDemo ? " buttonRender" : ""}`}
            >
              Finalizar
              {!isDemo && <Image src={Finish} alt="Finalizar" />}
            </button>
          </form>
        </div>
      )}
      {step === 3 && (
        <div className="end">
          {!isDemo ? (
            <div className="endRender">
              <h3>PARABÉNS</h3>
              <Image
                src={
                  dataBase[localStorage.getItem("fav_language") || "404"].img
                }
                width={
                  dataBase[localStorage.getItem("fav_language") || "404"].width
                }
                height={
                  dataBase[localStorage.getItem("fav_language") || "404"].height
                }
                alt="Imagem parabéns"
              />
              <section>
                <div>A sua trilha é:</div>
                <b>
                  {
                    dataBase[localStorage.getItem("fav_language") || "404"]
                      .value
                  }
                </b>
              </section>
            </div>
          ) : (
            <h4>
              Parabéns sua trilha é
              {` ${
                dataBase[localStorage.getItem("fav_language") || "404"].value
              }`}
            </h4>
          )}
          <button
            onClick={() => reset()}
            className={`button ${!isDemo ? " buttonRender" : ""}`}
          >
            Refazer o teste
            {!isDemo && <Image src={Reload} alt="Refazer teste" />}
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
