const figures =['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];


const seperations = async (array) =>{
      let infoArray=[];
      let info;
      for( let char of array){
            let anime = await fetch(`https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=~${char}`);
            let response = await anime.text();
          let parser= new DOMParser();
          let data=parser.parseFromString(response,'text/xml');
          
          for (const iterator of data.getElementsByTagName('anime')) {
            info ={
                  name: iterator.getAttribute('name'),
                  type: iterator.getAttribute('type'),
                  pic:  iterator.getElementsByTagName('info')[0].getAttribute('src')
            }
        infoArray.push(info);
          
          }
      }
      infoArray.sort((a, b) => a.name.localeCompare(b.name));
      console.log(infoArray);
}
seperations(figures)


// const test = (promiseData)=>{
//       let sortedData= promiseData.sort((a,b)=> a-b);
// for(let index in sortedData){
//    )
// }
// }



// const anime = fetch('https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=~0');
// let tagName;
// let newArray=[];
// anime.then((response)=> response.text())
// .then((data)=> console.log(data));






