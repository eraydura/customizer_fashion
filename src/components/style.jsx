import {isMobile} from 'react-device-detect';


  
  export const saveButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 360,
    width: !isMobile ? '100px' : '60px', 
    height: !isMobile ? '100px' : '60px'
  };
  
  export const galleryButtonStyle = {
    backgroundColor: "white",
    borderRadius: 360,
    width: !isMobile ? '100px' : '60px', 
    height: !isMobile ? '100px' : '60px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };
  
  export const colorPickerStyle = {
    position: 'absolute',
    top: '10%',
    left: '20px', 
    width: '50px', 
    height: '50px'
  };
  
  export const addTextButtonStyle = {
    backgroundColor:"white", 
    borderRadius:360,
    position: 'absolute',
    top: '25%',
    right: '5%' ,    
    width: !isMobile ? '100px' : '60px', 
    height: !isMobile ? '100px' : '60px'
  };


  export const save = {
    backgroundColor:"white",
    borderRadius:360,
    position: 'absolute', 
    bottom: '20%', 
    right: '5%' 
  };

  export const saveButtonImages={ 
    width: !isMobile ? '50px' : '35px', 
    height: !isMobile ? '50px' : '35px'
  }

  export const gallery={
    position: 'absolute',
    top: '10%',
    right: '5%',
  }

  export const galleryButtonImageStyle={ 
    width: !isMobile ? '50px' : '35px', 
    height: !isMobile ? '50px' : '35px'
  }


export const loading = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  textAlign:'center',
  transform: 'translate(-50%, -50%)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
};

export const dropdownStyle = {
  position: 'absolute',
  top: '10%',
  left: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

export const body={ 
  overflow: "hidden", 
  width: '100vw', 
  height: '100vh', 
  position: 'relative', 
  backgroundColor: 'black' 
}

  




