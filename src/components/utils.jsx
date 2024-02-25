

export const handleAddTexture = (setIsModalOpen) => {
    setIsModalOpen(true);
  };

export const handleModalClose = (setIsModalOpen) => {
    setIsModalOpen(false);
  };


  
export const getBackgroundSize = (value, min, max) => {
    return { backgroundSize: `${((value - min) * 100) / (max - min)}% 100%` };
  };

export const handleModelLoad = (setModelLoaded) => {
    setModelLoaded(true);
};

export const handleClose = (close,setClose,setDisplay) => {
    if(close==true){
      setDisplay("none");
      setClose(false);
    }else{
      setDisplay("flex");
      setClose(true);
    }
  };

export const handlePartChange = (index,setDisplay,setClose,uptexture,setDisplay2,downtexture,setSelectedIndex) => {
    if(index==0 && uptexture=="./textures/wawa.png"){
      setDisplay("none");
      setClose(false);
      setDisplay2("none");
    }else if(index==1 && downtexture=="./textures/wawa.png"){
      setDisplay("none");
      setClose(false);
      setDisplay2("none");
    }
    setSelectedIndex(index);
  };

  export const handleColorChange = (color, setColor1, selectedIndex, partSelected, setColor2,setColor3) => {
    if (selectedIndex !== undefined && setColor2 !== undefined &&  setColor3 === undefined) {
      switch (partSelected[selectedIndex]) {
        case 'up':
          setColor1(color);
          break;
        case 'down':
          setColor2(color);
          break;
        default:
          break;
      }
    }else if(selectedIndex !== undefined &&  setColor3 !== undefined ){
      switch (partSelected[selectedIndex]) {
        case 'mesh':
          setColor1(color);
          break;
        case 'stripes' || 'neck':
          setColor2(color);
          break;
        case 'soul' || 'arm':
          setColor3(color);
          break;
        default:
          break;
      }
    } else {
      setMeshColor(color);
    }
  };

export const galleryOpen = (setDisplay,setClose,setDisplay2,setUpTexture,setDownTexture,downtexture,uptexture,selectedIndex) => {

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if(uptexture!=undefined){
            if(uptexture!==reader.result&&selectedIndex==0){
                setDisplay("flex");
                setClose(true);
                setDisplay2("block");
                setUpTexture(reader.result);
            }else if(downtexture!==reader.result&&selectedIndex==1){
                setDisplay("flex");
                setClose(true);
                setDisplay2("block");
                setDownTexture(reader.result);
            }
        }else{
            setDisplay("flex");
            setClose(true);
            setDisplay2("block");
            setUpTexture(reader.result);
        }

      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

export const handleSliderChange = (setter) => (event) => {
    setter(parseFloat(event.target.value));
  };



export const saveCanvasAsImage = (canvasRef) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataURL = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas_image.png';
      link.click();
    }
  };

  const BUTTON_HEIGHT = 20;

  // Calculate the gap dynamically based on the number of children elements
  export const calculateDynamicGap = (containerHeight, numChildren) => {
    const totalGap = containerHeight - (numChildren * BUTTON_HEIGHT); // Assuming BUTTON_HEIGHT is constant
    return totalGap / (numChildren - 1);
  };


  
 
  
