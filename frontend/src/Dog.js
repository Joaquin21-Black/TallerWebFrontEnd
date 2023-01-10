import React, { useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CircularProgress, Grid, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import axios, {AxiosHeaders} from "axios";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import { Box } from '@mui/system';
import fondo from './fondo.jpeg';
import { LoremIpsum } from "lorem-ipsum";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Tooltip } from '@mui/material';


export default function App() {

    const [dogs, setDogs] = useState({perro: ''});
    const [aceptados, setAceptados] = useState([]);
    const [rechazados, setRechazados] = useState([]);
    const [showAc, setShowAc] = useState({});
    const [showRec, setShowRec] = useState({});

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarDog();
        cargarAceptado();
    }, []);

    function agregarAceptado(){
        setAceptados((aceptados) => [dogs,...aceptados])
        fetch('http://127.0.0.1:8000/api/interaccion/guardarAceptado',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: dogs.id})
          })
        .then(response => response.json())
        .then(data => console.log(data));
        cargarDog();
    }

    const cargarAceptado = () => {
        setLoading(true);
        axios.get("http://127.0.0.1:8000/api/perro/listarAceptados").then(
            (response) => {
                console.log(response.data);
                response.data.id = response.data.datos.perro_candidato_id;
                response.data.message = response.data.datos.perros_candidato.url_foto;
                response.data.nombre = response.data.datos.perros_candidato.nombre;
                response.data.descripcion = response.data.datos.perros_candidato.descripcion;
                setDogs(response.data);
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    function agregarRechazados(){
        setRechazados((rechazados) => [dogs,...rechazados])
        fetch('http://127.0.0.1:8000/api/interaccion/guardarRechazados',{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: dogs.id})
          })
        .then(response => response.json())
        .then(data => console.log(data));
        cargarDog();
    }

    function quitarAceptado(name){
        const lista=aceptados.filter(item => item.nombre != name.nombre);
        setAceptados(lista);
        agregarRechazados1(name);
    }
    
    function agregarRechazados1(prro){
        setRechazados((rechazados) => [...rechazados, prro])
    }

    function quitarRechazado(name){
        const lista=rechazados.filter(item => item.nombre != name.nombre);
        setRechazados(lista);
        agregarAceptados1(name);
    }
    
    function agregarAceptados1(prro){
        setAceptados((aceptados) => [...aceptados, prro])
    }

    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 16,
          min: 4
        }
      });

    const cargarDog = () => {
        setLoading(true);
        axios.get("http://127.0.0.1:8000/api/perro/showPerros").then(
            (response) => {
                console.log(response.data);
                response.data.id = response.data.datos.perro_id;
                response.data.message = response.data.datos.url_foto;
                response.data.nombre = response.data.datos.nombre;
                response.data.descripcion = response.data.datos.descripcion;
                setDogs(response.data);
                setLoading(false);
            },
            (error) => {
                console.log(error);
            }
        );
    };

    function nombre(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (

        <Card sx={{}}
            style={{
                backgroundImage: `url(${fondo})`,
            }} >
            
            <Typography variant="h4" paragraph align="center">
                Tinder Para Perros
            </Typography>

            <CardContent sx={{my:"10vh", mx:"12vh" }}>

                <Grid container spacing = {1} >

                <Grid item md={4}>
                        <Card>
                            <CardContent style={{backgroundColor: "#EAAA9C"}}>
                                    {
                                        loading?
                                        <CircularProgress size= {400}/>:

                                    <img src={dogs.message} 
                                    alt="icons"
                                    width="480"
                                    height="500"
                                    align="center"
                                     />
                                     }
                            </CardContent>
                
                            <Typography variant="h6" paragraph align="center">
                                {dogs.nombre}
                            </Typography>
                            <Typography variant="h6" paragraph align="center">
                                {dogs.descripcion}
                            </Typography>

                            <div align="center">
                                <IconButton onClick={agregarRechazados} color="error">
                                    <ThumbDownIcon />
                                    <Typography variant="h6" ml={1}>
                                            Rechazar
                                    </Typography>
                                </IconButton>
                                <IconButton onClick={agregarAceptado} color="success">
                                <Typography variant="h6" mr={1}>
                                            Aceptar
                                    </Typography>
                                    <ThumbUpIcon />
                                </IconButton>
                            </div>
                        </Card>
                    </Grid>

                    <Grid item md={4}>
                        <ImageList sx={{ width: 500, height: 612 }}>
                                <ImageListItem key="Subheader" cols={2}>
                                    <ListSubheader component="div">

                                        <Typography variant="h6" paragraph align="center" mt={2}>
                                            Aceptados
                                        </Typography>
                                    
                                    </ListSubheader>
                                    
                                </ImageListItem>
                                     
                                    {aceptados.map((item,key) => (
                                        
                                        <ImageListItem key={item.img}>
                                            <img src={item.message} alt="icons" />

                                            <ImageListItemBar
                                                title={item.nombre}
                                                //subtitle={item.descripcion}
                                                
                                                actionIcon={
                                                    <>
                                                    <Tooltip title="Cambiar de opinion">
                                                    <IconButton
                                                        key="change1"
                                                        onClick={()=>quitarAceptado(item)}
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`Change ${item.title}`}
                                                    >
                                                        <ArrowUpwardIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                    
                                                    <Tooltip title="Descripcion">
                                                    <IconButton
                                                        onClick={() => setShowAc({...showAc,[key]:!showAc[key]})}
                                                        key="info1"
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${item.title}`}
                                                    >
                                                    {showAc[key] && <Typography>{item.descripcion} </Typography>}
                                                    
                                                        <InfoIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                    
                                                    </>
                                                }
                                            />
                                        </ImageListItem>
                                    ))}

                        </ImageList>
                    </Grid>       

                    <Grid item md={4}>
                        <ImageList sx={{ width: 500, height: 612 }}>
                            <ImageListItem key="Subheader" cols={2}>
                                <ListSubheader component="div">
                                    <Typography variant="h6" paragraph align="center" mt={2}>
                                        Rechazados
                                    </Typography>
                                </ListSubheader>    
                            </ImageListItem>
                                {rechazados.map((item,key) => (
                                    
                                    <ImageListItem key={item.img}>
                                        <img src={item.message} alt="icons" />

                                        <ImageListItemBar
                                            title={item.nombre}
                                            //subtitle={item.descripcion}
                                           
                                            actionIcon={
                                                <>
                                                <Tooltip title="Cambiar de opinion">
                                                <IconButton
                                                    key="change2"
                                                    onClick={()=>quitarRechazado(item)}
                                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                    aria-label={`Change ${item.title}`}
                                                >
                                                    <ArrowUpwardIcon />
                                                </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Descripcion">
                                                    <IconButton
                                                        
                                                        onClick={() => setShowRec({...showRec,[key]:!showRec[key]})}
                                                        key="info2"
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`info about ${item.title}`}
                                                    >
                                                        {showRec[key] && <Typography>{item.descripcion} </Typography>}
                                                        <InfoIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                    
                                                </>
                                            }
                                        />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>

    );

}