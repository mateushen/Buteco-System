const colors = (color) => {
  switch (color) {
    case 'cinzaclaro':
      return '#e0e0e0';
    case 'cinzaescuro':
      return '#2D3839';
    case 'verde':
      return '#39ff14';
    case 'verdeclaro':
      return '#6E9987';
    case 'verdeescuro':
      return '#114D4D';
    case 'preto':
      return '#363636';
    case 'branco':
      return '#F5F5F5';
    case 'vermelho':
      return '#ff0000';
    case 'vermelhoescuro':
      return '#c52700';
    case 'pretosignin':
      return '#474a51';
    case 'amarelo':
      return '#ffcf00';
    default:
      return color;
  }
};

export default colors;