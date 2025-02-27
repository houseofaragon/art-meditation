import { useEffect, useState } from "react";
import { images } from "./utils/imageData";
import Timer from "./Timer";
import supabase from "../supabase";

const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects";

function App() {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  // const [images, setImages] 

  useEffect(() => {
    try {
      const fetchImageData = async () => {
        const random = Math.floor((Math.random() * images.length) / 2 - 1);
        // filter only for images w/ primaryImage
        const imageId = images[random];
        const apiUrl = `${url}/${imageId}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.primaryImage) {
          await fetchImageData();
        } else {
          const { primaryImage, artistDisplayName, title, objectWikidata_URL } =
            data;
          const imageData = {
            imageSrc: primaryImage,
            artistDisplayName,
            title,
            wikiUrl: objectWikidata_URL,
          };

          return imageData;
        }
      };

      const getImage = async () => {
        let result = localStorage.getItem("imageData");

        if (!result) {
          result = await fetchImageData();
          setImageData(result);
          localStorage.setItem("imageData", JSON.stringify(result));
        } else {
          result = JSON.parse(result);
          setImageData(result);
        }
      };

      getImage();
    } catch (error) {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      let { data, error } = await supabase.from("sessions").select("*");

      if (error) {
        console.log("error", error);
      } else {
        console.log("durations", data);
      }

      //const durations = data.map((session) => session.duration);
    };

    getData();
  }, []);

  const startMeditation = () => {
    setIsTimerOn(true);
  };

  const quitMeditation = async () => {
    setIsTimerOn(false);

    const { error } = await supabase.from("sessions").insert([
      {
        duration: Math.floor(Math.random() * 9),
      },
    ]);

    if (error) {
      console.error("Error saving session", error);
    } else {
      console.log("session saved");
    }
  };

  const finishMeditation = async () => {
    setIsTimerOn(false);
    setIsFinished(true);

    const { error } = await supabase.from("sessions").insert([
      {
        duration: Math.floor(Math.random() * 9),
      },
    ]);

    if (error) {
      console.error("Error saving session", error);
    } else {
      console.log("session saved");
    }

    let { data } = await supabase.from("sessions").select("*");
    console.log(data);
  };

  if (isTimerOn && !imageData) {
    return <p>...Loading</p>;
  }

  return (
    <>
      {!isTimerOn && !isFinished && (
        <>
          <div className="intro">
            <p>
              Okay, Karen, let's meditate to a piece of artwork.
              <p>Let your mind wander, or let it be still.</p>
              <p>This will last 10 minutes. </p>
              <p>You got this.</p>
            </p>
          </div>
          <button onClick={() => startMeditation()}>Begin Meditation</button>
        </>
      )}
      {isTimerOn && (
        <>
          <div className="image-div">
            <img src={imageData.imageSrc} />
          </div>
          <button className="quit" onClick={() => quitMeditation()}>End Meditation</button>
          <Timer finishMeditation={finishMeditation} imageData={imageData} />
        </>
      )}
      {isFinished && (
        <>
          <p>Congratulation on meditating.</p>
          <p>
            You can learn more about this image{" "}
            <a href={imageData.wikiUrl}>here</a>.
          </p>
        </>
      )}
    </>
  );
}

export default App;
