import { createFactory, useEffect, useState } from "react";
import uniqid from "uniqid";

export function FormularioHelados(props) {
  const [dropDowns, setDropDowns] = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < props.product.flavours; i++) {
      arr.push({ index: i, value: null });
    }
    setDropDowns(arr);
  }, []);

  const [extras, setExtras] = useState({
    rocklets: { price: 100, isChecked: false },
    conos: { price: 80, count: 0 },
    salsa: { price: 110, type: null },
  });

  let totalPrice = () => {
    let total = props.product.price; //reemplazar por precio de helados

    if (extras.rocklets.isChecked) {
      total += extras.rocklets.price;
    }
    if (extras.conos.count > 0) {
      total += extras.conos.price * extras.conos.count;
    }
    if (extras.salsa.type) {
      total += extras.salsa.price;
    }
    return total;
  };

  function addFlavour() {
    const copy = [...dropDowns];
    copy.push({ index: dropDowns.length, value: null });
    setDropDowns(copy);
  }

  return (
    <div id="contenedor-formulario-helados">
      <form
        id="formulario-helados"
        onSubmit={(e) => {
          e.preventDefault();
          ///////////////////////////////////
          //add flavours

          let flavoursArr = [];

          for (let i = 0; i < props.product.flavours; i++) {
            flavoursArr[i] = { required: "", optional: "" };
          }

          const requiredSelects = document.querySelectorAll(".required");
          requiredSelects.forEach((select, index) => {
            flavoursArr[index].required = select.value;
          });

          const optionalSelects = document.querySelectorAll(".optional");
          optionalSelects.forEach((select, index) => {
            flavoursArr[index].optional = select.value;
          });

          ///////////////////////////////////
          //add extras

          ///////////////////////////////////

          const fullProduct = {
            name: props.product.name,
            imgUrl: props.product.imgUrl,
            count: 1,
            extras: extras,
            flavoursArr: flavoursArr,
            price: totalPrice(),
            totalPrice: totalPrice(),
          };

          props.addIceCream(fullProduct);
          props.close();
        }}
      >
        <fieldset className="sabores">
          <legend>Podes elegir hasta {props.product.flavours} sabores</legend>
          {dropDowns.map((dropDown, index) => (
            <DropDown
              dropDowns={dropDowns}
              setDropDowns={setDropDowns}
              name={`Sabor ${index + 1}`}
              key={uniqid()}
              index={index}
            />
          ))}
          {dropDowns.length < props.product.flavours ? (
            <div
              className="add-flavour"
              onClick={() => {
                addFlavour();
              }}
            >
              <p>
                AGREGAR <span>+</span>
              </p>
            </div>
          ) : null}
        </fieldset>
        <fieldset className="extra">
          <legend
            onClick={() => {
              const content = document.querySelector(".content");
              content.style.display === "none"
                ? (content.style.display = "grid")
                : (content.style.display = "none");
            }}
          >
            Opcional: <img src="/img/arrow-down.svg" />
          </legend>
          <div className="content" style={{ display: "none" }}>
            <label htmlFor="rocklets" className="rocklets">
              <span>Rocklets:</span>
              <input
                type="checkbox"
                name="subscribe"
                value="yes"
                id="rocklets"
                onChange={(e) => {
                  if (e.target.checked) {
                    const copy = { ...extras };
                    copy.rocklets.isChecked = true;
                    setExtras({ ...copy });
                    // extras = { ...copy };
                  } else {
                    const copy = { ...extras };
                    copy.rocklets.isChecked = false;
                    setExtras({ ...copy });
                    // extras = { ...copy };
                  }
                }}
              />
            </label>
            <div className="salsa">
              <label htmlFor="salsa">Salsa:</label>
              <select
                id="salsa"
                name="salsa"
                onChange={(e) => {
                  const copy = { ...extras };
                  copy.salsa.type = e.target.value;
                  setExtras({ ...copy });
                  //extras = { ...copy };
                }}
              >
                <option value="">Eligue una salsa</option>
                <option value="frutilla">Frutilla</option>
                <option value="chocolate">Chocolate</option>
              </select>
            </div>
            <div className="conos">
              <label htmlFor="conos">Conos:</label>
              <div className="count">
                <div
                  className="decrease"
                  onClick={() => {
                    const input = document.getElementById("conos");
                    if (input.value > 0) {
                      document.getElementById("conos").value--;
                      const copy = { ...extras };
                      copy.conos.count = input.value;
                      setExtras({ ...copy });
                      // extras = { ...copy };
                    }
                  }}
                >
                  -
                </div>
                <input
                  id="conos"
                  type="number"
                  min="1"
                  max="15"
                  step="1"
                  placeholder="0"
                  onChange={(e) => {
                    console.log("onchange");
                    const copy = { ...extras };
                    copy.conos.count = e.target.value;
                    setExtras({ ...copy });
                    // extras = { ...copy };
                  }}
                />
                <div
                  className="increase"
                  onClick={() => {
                    const input = document.getElementById("conos");
                    input.value++;
                    const copy = { ...extras };
                    copy.conos.count = input.value;
                    setExtras({ ...copy });
                    // extras = { ...copy };
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        <div className="total-helado">Total: $ {totalPrice()}</div>
        <div className="buttons-container">
          <button type="submit" className="binary-buttons font-effect-fire">
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => {
              props.close();
            }}
          >
            Atras
          </button>
        </div>
        <img
          className="close"
          src="/img/return.svg"
          alt="return"
          onClick={() => {
            props.close();
          }}
        />
      </form>
    </div>
  );
}

function DropDown(props) {
  const sabores = ["Frutilla", "Vainilla", "Chocolate", "Mantecol"];

  return (
    <fieldset className="sabor">
      <div className="input-container">
        <select
          className="required"
          name={props.name}
          value={props.dropDowns[props.index].value}
          onChange={(e) => {
            const copy = [...props.dropDowns];
            copy[props.index].value = e.target.value;
            props.setDropDowns(copy);

            console.log(props.dropDowns);
          }}
          required
        >
          <option value="">Elegi un sabor</option>
          {sabores.map((sabor) => (
            <option value={sabor} key={uniqid()}>
              {sabor}
            </option>
          ))}
        </select>
        {props.index !== 0 ? (
          <span
            onClick={() => {
              const copy = [...props.dropDowns];
              copy.splice(props.index, 1);
              props.setDropDowns(copy);
            }}
          >
            X
          </span>
        ) : (
          <span style={{ opacity: "0.4" }}>X</span>
        )}
      </div>
    </fieldset>
  );
}
