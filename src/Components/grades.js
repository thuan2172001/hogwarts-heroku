import React, { useEffect, useState } from "react"
import { authenticationService, courseService } from "../API/service"
import Loading from "./loading"

export const Grades = (props) => {
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
    //console.log(score)
    if (loading || !score || !account) return <Loading />
    var count = 1;
    var creditCount = 0;
    return (
        <div class="row row-content">
            <div class="col-12">
                <h2>Score</h2>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>No.</th>
                                <th>Course ID</th>
                                <th>Course name</th>
                                <th>Credit</th>
                                <th>Final</th>
                                <th>Midterm</th>
                                <th>Total</th>
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
                                        </tr>
                                    )
                            })}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{creditCount}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}