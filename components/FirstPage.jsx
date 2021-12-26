import * as React from "react";
import {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const randomNumber = () => {
    return Math.floor(Math.random() * 8);
};

export default function FirstPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    const [number, setNumber] = useState(0);

    const img = [
        "https://www.petz.com.br/blog/wp-content/uploads/2019/05/centro-de-zoonoses-pet.jpg",
        "https://uploads.metropoles.com/wp-content/uploads/2019/02/19231820/c%C3%A3ozinho.jpg",
        "https://www.amoviralata.com/wp-content/uploads/2020/10/animal-de-rua.jpg",
        "https://www.dicaspetz.com.br/wp-content/uploads/2020/03/animais-de-rua-pet.jpg",
        "https://www.dicaspetz.com.br/wp-content/uploads/2020/03/animais-de-rua-caes.jpg",
        "https://agoralaguna.com.br/wp-content/uploads/2021/03/cachorro-de-rua-istock.jpg",
        "http://vereadorafernandamoreno.com.br/wp-content/uploads/2020/12/animais-de-rua.jpg",
        "https://imirante.com/oestadoma/imagens/2019/03/18/1552927418-953846137-747x429.jpg",
    ];

    useEffect(() => {
        setInterval(() => setNumber(randomNumber), 4000);
    }, []);

    return (
        <Grid
            container
            component="main"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                backgroundImage: `url(${img[number]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "left",
                transition: "all 0.4s linear",
            }}
        >
            <CssBaseline/>
        </Grid>
    );
}
