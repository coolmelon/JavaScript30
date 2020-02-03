const { Fragment, useEffect, useState } = React;

const keys = [
  {
    key_code: "65",
    letter: "A",
    sound_name: "clap",
    sound_link: "../../sounds/clap.wav"
  },
  {
    key_code: "83",
    letter: "S",
    sound_name: "hihat",
    sound_link: "../../sounds/hihat.wav"
  },
  {
    key_code: "68",
    letter: "D",
    sound_name: "kick",
    sound_link: "../../sounds/kick.wav"
  },
  {
    key_code: "70",
    letter: "F",
    sound_name: "openhat",
    sound_link: "../../sounds/openhat.wav"
  },
  {
    key_code: "71",
    letter: "G",
    sound_name: "boom",
    sound_link: "../../sounds/boom.wav"
  },
  {
    key_code: "72",
    letter: "H",
    sound_name: "ride",
    sound_link: "../../sounds/ride.wav"
  },
  {
    key_code: "74",
    letter: "J",
    sound_name: "snare",
    sound_link: "../../sounds/snare.wav"
  },
  {
    key_code: "75",
    letter: "K",
    sound_name: "tom",
    sound_link: "../../sounds/tom.wav"
  },
  {
    key_code: "76",
    letter: "L",
    sound_name: "tink",
    sound_link: "../../sounds/tink.wav"
  }
];

const keyCodeList = [81, 87, 69, 65, 83, 68, 90, 88, 67];

const KeyItem = props => {
  const { datakey, onClick, keyTitle, keyLetter, sound_link } = props;

  return (
    <Fragment>
      <div datakey={datakey} className="key drum-pad" onClick={e => onClick(e)}>
        <kbd className="letter">{keyLetter}</kbd>
        <span className="sound">{keyTitle}</span>
        <audio className="clip" datakey={datakey} src={sound_link}></audio>
      </div>
    </Fragment>
  );
};

const KeysGroup = () => {
  const [codeData, setCode] = useState({ code: "" });
  const { code } = codeData;

  const playAudio = code => {
    const audioToSelect = document.querySelector(`audio[datakey="${code}"]`);
    if (audioToSelect) {
      audioToSelect.currentTime = 0;
      const promise = audioToSelect.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            // console.log("playing okay");
          })
          .catch(error => {
            console.log("sound playing is denied");
          });
      }
    }
  };

  useEffect(() => {
    playAudio(code);
  }, [playAudio]);

  const removeTransition = e => {
    if (e.propertyName !== "transform") return;
    e.currentTarget.classList.remove("playing");
  };
  const showKey = e => {
    e.currentTarget.classList.add("playing");
    e.currentTarget.addEventListener("transitionend", removeTransition);
  };

  const showKey2 = code => {
    const divToSelect = document.querySelector(`div[datakey="${code}"]`);
    if (divToSelect) {
      divToSelect.classList.add("playing");
      divToSelect.addEventListener("transitionend", removeTransition);
    }
  };

  const onClick = e => {
    // console.log(e.currentTarget.getAttribute("datakey"));
    setCode({ code: e.currentTarget.getAttribute("datakey") });
    showKey(e);
  };

  window.addEventListener("keydown", function(event) {
    let keycode = event.keyCode;
    if (keyCodeList.includes(keycode)) {
      playAudio(keycode);
      showKey2(keycode);
    }
  });

  return (
    <Fragment>
      <div className="keys">
        {keys.map(item => (
          <KeyItem
            key={item.sound_name}
            datakey={item.key_code}
            onClick={onClick}
            keyTitle={item.sound_name}
            keyLetter={item.letter}
            sound_link={item.sound_link}
          />
        ))}
      </div>
    </Fragment>
  );
};

ReactDOM.render(<KeysGroup />, document.getElementById("drum"));
