

function updateComponentStyle(argument:string){
    //custom check lable position
    let lables = document.getElementsByClassName(`mantine-${argument}-label`) as HTMLCollectionOf<HTMLElement>;
    Array.prototype.forEach.call(lables, function(el) {
      el.style.paddingLeft=0;
    });

    //custom input box size
    let inputBox = document.getElementsByClassName(`mantine-${argument}-inner`) as HTMLCollectionOf<HTMLElement>;
    Array.prototype.forEach.call(inputBox, function(el) {
      el.style.transform=`scale(0.7)`;
      el.style.transformOrigin='left';
    });
    //
}

export default updateComponentStyle;