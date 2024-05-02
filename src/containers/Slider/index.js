import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {

  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    // Ajout d'un If pour (byDateDesc)
    if (byDateDesc) {
      setTimeout(
      // Add - 1 à byDateDesc.length
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
    );
      }
  };

  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ajout de <div key={event.title}> autour des éléments qui rend chaque itération du mapping unique
        <div key={event.title}>
          <div className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input

                // Change la valeur de event.id en e.title
                  key={`${e.title}`}
                  type="radio"
                  name="radio-button"

                  // change idx en index
                  checked={index === radioIdx}
                  // Ajout de readOnly
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
