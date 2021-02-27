import React, {useContext} from 'react'
import Header from './header'
import NavBar from "./nav-bar";
import Footer from "./footer";
import accountContext from './accountContext'
import {Leader, trList} from "../data/superData";
import Loading from "./loading";
import { authenticationService } from '../API/authentication';

const RenderLeader = ({ leader }) => {
    return(
        <div className="container row">
            <div className="col-12 col-md-6">
                <img width="300px" height="auto" src={leader.image} alt={leader.name} />
            </div>
            <div className="col-12 col-md-6">
                <header>
                    <h3>{leader.name}</h3>
                </header>
                <p>{leader.description}</p>
            </div>
        </div>
    );
}
const RenderTr = ({trItem}) => {
    return (
        <tr className="row">
            <th className="col-md-2 d-none d-xl-block d-sm-inline item_title">{trItem.title}</th>
            <div className="col-12 col-md-10 row">
                <td className="col-3 item0">{trItem.description[0]}</td>
                <td className="col-3 item1">{trItem.description[1]}</td>
                <td className="col-3 item2">{trItem.description[2]}</td>
                <td className="col-3 item3">{trItem.description[3]}</td>
            </div>
        </tr>
    )
}
const Presidents = () => {
    const leaders = Leader.map((leader) => {
        return (
            <>
                <RenderLeader leader={leader} />
                <hr />
            </>

        );
    });

    return (
        <div className="container presidents">
            <h3><span className="mw-headline">II. Heads of Hogwarts</span></h3>
            <dd>
                <div className="noprint"><p>Main article:
                    <a href="https://harrypotter.fandom.com/wiki/Hogwarts_Headmaster" title="Hogwarts Headmaster">Hogwarts
                    Headmaster</a>
                </p>
                </div>
                <p>The Headmaster or Headmistress was the chief administrator of the School. They made all major decisions
                regarding the safety and the day-to-day functioning of the school, and had the power to override any
                decision made by any other authoritative facilitator at the school, with the possible exception of the Board
                    of Governors.</p> <br/>
                <div className="container">
                    {leaders}
                </div>
            </dd>
        </div>
    )
}

const Houses = () => {
    const trItems = trList.map((item) => {
        return (
            <>
                <RenderTr trItem = {item}/>
            </>
        )
    })

    return (
        <div className="container">
            <div>
                <div>
                    <h3><span className="mw-headline">I. Heads of Hogwarts</span></h3>
                </div>

            </div>
            <table className="simpletable" border="1" >
                <tbody>
                {trItems}
                </tbody>
            </table>
        </div>
    )
}

export const About = () => {
    const account = authenticationService.currentAccountValue
    if (account) {
        return (
            <div className="about">
                <NavBar />
                <Header />
                <br />
                <Houses />
                <Presidents />
                <Footer/>
            </div>
        );
    } else {
        return <Loading />
    }
}
