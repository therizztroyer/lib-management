import React,{useState} from "react";
import { Modal, Box, Typography, TextField, Button, Grid} from "@mui/material";

function EditModal(props) {
  let {
    title,
    currentValue,
    textFieldPlaceholder,
    onSubmit,
    open,
    handleCancel,
    field
  } = props;
  let [newVal,setNewVal] = useState("");

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="centered" sx={{backgroundColor: "white", padding:"20px", border:"2px solid black", borderRadius:"10px"}}>
        <Typography id="modal-modal-title" variant="h2" component="h2" mb={3}>
          {title}
        </Typography>
        <Typography variant="h5" mb={2}>
            Current Value - {currentValue}
        </Typography>
        <TextField
          className="textfield"
          id=""
          label={textFieldPlaceholder}
          variant="filled"
          sx={{ label: { color: "black" } }}
          onChange={(e) => setNewVal(e.target.value)}
          value={newVal}
        />
        <Grid sx={{marginTop:"10px"}}>
        <Button variant="filled" sx={{backgroundColor:"green", color:"white", marginRight: "10px" }} disabled={newVal.length === 0} onClick={() => onSubmit(field,newVal)}>
            SAVE
        </Button>
        <Button variant="filled" sx={{backgroundColor: "gray"}}  onClick={handleCancel}>
            CANCEL
        </Button>
        </Grid>
      </Box>
    </Modal>
  );
}

export default EditModal;
