$(document).ready(function () {

    const Zero = 0;
    const MAX_COUNT = 23;

    var id = setInterval(DTime, 1000);

    var calc = document.getElementsByClassName("calc_body");

    var clock = document.getElementById("clock");

    var btns = document.getElementsByClassName("btn");

    var calcScreen = document.getElementById("screen");

    var errorsHandler = document.getElementById("errors");

    var digitCounter = document.getElementById("counter");

    var onoff = document.getElementById("onoff");

    var firstZero = calcScreen.innerHTML;

    var screenLen = calcScreen.innerHTML.length;

    digitCounter.innerHTML = screenLen;

    var sizeChanged = false;

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () {

            if (this.id === "backspace") {
                calcScreen.innerHTML = BackSpace(calcScreen.innerHTML);
                screenLen = calcScreen.innerHTML.length;
                return;
            }

            if (this.id === "onoff") {
                calc[0].className += " off";
                this.className = this.className.replace(" off", "");
                return;
            }

            if (this.id === "clearAll") {
                calcScreen.innerHTML = ClearAll(calcScreen.innerHTML);
                screenLen = calcScreen.innerHTML.length;
                return;
            }

            if (screenLen >= MAX_COUNT) {
                errorsHandler.innerHTML = "Maximum Digits.";
                return;
            }
            if (screenLen === 1) {
                if (Zero.toString() === firstZero) {
                    calcScreen.innerHTML = this.innerHTML;
                    firstZero = calcScreen.innerHTML;
                } else {
                    calcScreen.innerHTML += this.innerHTML;
                }
            }
            else
                calcScreen.innerHTML += this.innerHTML;

            if (screenLen > 13 && sizeChanged != true) {
                calcScreen.className += " smText";
                sizeChanged = true;
            }

            screenLen = calcScreen.innerHTML.length;

            digitCounter.innerHTML = screenLen;
        });
    }

    function BackSpace(string) {
        string = string.slice(0, -1);

        if (string.length < 13) {
            calcScreen.className = calcScreen.className.replace(" smText", "");
            sizeChanged = false;
        }

        if (string.length < MAX_COUNT) {
            if (errorsHandler.innerHTML != "")
                errorsHandler.innerHTML = "";
        }

        digitCounter.innerHTML = string.length;

        if (string.length === 0) {
            digitCounter.innerHTML = 1;
            screenLen = 1;
            firstZero = "0";
            return 0;
        }

        return string;
    }

    function ClearAll(string) {
        firstZero = string = "0";
        digitCounter.innerHTML = string.length;

        calcScreen.className = calcScreen.className.replace(" smText", "");
        sizeChanged = false;

        if (string.length < MAX_COUNT) {
            if (errorsHandler.innerHTML != "")
                errorsHandler.innerHTML = "";
        }

        return string;
    }

    function DTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        clock.innerHTML = h + ":" + m + ":" + s;
    }
    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }
});