var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _React = React,
    Fragment = _React.Fragment,
    useEffect = _React.useEffect,
    useState = _React.useState;


var keys = [{
  key_code: "65",
  letter: "A",
  sound_name: "clap",
  sound_link: "../../sounds/clap.wav"
}, {
  key_code: "83",
  letter: "S",
  sound_name: "hihat",
  sound_link: "../../sounds/hihat.wav"
}, {
  key_code: "68",
  letter: "D",
  sound_name: "kick",
  sound_link: "../../sounds/kick.wav"
}, {
  key_code: "70",
  letter: "F",
  sound_name: "openhat",
  sound_link: "../../sounds/openhat.wav"
}, {
  key_code: "71",
  letter: "G",
  sound_name: "boom",
  sound_link: "../../sounds/boom.wav"
}, {
  key_code: "72",
  letter: "H",
  sound_name: "ride",
  sound_link: "../../sounds/ride.wav"
}, {
  key_code: "74",
  letter: "J",
  sound_name: "snare",
  sound_link: "../../sounds/snare.wav"
}, {
  key_code: "75",
  letter: "K",
  sound_name: "tom",
  sound_link: "../../sounds/tom.wav"
}, {
  key_code: "76",
  letter: "L",
  sound_name: "tink",
  sound_link: "../../sounds/tink.wav"
}];

var keyCodeList = [81, 87, 69, 65, 83, 68, 90, 88, 67];

var KeyItem = function KeyItem(props) {
  var datakey = props.datakey,
      _onClick = props.onClick,
      keyTitle = props.keyTitle,
      keyLetter = props.keyLetter,
      sound_link = props.sound_link;


  return React.createElement(
    Fragment,
    null,
    React.createElement(
      "div",
      { datakey: datakey, className: "key drum-pad", onClick: function onClick(e) {
          return _onClick(e);
        } },
      React.createElement(
        "kbd",
        { className: "letter" },
        keyLetter
      ),
      React.createElement(
        "span",
        { className: "sound" },
        keyTitle
      ),
      React.createElement("audio", { className: "clip", datakey: datakey, src: sound_link })
    )
  );
};

var KeysGroup = function KeysGroup() {
  var _useState = useState({ code: "" }),
      _useState2 = _slicedToArray(_useState, 2),
      codeData = _useState2[0],
      setCode = _useState2[1];

  var code = codeData.code;


  var playAudio = function playAudio(code) {
    var audioToSelect = document.querySelector("audio[datakey=\"" + code + "\"]");
    if (audioToSelect) {
      audioToSelect.currentTime = 0;
      var promise = audioToSelect.play();
      if (promise !== undefined) {
        promise.then(function () {
          // console.log("playing okay");
        }).catch(function (error) {
          console.log("sound playing is denied");
        });
      }
    }
  };

  useEffect(function () {
    playAudio(code);
  }, [playAudio]);

  var removeTransition = function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    e.currentTarget.classList.remove("playing");
  };
  var showKey = function showKey(e) {
    e.currentTarget.classList.add("playing");
    e.currentTarget.addEventListener("transitionend", removeTransition);
  };

  var showKey2 = function showKey2(code) {
    var divToSelect = document.querySelector("div[datakey=\"" + code + "\"]");
    if (divToSelect) {
      divToSelect.classList.add("playing");
      divToSelect.addEventListener("transitionend", removeTransition);
    }
  };

  var onClick = function onClick(e) {
    // console.log(e.currentTarget.getAttribute("datakey"));
    setCode({ code: e.currentTarget.getAttribute("datakey") });
    showKey(e);
  };

  window.addEventListener("keydown", function (event) {
    var keycode = event.keyCode;
    if (keyCodeList.includes(keycode)) {
      playAudio(keycode);
      showKey2(keycode);
    }
  });

  return React.createElement(
    Fragment,
    null,
    React.createElement(
      "div",
      { className: "keys" },
      keys.map(function (item) {
        return React.createElement(KeyItem, {
          key: item.sound_name,
          datakey: item.key_code,
          onClick: onClick,
          keyTitle: item.sound_name,
          keyLetter: item.letter,
          sound_link: item.sound_link
        });
      })
    )
  );
};

ReactDOM.render(React.createElement(KeysGroup, null), document.getElementById("drum"));