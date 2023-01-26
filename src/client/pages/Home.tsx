import { useState } from "react";
import {Link} from 'react-router-dom';
import Stash from "../components/Stash";

export default function Home(props: {loggedIn: true}) {
    const {loggedIn} = props;


    return (
        <div>
            <h1>Main</h1>
            <Link to={"game"}>Start Round</Link>
            <button>Trade Cards</button>

            <Stash />
        </div>
    );
}
