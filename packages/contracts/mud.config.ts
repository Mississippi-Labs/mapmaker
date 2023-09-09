import { mudConfig } from "@latticexyz/world/register";
 
export default mudConfig({
  tables: {
    Movable: "bool",
    Player: "bool",
    Position: {
      dataStruct: false,
      schema: {
        x: "uint32",
        y: "uint32",
        width: "uint32",
        mapdata: "bytes",
      },
    },
  },
});