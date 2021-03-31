import React, { useEffect, useState } from "react"
import authenticationService from '../API/authenticationService';
import courseService from "../API/courseService";
import Loading from "./loading"
import {Button, Table} from "react-bootstrap";
import Graph from "./chart";
import Footer from "./footer";

export const Grades = (props) => {
    const [showGraph, setShowGraph] = useState('')
    const account = authenticationService.currentAccountValue()
    const [score, setScore] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        courseService.getStudentCourse().then(({ score }) => {
            setScore(score)
        })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        return () => setLoading(false)
    }, [])
    if (loading || !score || !account) return <Loading />
    let count = 1;
    let creditCount = 0;
    return (
        <>
        <div className="container mt-3">
            <Table bordered style={{backgroundColor: "#cccccc"}}>
                <thead >
                    <tr>
                        <td colSpan="7" className="align-content-center text-center">
                            <h4>Semester: {() => {
                                if (score[1].semester === undefined) {
                                    return null
                                } else {
                                    return score[1].semester
                                }
                            }}</h4>
                        </td>
                    </tr>
                    <tr>
                        <th>No.</th>
                        <th>Course ID</th>
                        <th>Course name</th>
                        <th>Credit</th>
                        <th>Final</th>
                        <th>Midterm</th>
                        <th>Total</th>
                        <th>Statistic</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        score.map((data, key) => {
                            creditCount += data.credit;
                            return (
                                <tr>
                                    <td>{count++}</td>
                                    <td>{data.cid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.credit}</td>
                                    <td>{data.final}</td>
                                    <td>{data.mid}</td>
                                    <td>{data.total}</td>
                                    <td>
                                        <Button className="" onClick={() => setShowGraph(data.cid)}>
                                            <span className="fa fa-bar-chart" />
                                        </Button>
                                    </td>
                                </tr>
                            )
                    })}
                    <tr>
                        <td><p>Total credits: {creditCount}</p></td>
                    </tr>
                </tbody>
            </Table>
            <Graph show={showGraph}/>
        </div>
        <Footer />
        </>
    )
}