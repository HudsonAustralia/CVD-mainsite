const getRecalibrationFactor = (gender:string, age:number) => {
  let recalibrationFactor = null;
  switch (gender) {
    case "female":
      switch (age) {
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
          recalibrationFactor = 1.3;
          break;
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
          recalibrationFactor = 1.2;
          break;
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
          recalibrationFactor = 1.2;
          break;
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
          recalibrationFactor = 1.0;
          break;
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
          recalibrationFactor = 0.9;
          break;
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
          recalibrationFactor = 0.8;
          break;
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
          recalibrationFactor = 0.7;
          break;
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
          recalibrationFactor = 0.7;
          break;
        default:
          recalibrationFactor = null; // invalid age
      }
      break;
    case "male":
      switch (age) {
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
          recalibrationFactor = 1.1;
          break;
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
          recalibrationFactor = 1.1;
          break;
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
          recalibrationFactor = 1.1;
          break;
        case 55:
        case 56:
        case 57:
        case 58:
        case 59:
          recalibrationFactor = 1.0;
          break;
        case 60:
        case 61:
        case 62:
        case 63:
        case 64:
          recalibrationFactor = 0.9;
          break;
        case 65:
        case 66:
        case 67:
        case 68:
        case 69:
          recalibrationFactor = 0.8;
          break;
        case 70:
        case 71:
        case 72:
        case 73:
        case 74:
        case 75:
        case 76:
        case 77:
        case 78:
        case 79:
          recalibrationFactor = 0.8;
          break;
        default:
          recalibrationFactor = null; // invalid age
      }
      break;
  
  }
  return recalibrationFactor;
};

export default getRecalibrationFactor;