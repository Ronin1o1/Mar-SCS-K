let outerkeysobj = [];

const ObjectDestructure = {
  getConvertedJsonArrayAccount: (data, labelData, labelDataInfo) => {
    let result = [];
    data.map((objData) => {

      Object.keys(objData).forEach((key) => {
     
        if (key === labelData) {
          outerkeysobj = Object.values(objData[key])
          outerkeysobj.map((keyobjt) => {             
            Object.keys(keyobjt).forEach((key1)=>{
              if(key1==labelDataInfo)  
              {
                result.push(keyobjt[key1]);
              }       
           })
      });
    
    }})
    
  })
  return result;
},

  getConvertedJsonArray: (data) => {
    let result1 = [];
    data.map((objData) => {
      let jsonA = {};
      Object.keys(objData).map((keyObj) => {
        if (
          typeof objData[keyObj] == "string" ||
          typeof objData[keyObj] == "number"
        ) {
          jsonA[keyObj] = objData[keyObj];
        }
      });

      Object.keys(objData).map((keyObj) => {
        if (Array.isArray(objData[keyObj])) {
          const nestedDueDateArrayLength = objData[keyObj].reduce(
            (a, obj) => a + Object.keys(obj).length,
            0
          );
   
          if (nestedDueDateArrayLength > 0) {
            objData[keyObj].map((nestedObj) => {
              if (jsonA) {
                Object.keys(jsonA).map((k) => {
                  nestedObj[k] = jsonA[k];
                });
              }
              result1.push(nestedObj);
            });
          } else {
         
            result1.push(jsonA);
          }
        }
      });
    });
    return result1;
  },
};
export default ObjectDestructure;
