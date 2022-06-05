// Variable vide
let elementActif;

// Changement de couleurs lors du clique sur un élément :
var colors = [
  "red",
  "blue",
  "yellow",
  "green",
  "orange",
  "black",
  "cyan",
  "magenta",
];
var pan = document.getElementById("pan");
function changeColor() {
  if (elementActif.id == "triangle") {
    elementActif.style.borderBottomColor = colors[Math.floor(Math.random() * 8 + 1)];
    return;
  } else
    elementActif.style.backgroundColor = colors[Math.floor(Math.random() * 8 + 1)];
}

// CARRÉ

function drawSquare() {
  // Creer carré :
  var square = document.createElement("div");
  square.setAttribute("id", "square");
  square.className = "squared";
  elementActif = square;

  // // Éléments actif du carré :
  square.addEventListener("click", selectionner);
  function selectionner() {
    elementActif = square;
  }

  // Creer les 4 divs pour les coins :
  var resizerne = document.createElement("div");
  resizerne.classList.add("resizer", "ne");
  square.appendChild(resizerne);

  var resizernw = document.createElement("div");
  resizernw.classList.add("resizer", "nw");
  square.appendChild(resizernw);

  var resizerse = document.createElement("div");
  resizerse.classList.add("resizer", "se");
  square.appendChild(resizerse);

  var resizersw = document.createElement("div");
  resizersw.classList.add("resizer", "sw");
  square.appendChild(resizersw);

  pan.appendChild(square);

  // Déplacement carré :
  square.addEventListener("mousedown", mousedown);

  let isResizing = false;

  function mousedown(e) {
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
      if (!isResizing) {
        const rect = square.getBoundingClientRect();
        
        // Permet que l'élément ne sors pas du plan de travail : 
        const delimitation = document.querySelector(".zonedetravail").getBoundingClientRect()
        console.log(delimitation)
        
        if (rect.top < delimitation.top) {
          elementActif.style.display = "none";
        }
        else if (rect.bottom > delimitation.bottom) {
          elementActif.style.display = "none";
        }
        else if (rect.left < delimitation.left) {
          elementActif.style.display = "none";
        }
        else if (rect.right > delimitation.right) {
          elementActif.style.display = "none";
        }

        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        square.style.left = rect.left - newX + "px";
        square.style.top = rect.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }

  // Redimensionner carré :
  const resizers = square.querySelectorAll(".resizer");
  let currentResizer;

  for (let resizer of resizers) {
    resizer.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      currentResizer = e.target;
      isResizing = true;

      let prevX = e.clientX;
      let prevY = e.clientY;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        const rect = square.getBoundingClientRect();

        if (currentResizer.classList.contains("se")) {
          square.style.width = rect.width - (prevX - e.clientX) + "px";
          square.style.height = rect.height - (prevY - e.clientY) + "px";
        } else if (currentResizer.classList.contains("sw")) {
          square.style.width = rect.width + (prevX - e.clientX) + "px";
          square.style.height = rect.height - (prevY - e.clientY) + "px";
          square.style.left = rect.left - (prevX - e.clientX) + "px";
        } else if (currentResizer.classList.contains("ne")) {
          square.style.width = rect.width - (prevX - e.clientX) + "px";
          square.style.height = rect.height + (prevY - e.clientY) + "px";
          square.style.top = rect.top - (prevY - e.clientY) + "px";
        } else {
          square.style.width = rect.width + (prevX - e.clientX) + "px";
          square.style.height = rect.height + (prevY - e.clientY) + "px";
          square.style.top = rect.top - (prevY - e.clientY) + "px";
          square.style.left = rect.left - (prevX - e.clientX) + "px";
        }

        prevX = e.clientX;
        prevY = e.clientY;
      }

      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        isResizing = false;
      }
    }
  }
}

// CERCLE

function drawCircle() {
  // Creer cercle :
  var circle = document.createElement("div");
  circle.setAttribute("id", "cercle");
  circle.className = "circled";
  
  elementActif = circle;

  // Éléments actif du cercle :
  circle.addEventListener("click", selectionner);

  function selectionner() {
    elementActif = circle;
  }

  // Creer les 4 divs pour les coins :
  var resizerne = document.createElement("div");
  resizerne.classList.add("resizer", "ne");
  circle.appendChild(resizerne);

  var resizernw = document.createElement("div");
  resizernw.classList.add("resizer", "nw");
  circle.appendChild(resizernw);

  var resizerse = document.createElement("div");
  resizerse.classList.add("resizer", "se");
  circle.appendChild(resizerse);

  var resizersw = document.createElement("div");
  resizersw.classList.add("resizer", "sw");
  circle.appendChild(resizersw);

  pan.appendChild(circle);

  // Déplacement cercle :
  circle.addEventListener("mousedown", mousedown);

  let isResizing = false;

  function mousedown(e) {
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
      if (!isResizing) {

        const rect = circle.getBoundingClientRect();

        const delimitation = document.querySelector(".zonedetravail").getBoundingClientRect()
        console.log(delimitation)
        
        if (rect.top < delimitation.top) {
          elementActif.style.display = "none";
        }
        else if (rect.bottom > delimitation.bottom) {
          elementActif.style.display = "none";
        }
        else if (rect.left < delimitation.left) {
          elementActif.style.display = "none";
        }
        else if (rect.right > delimitation.right) {
          elementActif.style.display = "none";
        }

        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        circle.style.left = rect.left - newX + "px";
        circle.style.top = rect.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }

  // Redimensionner cercle :
  const resizers = circle.querySelectorAll(".resizer");
  let currentResizer;

  for (let resizer of resizers) {
    resizer.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      currentResizer = e.target;
      isResizing = true;

      let prevX = e.clientX;
      let prevY = e.clientY;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        const rect = circle.getBoundingClientRect();

        if (currentResizer.classList.contains("se")) {
          circle.style.width = rect.width - (prevX - e.clientX) + "px";
          circle.style.height = rect.height - (prevY - e.clientY) + "px";
        } else if (currentResizer.classList.contains("sw")) {
          circle.style.width = rect.width + (prevX - e.clientX) + "px";
          circle.style.height = rect.height - (prevY - e.clientY) + "px";
          circle.style.left = rect.left - (prevX - e.clientX) + "px";
        } else if (currentResizer.classList.contains("ne")) {
          circle.style.width = rect.width - (prevX - e.clientX) + "px";
          circle.style.height = rect.height + (prevY - e.clientY) + "px";
          circle.style.top = rect.top - (prevY - e.clientY) + "px";
        } else {
          circle.style.width = rect.width + (prevX - e.clientX) + "px";
          circle.style.height = rect.height + (prevY - e.clientY) + "px";
          circle.style.top = rect.top - (prevY - e.clientY) + "px";
          circle.style.left = rect.left - (prevX - e.clientX) + "px";
        }

        prevX = e.clientX;
        prevY = e.clientY;
      }

      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        isResizing = false;
      }
    }
  }
}

// TRIANGLE

function drawTriangle() {
  // Creer triangle :
  var triangle = document.createElement("div");
  triangle.setAttribute("id", "triangle");
  triangle.className = "triangle";
  elementActif = triangle;

  // Éléments actif du cercle :
  triangle.addEventListener("click", selectionner);

  function selectionner() {
    elementActif = triangle;
  }

  // Creer les 3 divs pour les coins :
  var resizersn = document.createElement("div");
  resizersn.classList.add("resizers", "n");
  triangle.appendChild(resizersn);

  var resizersse = document.createElement("div");
  resizersse.classList.add("resizers", "se");
  triangle.appendChild(resizersse);

  var resizerssw = document.createElement("div");
  resizerssw.classList.add("resizers", "sw");
  triangle.appendChild(resizerssw);

  pan.appendChild(triangle);

  // Déplacement triangle :
  triangle.addEventListener("mousedown", mousedown);

  let isResizing = false;

  function mousedown(e) {
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
      if (!isResizing) {
        const rect = triangle.getBoundingClientRect();

        const delimitation = document.querySelector(".zonedetravail").getBoundingClientRect()
        console.log(delimitation)
        
        if (rect.top < delimitation.top) {
          elementActif.style.display = "none";
        }
        else if (rect.bottom > delimitation.bottom) {
          elementActif.style.display = "none";
        }
        else if (rect.left < delimitation.left) {
          elementActif.style.display = "none";
        }
        else if (rect.right > delimitation.right) {
          elementActif.style.display = "none";
        }

        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        triangle.style.left = rect.left - newX + "px";
        triangle.style.top = rect.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseup() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
    }
  }

  // Redimensionner triangle :
  const resizerss = triangle.querySelectorAll(".resizers");
  let currentResizer;

  for (let resizers of resizerss) {
    resizers.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      currentResizer = e.target;
      isResizing = true;

      let prevX = e.clientX;
      let prevY = e.clientY;

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        const rect = triangle.getBoundingClientRect();

        triangle.style.borderRightWidth =
          (rect.height - (prevY - e.clientY)) / 2 + "px";
        triangle.style.borderLeftWidth =
          (rect.height - (prevY - e.clientY)) / 2 + "px";
        triangle.style.borderBottomWidth =
          rect.height - (prevY - e.clientY) + "px";
        triangle.style.left = rect.left + (prevY - e.clientY) / 2 + "px";
        triangle.getElementsByClassName("se")[0].style.right =
          -(rect.height - (prevY - e.clientY)) / 2 - 5 + "px";
        triangle.getElementsByClassName("se")[0].style.bottom =
          -(rect.height - (prevY - e.clientY)) - 5 + "px";
        triangle.getElementsByClassName("sw")[0].style.left =
          -(rect.height - (prevY - e.clientY)) / 2 - 5 + "px";
        triangle.getElementsByClassName("sw")[0].style.bottom =
          -(rect.height - (prevY - e.clientY)) - 5 + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }

      function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        isResizing = false;
      }
    }
  }
}

// ZONE DE TEXTE
function textArea() {
  var zdt = document.createElement("div");
  zdt.appendChild(document.createElement("textarea"))
  zdt.className ='zone';
    
  // Déplacement zone de texte:
  zdt.addEventListener("mousedown", mousedown);
  zdt.addEventListener("click", selectionner)
  elementActif = zdt;
  function selectionner () {
    elementActif = zdt;
  }
  document.body.appendChild(zdt);

  let isResizing = false;

  function mousedown(e) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

      function mousemove(e) {
          if (!isResizing) {
            const rect = zdt.getBoundingClientRect();

            const delimitation = document.querySelector(".zonedetravail").getBoundingClientRect()
            console.log(delimitation)
            
            if (rect.top < delimitation.top) {
              elementActif.style.display = "none";
            }
            else if (rect.bottom > delimitation.bottom) {
              elementActif.style.display = "none";
            }
            else if (rect.left < delimitation.left) {
              elementActif.style.display = "none";
            }
            else if (rect.right > delimitation.right) {
              elementActif.style.display = "none";
            }
    
          let newX = prevX - e.clientX;
          let newY = prevY - e.clientY;

          zdt.style.left = rect.left - newX + "px";
          zdt.style.top = rect.top - newY + "px";

          prevX = e.clientX;
          prevY = e.clientY;
          }
        }

      function mouseup() {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
      }
    }
  }


function save() {
  var panData = pan.innerHTML;
  console.log("panData", panData);
  if(panData=="") {
    alert("Nothing to save");
    return;
  }

  jQuery.ajax({
    type: "POST",
    url: 'action.php',
    dataType: 'json',
    data: {functionname: 'saveShapes', arguments: panData},

    success: function (obj, textstatus) {
                  if( !('error' in obj) ) {
                    alert("Paint saved successfully.");
                    console.log(obj);
                  }
                  else {
                      console.log(obj.error);
                  }
            }
});
  // localStorage.setItem("panData", panData);
  // alert("Paint saved successfully.");
}

window.onload = async function () {
  await jQuery.ajax({
    type: "POST",
    url: 'action.php',
    dataType: 'json',
    data: {functionname: 'getShapes', arguments: ['']},

    success: function (obj, textstatus) {
                  if( !('error' in obj) ) {
                    alert("Paint loaded successfully.");
                    savedData = obj.data;
                    pan.innerHTML = savedData;
                    console.log(savedData);
                  }
                  else {
                      console.log(obj.error);
                  }
            }
          });
  //square
  let squareList = document.getElementsByClassName("squared");
  if (squareList.length) {
    for (let i = 0; i < squareList.length; i++) {
      square = squareList[i];
      elementActif = square;
      square.addEventListener("click", selectionner);
      function selectionner() {
        elementActif = square;
      }
      // Déplacement carré :
      square.addEventListener("mousedown", mousedown);

      let isResizing = false;

      function mousedown(e) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        let prevX = e.clientX;
        let prevY = e.clientY;

        function mousemove(e) {
          if (!isResizing) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = e.target.getBoundingClientRect();

            e.target.style.left = rect.left - newX + "px";
            e.target.style.top = rect.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
          }
        }

        function mouseup() {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }

      // Redimensionner carré :
      const resizers = square.querySelectorAll(".resizer");
      let currentResizer;

      for (let resizer of resizers) {
        resizer.addEventListener("mousedown", mousedown);

        function mousedown(e) {
          currentResizer = e.target;
          square = e.target.parentElement;
          console.log("currentResizer", currentResizer);
          console.log("square", square);
          isResizing = true;

          let prevX = e.clientX;
          let prevY = e.clientY;

          window.addEventListener("mousemove", mousemove);
          window.addEventListener("mouseup", mouseup);

          function mousemove(e) {
            const rect = square.getBoundingClientRect();

            if (currentResizer.classList.contains("se")) {
              square.style.width = rect.width - (prevX - e.clientX) + "px";
              square.style.height = rect.height - (prevY - e.clientY) + "px";
            } else if (currentResizer.classList.contains("sw")) {
              square.style.width = rect.width + (prevX - e.clientX) + "px";
              square.style.height = rect.height - (prevY - e.clientY) + "px";
              square.style.left = rect.left - (prevX - e.clientX) + "px";
            } else if (currentResizer.classList.contains("ne")) {
              square.style.width = rect.width - (prevX - e.clientX) + "px";
              square.style.height = rect.height + (prevY - e.clientY) + "px";
              square.style.top = rect.top - (prevY - e.clientY) + "px";
            } else {
              square.style.width = rect.width + (prevX - e.clientX) + "px";
              square.style.height = rect.height + (prevY - e.clientY) + "px";
              square.style.top = rect.top - (prevY - e.clientY) + "px";
              square.style.left = rect.left - (prevX - e.clientX) + "px";
            }

            prevX = e.clientX;
            prevY = e.clientY;
          }

          function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
          }
        }
      }
    }
  }
  //circle
  let circleList = document.getElementsByClassName("circled");
  console.log("squareList", squareList);
  
  if (circleList.length) {
    for (let i = 0; i < circleList.length; i++) {
      circle = circleList[i];
      elementActif = circle;

      // Éléments actif du cercle :
      circle.addEventListener("click", selectionner);

      function selectionner() {
        elementActif = circle;
      }

      // Déplacement cercle :
      circle.addEventListener("mousedown", mousedown);

      let isResizing = false;

      function mousedown(e) {
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        let prevX = e.clientX;
        let prevY = e.clientY;

        function mousemove(e) {
          if (!isResizing) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;
            let circle = e.target;
            const rect = circle.getBoundingClientRect();

            circle.style.left = rect.left - newX + "px";
            circle.style.top = rect.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
          }
        }

        function mouseup() {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }

      // Redimensionner cercle :
      const resizers = circle.querySelectorAll(".resizer");
      let currentResizer;

      for (let resizer of resizers) {
        resizer.addEventListener("mousedown", mousedown);

        function mousedown(e) {
          currentResizer = e.target;
          isResizing = true;
          circle = e.target.parentElement;
          let prevX = e.clientX;
          let prevY = e.clientY;

          window.addEventListener("mousemove", mousemove);
          window.addEventListener("mouseup", mouseup);

          function mousemove(e) {
            const rect = circle.getBoundingClientRect();

            if (currentResizer.classList.contains("se")) {
              circle.style.width = rect.width - (prevX - e.clientX) + "px";
              circle.style.height = rect.height - (prevY - e.clientY) + "px";
            } else if (currentResizer.classList.contains("sw")) {
              circle.style.width = rect.width + (prevX - e.clientX) + "px";
              circle.style.height = rect.height - (prevY - e.clientY) + "px";
              circle.style.left = rect.left - (prevX - e.clientX) + "px";
            } else if (currentResizer.classList.contains("ne")) {
              circle.style.width = rect.width - (prevX - e.clientX) + "px";
              circle.style.height = rect.height + (prevY - e.clientY) + "px";
              circle.style.top = rect.top - (prevY - e.clientY) + "px";
            } else {
              circle.style.width = rect.width + (prevX - e.clientX) + "px";
              circle.style.height = rect.height + (prevY - e.clientY) + "px";
              circle.style.top = rect.top - (prevY - e.clientY) + "px";
              circle.style.left = rect.left - (prevX - e.clientX) + "px";
            }

            prevX = e.clientX;
            prevY = e.clientY;
          }

          function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
          }
        }
      }
    }
  }
  //triangle
  let triangleList = document.getElementsByClassName("triangle");
  console.log(triangleList);
  
  if (triangleList.length) {
    for (let i = 0; i < triangleList.length; i++) {
      triangle = triangleList[i];
      elementActif = triangle;
      // Éléments actif du cercle :
      triangle.addEventListener("click", selectionner);

      function selectionner() {
        elementActif = triangle;
      }

      // Déplacement triangle :
      triangle.addEventListener("mousedown", mousedown);

      let isResizing = false;

      function mousedown(e) {
        let triangle = e.target;
        window.addEventListener("mousemove", mousemove);
        window.addEventListener("mouseup", mouseup);

        let prevX = e.clientX;
        let prevY = e.clientY;

        function mousemove(e) {
          if (!isResizing) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = triangle.getBoundingClientRect();

            triangle.style.left = rect.left - newX + "px";
            triangle.style.top = rect.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
          }
        }

        function mouseup() {
          window.removeEventListener("mousemove", mousemove);
          window.removeEventListener("mouseup", mouseup);
        }
      }

      // Redimensionner triangle :
      const resizerss = triangle.querySelectorAll(".resizers");
      let currentResizer;

      for (let resizers of resizerss) {
        resizers.addEventListener("mousedown", mousedown);

        function mousedown(e) {
          currentResizer = e.target;
          // triangle = e.target.parentElement;
          triangle = e.target.parentElement;
          console.log(triangle);
          isResizing = true;

          let prevX = e.clientX;
          let prevY = e.clientY;

          window.addEventListener("mousemove", mousemove);
          window.addEventListener("mouseup", mouseup);

          function mousemove(e) {
            const rect = triangle.getBoundingClientRect();
            console.log(triangle);

            triangle.style.borderRightWidth =
              (rect.height - (prevY - e.clientY)) / 2 + "px";
            triangle.style.borderLeftWidth =
              (rect.height - (prevY - e.clientY)) / 2 + "px";
            triangle.style.borderBottomWidth =
              rect.height - (prevY - e.clientY) + "px";
            triangle.style.left = rect.left + (prevY - e.clientY) / 2 + "px";
            triangle.getElementsByClassName("se")[0].style.right =
              -(rect.height - (prevY - e.clientY)) / 2 - 5 + "px";
            triangle.getElementsByClassName("se")[0].style.bottom =
              -(rect.height - (prevY - e.clientY)) - 5 + "px";
            triangle.getElementsByClassName("sw")[0].style.left =
              -(rect.height - (prevY - e.clientY)) / 2 - 5 + "px";
            triangle.getElementsByClassName("sw")[0].style.bottom =
              -(rect.height - (prevY - e.clientY)) - 5 + "px";

            prevX = e.clientX;
            prevY = e.clientY;
          }

          function mouseup() {
            window.removeEventListener("mousemove", mousemove);
            window.removeEventListener("mouseup", mouseup);
            isResizing = false;
          }
        }
      }
    }
  }
};

function exportToPNG() {
  html2canvas(pan).then(function (canvas) {    
    console.log('call back');
    var anchorTag = document.createElement("a");
     document.body.appendChild(anchorTag);
    //  document.getElementById("previewImg").appendChild(canvas);
     anchorTag.download = "filename.jpg";
     anchorTag.href = canvas.toDataURL();
     anchorTag.target = '_blank';
     anchorTag.click();
 });
}
function exportToPDF() {
  html2canvas(pan).then(function (canvas) {    
    var img=canvas.toDataURL("image/png");
    var doc = new jsPDF();
    doc.addImage(img,'JPEG',pan.style.height,pan.style.width);
    doc.save('filename.pdf');
 });
}f
