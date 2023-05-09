import { createFactory, useEffect, useState, useRef } from "react";
import { useHash } from "react-use";

export function FormularioHelados(props) {
  const [hash, setHash] = useHash(null);
  const [resetSelects, setResetSelects] = useState();
  //checks how many dropDowns are
  // dropDowns content will be like this : ["flavour1","flavour2", undefined]
  const [dropDowns, setDropDowns] = useState([]);
  const [extras, setExtras] = useState({
    rocklets: { price: 100, isChecked: false },
    conos: { price: 80, count: 0 },
    salsa: { price: 110, type: null },
  });

  useEffect(() => {
    if (resetSelects) {
      let arr = [];
      for (let i = 0; i < props.iceCreamForm.product.flavours; i++) {
        arr.push("");
      }
      setDropDowns([...arr]);
      setResetSelects(false);
    }
  }, [resetSelects]);

  useEffect(() => {
    if (hash === "" && props.iceCreamForm.display === "flex") {
      animateAndClose();
    }
  }, [hash]);

  //creates  an array of objects on state for each flavour avaliable to choose
  //later those object will be used to return the DropDown components
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < props.iceCreamForm.product.flavours; i++) {
      arr.push("");
    }
    setDropDowns([...arr]);
  }, [props.iceCreamForm.product]);

  useEffect(() => {}, [props.iceCreamForm.product]);

  //switches the body overflow property
  useEffect(() => {
    // Code to run on mount
    document.body.style.overflow = "hidden";
    return () => {
      // Code to run on unmount
      document.body.style.overflow = "auto";
    };
  }, []);

  let totalPrice = () => {
    let total = props.iceCreamForm.product?.price; //reemplazar por precio de helados

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

  //adds a dropDown
  function addDropDown() {
    const copy = [...dropDowns];

    copy.push("");
    setDropDowns(copy);
  }

  //index property of other objects doesnt change
  function removeDropDown(index) {
    const copy = [...dropDowns];
    /* var index = copy.indexOf(value); */
    copy.splice(index, 1);
    setDropDowns(copy);
  }

  //onClose, remove fadein class (OPTIONAL), add fadeout clasee, set onAnimationend : Close
  const formRef = useRef(null);

  function animateAndClose() {
    formRef.current.classList.remove(
      "animate__animated",
      "animate__fadeInLeft"
    );
    formRef.current.classList.add("animate__animated", "animate__fadeOutLeft");

    function handleAnimationEnd() {
      props.setIceCreamForm((prev) => ({ ...prev, display: "none" }));
    }
    formRef.current.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  }

  function selectedFlavours() {
    let number = 0;
    dropDowns.forEach((value) => {
      if (value) {
        number = number + 1;
      }
    });
    return number;
  }
  ////

  return (
    <form
      id="formulario-helados"
      ref={formRef}
      style={{
        display: props.iceCreamForm.display
          ? props.iceCreamForm.display
          : "none",
      }}
      className={
        props.iceCreamForm.display === "flex"
          ? "animate__animated animate__fadeInLeft"
          : ""
      }
      onSubmit={(e) => {
        e.preventDefault();
        setHash("");
        ///////////////////////////////////
        //add flavours

        let flavoursArr = [];

        for (let i = 0; i < props.iceCreamForm.product.flavours; i++) {
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
          name: props.iceCreamForm.product.name,
          imgUrl: props.iceCreamForm.product.imgUrl,
          count: 1,
          extras: extras,
          flavoursArr: flavoursArr,
          price: totalPrice(),
          totalPrice: totalPrice(),
        };

        props.addIceCream(fullProduct);
        e.target.reset();
        setResetSelects(true);
      }}
    >
      <div className="form-content">
        <fieldset className="sabores">
          <legend>
            {selectedFlavours()}/{dropDowns.length}{" "}
          </legend>
          {dropDowns.map((dropDownValue, index) => (
            //for every item in the array, create
            <DropDown
              flavours={props.flavours}
              removeDropDown={removeDropDown}
              dropDowns={[...dropDowns]}
              setDropDowns={setDropDowns}
              name={`Sabor ${index + 1}`}
              key={`${index}-dropDown`}
              index={index}
            />
          ))}
          {dropDowns.length < props.iceCreamForm.product?.flavours ? (
            <div className="add-flavour" onClick={addDropDown}>
              <p>
                AGREGAR <span>+</span>
              </p>
            </div>
          ) : null}
        </fieldset>
        <fieldset className="extra">
          <legend
            className="dropdown-button animate__animated animate__pulse animate__infinite animate__slower"
            onClick={() => {
              const content = document.querySelector(".extra-content");
              content.style.display === "none"
                ? (content.style.display = "grid")
                : (content.style.display = "none");
            }}
          >
            Adicionales <img src="/img/arrow-down.svg" />
          </legend>
          <div className="extra-content" style={{ display: "none" }}>
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
                <option value="">Elegir salsa</option>
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

        <button
          type="submit"
          className="binary-buttons neon-red animate__animated animate__pulse animate__infinite animate__slower"
        >
          Aceptar
        </button>

        <img
          className="close"
          src="/img/return.svg"
          alt="return"
          onClick={() => {
            setHash("");
          }}
        />
      </div>
    </form>
  );
}

function DropDown(props) {
  function isValueSelected(value) {
    let result = false;

    props.dropDowns.forEach((dropDownValue) => {
      if (dropDownValue === value) {
        result = true;
      }
    });
    return result;
  }

  return (
    <fieldset className="sabor">
      <div className="input-container">
        <select
          id={`${props.index}-select`}
          className="required"
          name={props.name}
          //the value has to come from state because, the onChange triggers a re-render so the value resets
          //it reseted because the options key was uniqid() so it was diferent every re-render
          value={props.dropDowns[props.index]}
          onChange={(e) => {
            //updates the dropDown representation in the state
            const copy = [...props.dropDowns];

            copy[props.index] = e.target.value;
            props.setDropDowns(copy);
          }}
          required
        >
          <option value="">Elegi un sabor</option>
          {props.flavours?.map((sabor, index) => (
            <option
              value={sabor}
              key={`${index}-option`}
              disabled={isValueSelected(sabor)}
            >
              {sabor}
            </option>
          ))}
        </select>
        {props.index !== 0 ? (
          <img
            onClick={() => props.removeDropDown(props.index)}
            src="/img/remove.svg"
          />
        ) : (
          <img src="/img/remove.svg" style={{ opacity: "0.4" }} />
        )}
      </div>
    </fieldset>
  );
}
