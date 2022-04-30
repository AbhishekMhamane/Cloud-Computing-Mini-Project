import * as React from 'react';
import { useState, useEffect ,useRef } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grid from '@mui/material/Grid';
const Mainpage = () => {

    const [files, setFiles] = useState();
    const fileRef = useRef();

    const fetchFiles = async () => {
        const res = await axios.get('http://localhost:3000/files');
        console.log(res.data);
        setFiles(res.data);
    }

    useEffect(() => {
        fetchFiles();
        console.log(files);
    }, []);

    const handleDelete = (id) => {
        console.log(id);
        axios.delete(`http://localhost:3000/files/file/${id}`).then(() => {
            fetchFiles();
        });
    }

    
  const handleChange = (e) => {
    const files = e.target.files;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      let fdata = new FormData();

      fdata.append("files", files[i]);
      axios.post(`http://localhost:3000/files`, fdata)
        .then((response) => {
          console.log(response.data);
          fetchFiles();
        })
        .catch((err) => console.log(err));
    }



  };


    return (
        <div>
            <Grid container spacing={2}>
                <Grid container item xs={12}>
                <Grid item xs={7} align="left">
                <h1>Cloud File Storage</h1>
                </Grid>
                <Grid item xs={5}>
                    <input
                       style={{margin:'2rem'}}
                        id="hi"
                        ref={fileRef}
                        onChange={handleChange}
                        multiple={true}
                        type="file"   
                    />
                </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell >File Name</TableCell>
                                    <TableCell >File Type</TableCell>
                                    <TableCell >View</TableCell>
                                    <TableCell >Download</TableCell>
                                    <TableCell >Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                              {files && files.map((row) => 
                               (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row._id}
                                        </TableCell>
                                        <TableCell >{row.fileName}</TableCell>
                                        <TableCell >{row.fileExt}</TableCell>
                                       
                                        <TableCell ><IconButton style={{ color: 'blue' }} onClick={() => window.open(`http://localhost:3000/files/file/${row._id}`)} size="large">
                                            <OpenInNewIcon />
                                        </IconButton></TableCell>
                                        <TableCell ><IconButton style={{ color: 'orange' }} href={`http://localhost:3000/files/file/download/${row._id}`} size="large">
                                            <CloudDownloadIcon />
                                        </IconButton></TableCell>
                                        <TableCell ><IconButton style={{ color: 'red' }} onClick={() => handleDelete(row._id)} aria-label="delete" size="large">
                                            <DeleteIcon />
                                        </IconButton></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}

export default Mainpage