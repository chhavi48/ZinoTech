import {
  Center,
  Flex,
  Box,
  Heading,
  Button,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import { DeleteIcon } from "@chakra-ui/icons";
const Main = () => {

  const [red, setred] = useState([]);
  const [yellow, setyellow] = useState([]);
  const [green, setgreen] = useState([]);
  const [gray, setgray] = useState([]);
  const [addname, setaddname] = useState("");
  const [addcolor, setaddcolor] = useState("");

  useEffect(() => {
  getData()
  }, []);

  const getData=()=>{

    axios.get("https://json-server-bc3l.onrender.com/red").then((r) => {
      console.log("red", r.data);
      setred(r.data);
    });
    axios.get("https://json-server-bc3l.onrender.com/yellow").then((r) => {
      console.log("uelow", r.data);
      setyellow(r.data);
    });
    axios.get("https://json-server-bc3l.onrender.com/green").then((r) => {
      console.log("greeen", r.data);
      setgreen(r.data);
    });
    axios.get("https://json-server-bc3l.onrender.com/gray").then((r) => {
      console.log("gray", r.data);
      setgray(r.data);
    });
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(addname, addcolor);
    const formdata = { name: addname, color: addcolor };

    console.log(formdata);
    let data= await  axios.get(`https://json-server-bc3l.onrender.com/${addcolor}`).then((r) => {
      console.log("65", r.data.length);
      if(r.data.length<8){
        callAddData(addcolor,formdata)
      }
    else{
      alert("you canot add the data ,stack is full")
    }

    });

  };
   async function callAddData(addcolor,payload){
    await axios.post(`https://json-server-bc3l.onrender.com/${addcolor}`,payload).then(
      ()=>{
        getData()
      }
    )
        
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const onDragEnd = (result) => {
    // console.log(result);
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add,
      reds = red,
      yellows = yellow,
      greens = green,
      grays = gray;

    if (source.droppableId === "reddata") {
      add = reds[source.index];
      reds.splice(source.index, 1);
    } else if (source.droppableId === "yellowdata") {
      add = yellows[source.index];
      yellows.splice(source.index, 1);
    } else if (source.droppableId === "greendata") {
      add = greens[source.index];
      greens.splice(source.index, 1);
    } else if (source.droppableId === "graydata") {
      add = grays[source.index];
      grays.splice(source.index, 1);
    }
    if (destination.droppableId === "reddata") {
      reds.splice(destination.index, 0, add);
    } else if (destination.droppableId === "yellowdata") {
      yellows.splice(destination.index, 0, add);
    } else if (destination.droppableId === "greendata") {
      greens.splice(destination.index, 0, add);
    } else if (destination.droppableId === "graydata") {
      grays.splice(destination.index, 0, add);
    }
    setred(reds);
    setgreen(greens);
    setyellow(yellows);
    setgray(grays);
  };
const handleDelete=async(id,color)=>{
  console.log(id,color);
   await axios.delete(`https://json-server-bc3l.onrender.com/${color}/${id}`)
  .then(res => { 
  getData()
})

}
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Center  className="center">
          <Flex gap="6" my="10" className="maindiv">
            <Droppable droppableId="reddata">
              {(provided) => (
                <Box border={"4px solid black"}
                borderRadius='20px'
                className="red"
                  w="16em"
                  h="95vh"
              
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Flex mx="4" gap="20" my="5">
                    <Heading fontWeight="hairline" fontSize="3xl">
                      Red
                    </Heading>
                    <Button
                      variant="outline"
                      colorScheme="green"
                      size="md"
                      onClick={onOpen}
                    >
                      Add
                    </Button>
                  </Flex>

                  <Stack my={2} gap={2} >
                    {red.map((i, index) => {
                      return (
                        <Draggable draggableId={i.id.toString()} index={index}>
                          {(provided) => (
                            <Text
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              bg={'none'}
                              rounded
                              borderRadius="10px"
                              border ={"3px solid gray"}
                              mx="8"
                              index={index}
                            >
                            <Flex justifyContent={'space-around'} >
                              {i.name}
                            <Button bg='none' p='0' _hover={'none'} 
                             onClick={()=>handleDelete(i.id,i.color)}><DeleteIcon/></Button>
                              </Flex>
                            </Text>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Stack>
                </Box>
              )}
            </Droppable>

            <Droppable droppableId="greendata">
              {(provided) => (
                <Box
                border={"4px solid black"}
                borderRadius='20px'
                className="green"
                  w="16em"
                  h="95vh"
              
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  
                >
                  <Flex mx="4" gap="20" my="6">
                    <Heading fontWeight="hairline" fontSize="3xl">
                      Green
                    </Heading>
                    <Button
                      variant="outline"
                      colorScheme="green"
                      size="md"
                      onClick={onOpen}
                    >
                      Add
                    </Button>
                  </Flex>
                  <Stack my={2} gap={2}>
                    {green.map((i, index) => {
                      return (
                        <Draggable draggableId={i.id.toString()} index={index}>
                          {(provided) => (
                            <Text
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                                bg={'none'}
                              rounded
                              mx="8"
                              index={index}
                              borderRadius="10px"
                              border ={"3px solid gray"}>
                          <Flex justifyContent={'space-around'}>
                              {i.name}
                            <Button bg='none' p='0' _hover={'none'}  onClick={()=>handleDelete(i.id,i.color)}><DeleteIcon/></Button>
                              </Flex>
                            </Text>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Stack>
                </Box>
              )}
            </Droppable>

            <Droppable droppableId="yellowdata">
              {(provided) => (
            
                <Box
                border={"4px solid black"}
                borderRadius='20px'
                className="yellow"
                  w="16em"
                  h="95vh"
              
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Flex mx="4" gap="20" my="6">
                    <Heading fontWeight="hairline" fontSize="3xl">
                      Yellow
                    </Heading>
                    <Button
                      variant="outline"
                      colorScheme="green"
                      size="md"
                      onClick={onOpen}
                    >
                      Add
                    </Button>
                  </Flex>
                  <Stack my={2} gap={2}>
                    {yellow.map((i, index) => {
                      return (
                        <Draggable draggableId={i.id.toString()} index={index}>
                          {(provided) => (
                            <Text
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              bg={'none'}
                              rounded
                              borderRadius="10px"
                              border ={"3px solid gray"}
                              mx="8"
                              index={index}
                            
                            >
                              <Flex justifyContent={'space-around'}>
                              {i.name}
                            <Button bg='none' p='0' _hover={'none'}  onClick={()=>handleDelete(i.id,i.color)}><DeleteIcon/></Button>
                              </Flex>
                          
                            </Text>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Stack>
                </Box>
              )}
            </Droppable>

            <Droppable droppableId="graydata">
              {(provided) => (
              <Box
                border={"4px solid black"}
                borderRadius='20px'
                className="gray"
                  w="16em"
                  h="95vh"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Flex mx="4" gap="20" my="6">
                    <Heading fontWeight="hairline" fontSize="3xl">
                      gray
                    </Heading>
                    <Button
                      variant="outline"
                      colorScheme="green"
                      size="md"
                      onClick={onOpen}
                    >
                      Add
                    </Button>
                  </Flex>
                  <Stack my={2} gap={2}>
                    {gray.map((i, index) => {
                      return (
                        <Draggable draggableId={i.id.toString()} index={index}>
                          {(provided) => (
                            <Text
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            bg={'none'}
                              rounded
                              
                              mx="8"
                              index={index}
                              borderRadius="10px"
                              border ={"3px solid gray"}
                            >
                            <Flex justifyContent={'space-around'}>
                              {i.name}
                            <Button bg='none' p='0' _hover={'none'}  onClick={()=>handleDelete(i.id,i.color)}><DeleteIcon/></Button>
                              </Flex>
                            </Text>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </Stack>
                </Box>
              )}
            </Droppable>
          </Flex>

          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Data</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleAdd} method="POST">
                  <label>Name</label>
                  <Input
                    value={addname}
                    onChange={(e) => setaddname(e.target.value)}
                  ></Input>
                  <label>Color</label>
                  <Select onChange={(e) => setaddcolor(e.target.value)}>
                    <option value={""}>Choose color</option>
                    <option value={"red"}>RED ZONE</option>
                    <option value={"yellow"}>YELLOW ZONE</option>
                    <option value={"green"}>GREEN ZONE</option>
                    <option value={"gray"}>GRAY ZONE</option>
                  </Select>
                  <Button  colorScheme='blue'  mr={3}  mt='5' type="submit">
                    Add
                  </Button>
                </form>
              </ModalBody>

              <ModalFooter>
               <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
               </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Center>
      </DragDropContext>
    </>
  );
};

export default Main;
